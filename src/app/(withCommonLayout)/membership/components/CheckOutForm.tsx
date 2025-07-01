/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { toast } from "sonner";
import { useAppSelector } from "@/src/redux/hooks";
import { useSavePaymentMutation } from "@/src/redux/features/payment/paymentApi";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import envConfig from "@/src/config/envConfig";

export default function CheckoutForm({
  membersShip,
  setOpen,
}: {
  membersShip: { name: string; price: number };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [savePayment] = useSavePaymentMutation();
  const [updateUser] = useUpdateUserMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (membersShip?.price) {
      fetch(`${envConfig.baseApi}/payments/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalCost: membersShip.price, currency: "usd" }),
      })
        .then((data) => data.json())
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            toast.error("Failed to get client secret. Please try again.");
            setOpen(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
          toast.error("Error connecting to payment gateway.");
          setOpen(false);
        });
    }
  }, [membersShip?.price, setOpen]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      toast.error("Payment gateway not ready. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setLoading(false);
      toast.error("Card details are missing.");
      return;
    }

    const { paymentMethod, error: createPaymentMethodError } =
      await stripe.createPaymentMethod({ type: "card", card });

    if (createPaymentMethodError) {
      setLoading(false);
      toast.error(
        createPaymentMethodError.message || "Failed to create payment method."
      );
      console.error(createPaymentMethodError);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name,
            email: currentUser?.email,
          },
        },
      });

    if (confirmError) {
      console.error(confirmError);
      toast.error(confirmError.message || "Payment confirmation failed.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const today = new Date();
      today.setDate(today.getDate() + 30);
      const expiryMembershipDate = today.toISOString();

      const payment = {
        email: currentUser?.email,
        cost: Number(membersShip.price),
        membersShip: {
          package: membersShip,
          takenDate: new Date().toISOString(),
          exp: expiryMembershipDate,
        },
        transactionId: paymentIntent.id,
      };

      const res: any = await savePayment(payment);

      if (res.data?.success) {
        await updateUser({
          userId: currentUser?._id as string,
          payload: {
            memberShip: {
              package: membersShip,
              takenDate: new Date().toISOString(),
              exp: expiryMembershipDate,
            },
          },
        }).unwrap();

        toast.success(`Successfully Purchased ${membersShip.name}`);
        setLoading(false);
        setOpen(false);
      } else {
        toast.error("Something went wrong saving payment info.");
        setLoading(false);
      }
    } else {
      toast.error(
        "Payment was not successful. Status: " + paymentIntent?.status
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770", // Default text color for light mode
                  "::placeholder": {
                    color: "#A0AEC0", // Tailwind gray-400
                  },
                  // Dark mode styles for CardElement
                  // Note: Direct control over CardElement internal styles is limited.
                  // This will apply to the wrapper. For internal elements, Stripe's theme handles it.
                },
                invalid: {
                  color: "#EF4444", // Tailwind red-500
                },
              },
              // Enable dark mode for Stripe elements if supported by Stripe.js
              // This often needs to be configured when loading Stripe.js or in the Elements provider.
              // For a simple toggle, you might need to re-render Elements with a new theme.
            }}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!stripe || !elements || !clientSecret || loading}
          >
            {loading ? (
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                speedMultiplier={0.8}
              />
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

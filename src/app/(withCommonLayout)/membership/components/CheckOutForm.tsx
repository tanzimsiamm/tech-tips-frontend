"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

import { useAppSelector } from "@/src/redux/hooks";
import { useSavePaymentMutation } from "@/src/redux/features/payment/paymentApi";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import envConfig from "@/src/config/envConfig";

type MembersShipType = {
  name?: string;
  price?: number;
  description?: string;
  colorClass?: string;
  features?: string[];
  [k: string]: any;
};

export default function CheckoutForm({
  membersShip,
  setOpen,
}: {
  membersShip: MembersShipType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [savePayment] = useSavePaymentMutation();
  const [updateUser] = useUpdateUserMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    async function createPaymentIntent() {
      if (!membersShip?.price) {
        setClientSecret(null);
        return;
      }

      setFetchError(null);
      setClientSecret(null);

      try {
        const resp = await fetch(
          `${envConfig.baseApi}/payments/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalCost: membersShip.price,
              currency: "usd",
            }),
            signal: controller.signal,
          }
        );

        if (!resp.ok) {
          // try to parse body for more info
          let text = await resp.text().catch(() => "");
          throw new Error(
            `Payment server responded with status ${resp.status}: ${text}`
          );
        }

        const res = await resp.json();

        if (mountedRef.current) {
          if (res?.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
            setFetchError(null);
          } else {
            // keep modal open but show an informative message
            setClientSecret(null);
            setFetchError(
              "Failed to get client secret from payment server. Please check your Stripe backend configuration."
            );
            toast.error("Failed to get client secret. Payment not ready.");
          }
        }
      } catch (err: any) {
        if (controller.signal.aborted) return;
        if (mountedRef.current) {
          setClientSecret(null);
          setFetchError(
            "Error connecting to payment gateway. Please try again later."
          );
          toast.error("Error connecting to payment gateway.");
          // you can log err to your server here if needed
        }
      }
    }

    createPaymentIntent();

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, [membersShip?.price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (!stripe || !elements) {
        toast.error("Payment gateway not ready. Please try again.");
        return;
      }

      if (!clientSecret) {
        toast.error("Payment is not initialized. Please try again later.");
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        toast.error("Card details are missing.");
        return;
      }

      // createPaymentMethod is optional; confirmCardPayment can take the card directly.
      const { error: createPaymentMethodError } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            name: currentUser?.name ?? undefined,
            email: currentUser?.email ?? undefined,
          },
        });

      if (createPaymentMethodError) {
        toast.error(
          createPaymentMethodError.message || "Failed to create payment method."
        );
        return;
      }

      const {
        paymentIntent,
        error: confirmError,
      }: any = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: currentUser?.name ?? undefined,
            email: currentUser?.email ?? undefined,
          },
        },
      });

      if (confirmError) {
        toast.error(confirmError.message || "Payment confirmation failed.");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        const expiryMembershipDate = today.toISOString();

        const payment = {
          email: currentUser?.email,
          cost: Number(membersShip?.price ?? 0),
          membersShip: {
            package: membersShip,
            takenDate: new Date().toISOString(),
            exp: expiryMembershipDate,
          },
          transactionId: paymentIntent.id,
        };

        const res: any = await savePayment(payment);

        if (res?.data?.success) {
          try {
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
          } catch (updateErr) {
            // If updating user fails, still consider payment succeeded but notify user
            toast.error("Payment saved but failed to update user membership.");
            setLoading(false);
            setOpen(false);
            return;
          }

          toast.success(`Successfully Purchased ${membersShip?.name ?? "plan"}`);
          setOpen(false);
        } else {
          toast.error("Something went wrong saving payment info.");
        }
      } else {
        toast.error("Payment was not successful. Status: " + paymentIntent?.status);
      }
    } catch (err: any) {
      toast.error(err?.message || "Unexpected error during payment.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
      {/* show helpful error when payment initialization failed */}
      {fetchError && (
        <div className="mb-4 p-3 rounded-md bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm">
          {fetchError}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#A0AEC0",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!stripe || !elements || !clientSecret || loading}
            type="submit"
          >
            {loading ? (
              <ClipLoader
                aria-label="Loading Spinner"
                color="#ffffff"
                loading={loading}
                size={20}
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

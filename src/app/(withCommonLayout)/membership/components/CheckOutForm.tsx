'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useAppSelector } from "@/src/redux/hooks";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import { useGetPaymentIntentMutation, useSavePaymentMutation } from "@/src/redux/features/payment/paymentApi";

export default function CheckoutForm({ membersShip, setOpen }: { membersShip: { name: string; price: number }, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [savePayment] = useSavePaymentMutation();
  const [getPaymentIntent] = useGetPaymentIntentMutation();
  const [updateUser] = useUpdateUserMutation();

  const currentUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (membersShip?.price) {
      getPaymentIntent({ totalCost: membersShip.price, currency: "usd" })
        .unwrap()
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => toast.error("Failed to create payment intent"));
    }
  }, [membersShip?.price, getPaymentIntent]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    const { error: methodError } = await stripe.createPaymentMethod({ type: "card", card });
    if (methodError) {
      console.log(methodError);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
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

      const res = await savePayment(payment);

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
        setOpen(false);
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <CardElement options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }} />
        <button
          className="bg-green-600 my-6 py-2 text-sm md:text-base font-semibold uppercase px-12 rounded-md text-white/80"
          disabled={!stripe || !elements || loading}
        >
          {loading ? <ClipLoader color="#ffffff" size={16} speedMultiplier={0.8} /> : "Pay Now"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-8 ml-2 text-sm lg:text-base mr-3 py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700"
        >
          Close
        </button>
      </form>
    </section>
  );
}

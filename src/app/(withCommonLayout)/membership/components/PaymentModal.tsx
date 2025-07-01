/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { MdOutlinePayment } from "react-icons/md";
import { FaTimes, FaCheckCircle } from "react-icons/fa"; // Added FaTimes for close button
import CheckoutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51OECRRFLaeRKmWHlOnS7nvYdRDI0mKR7gAbUTLpORBLigHEpLvbJEwY6qGjI3VqnLdaLkqLGA79jNs2d6PJEGSZZ00fp3AR825"
);

type TModalProps = {
  membersShip: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentModal({ setOpen, membersShip }: TModalProps) {
  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Complete Your Subscription
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          {/* Membership Info Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {membersShip?.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base mb-3">
              {membersShip?.description}
            </p>
            <div className="mb-4">
              <span
                className={`text-4xl font-extrabold ${membersShip?.colorClass || "text-blue-500"}`}
              >
                ${membersShip?.price}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-lg">
                /month
              </span>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              {membersShip?.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <FaCheckCircle className="text-blue-500 dark:text-blue-400 mr-3 text-lg flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="bg-blue-500 dark:bg-blue-600 text-white size-14 rounded-full flex items-center justify-center p-3 mb-3">
                <MdOutlinePayment className="text-3xl" />
              </div>
              <h3 className="uppercase text-gray-700 dark:text-gray-300 text-lg font-semibold text-center">
                Stripe Payment
              </h3>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm membersShip={membersShip} setOpen={setOpen} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { MdOutlinePayment, MdSecurity } from "react-icons/md";
import { FaTimes, FaCheckCircle, FaCreditCard } from "react-icons/fa";

import CheckoutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51RuezYHI1CPg2kAo4EfkdlyecNJ43e0ZmftT3wOsPCOt2lXA54ggtbfZ9gNznooa4q0lvBoFXw1byyr4yoKzxMm100oDLwdreT",
);

type TModalProps = {
  membersShip: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentModal({ setOpen, membersShip }: TModalProps) {
  return (
    <section className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl dark:shadow-gray-900/50 relative flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-xl">
              <FaCreditCard className="text-white text-lg" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Secure Checkout
            </h2>
          </div>
          <button
            className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          {/* Plan Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent dark:from-blue-900/20 rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {membersShip?.name}
                </h3>
                <div className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white text-sm font-medium rounded-full">
                  Popular
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-base mb-4 leading-relaxed">
                {membersShip?.description}
              </p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span
                    className={`text-4xl font-black ${membersShip?.colorClass || "text-blue-600 dark:text-blue-400"}`}
                  >
                    ${membersShip?.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg font-medium ml-2">
                    /month
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {membersShip?.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-blue-500 dark:text-blue-400 mr-3 text-base flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 relative">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white p-4 rounded-2xl shadow-lg">
                <MdOutlinePayment className="text-2xl" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Payment Details
              </h3>
              <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                <MdSecurity className="mr-2" />
                <span>Secured by Stripe • 256-bit SSL encryption</span>
              </div>
            </div>

            <div className="payment-form-wrapper">
              <Elements 
                stripe={stripePromise}
                options={{
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#3b82f6',
                      colorBackground: 'transparent',
                      colorText: '#111827',
                      colorDanger: '#ef4444',
                      fontFamily: 'system-ui, sans-serif',
                      spacingUnit: '4px',
                      borderRadius: '12px',
                    },
                    rules: {
                      '.Input': {
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        boxShadow: 'none',
                        color: '#111827 !important',
                        fontSize: '16px',
                        padding: '12px 16px',
                      },
                      '.Input:focus': {
                        border: '2px solid #3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                        backgroundColor: '#ffffff',
                        color: '#111827 !important',
                      },
                      '.Input::placeholder': {
                        color: '#9ca3af',
                      },
                      '.Label': {
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '8px',
                      },
                      '.Tab': {
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                        color: '#6b7280',
                      },
                      '.Tab:hover': {
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                      },
                      '.Tab--selected': {
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        border: '1px solid #3b82f6',
                      },
                    }
                  }
                }}
              >
                <CheckoutForm membersShip={membersShip} setOpen={setOpen} />
              </Elements>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <MdSecurity className="mr-1" />
              <span>SSL Secured</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span>Money-back guarantee</span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .slide-in-from-bottom-4 {
          animation: slide-in-from-bottom 0.3s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(16px); }
          to { transform: translateY(0); }
        }
        .payment-form-wrapper {
          /* Ensure Stripe elements inherit dark mode styles */
        }
      `}</style>
    </section>
  );
}
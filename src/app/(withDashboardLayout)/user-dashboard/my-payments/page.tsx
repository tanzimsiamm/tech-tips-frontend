/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { useAppSelector } from "@/src/redux/hooks";
import { useGetPaymentHistoriesQuery } from "@/src/redux/features/payment/paymentApi";
import { TPayment } from "@/src/types";

export default function PaymentHistory() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetPaymentHistoriesQuery(
    currentUser?.email as string
  );
  const histories: TPayment[] = data?.data || [];

  return (
    <section className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Your Payment History
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Review your past membership transactions.
          </p>
        </div>

        <div className="overflow-x-auto relative min-h-[200px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10">
              <PulseLoader
                color="#2563EB"
                size={13}
                aria-label="Loading Spinner"
                speedMultiplier={0.7}
              />
            </div>
          )}

          <table className="min-w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 rounded-tl-xl"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                >
                  Package
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 rounded-tr-xl"
                >
                  Expiry Date
                </th>
              </tr>
            </thead>
            <tbody>
              {histories?.map((doc: any) => (
                <tr
                  key={doc._id}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <Image
                      width={40}
                      height={40}
                      alt="profile"
                      src={
                        doc?.userInfo?.image ||
                        "https://i.ibb.co/VtP9tF6/default-user-image.png"
                      }
                      className="size-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {doc?.userInfo?.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {doc?.email}
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                    {doc?.membersShip?.package?.name}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    ${doc?.membersShip?.package?.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(doc?.membersShip?.exp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && (!histories || histories.length === 0) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
              No payment history found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

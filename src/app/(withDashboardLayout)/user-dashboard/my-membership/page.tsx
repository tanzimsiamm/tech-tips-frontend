'use client'

import { FaCalendarAlt, FaRegClock, FaCheckCircle } from 'react-icons/fa';
import { useAppSelector } from "@/src/redux/hooks";
import Link from 'next/link';
import Image from 'next/image';

const MyMembership = () => {
  const { memberShip } : any = useAppSelector(state => state.auth.user)
  const { package: pkg, takenDate, exp } = memberShip || {};

  const takenDateFormatted = takenDate ? new Date(takenDate).toLocaleDateString() : 'N/A';
  const expDateFormatted = exp ? new Date(exp).toLocaleDateString() : 'N/A';

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      {memberShip ? (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {pkg?.bgColor && (
            <div className={`w-full h-4`} style={{ backgroundColor: pkg.bgColor }}></div>
          )}

          <div className="p-6 sm:p-8 text-center">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${pkg?.colorClass || 'text-blue-500'} mb-2`}>
              {pkg?.name || 'Unknown Plan'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {pkg?.description || 'No description available for this plan.'}
            </p>
          </div>

          <div className="px-6 sm:px-8 py-4 border-y border-gray-200 dark:border-gray-700 flex justify-between items-center text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            <span>Current Price:</span>
            <span className={`${pkg?.colorClass || 'text-blue-500'}`}>
              ${pkg?.price || '0'}
            </span>
          </div>

          <ul className="px-6 sm:px-8 py-6 space-y-3 text-gray-800 dark:text-gray-200">
            {pkg?.features?.map((feature: string, index: number) => (
              <li key={index} className="flex items-center space-x-3 text-base sm:text-lg">
                <FaCheckCircle className={`text-blue-500 dark:text-blue-400 flex-shrink-0`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-3 mb-2">
              <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-lg flex-shrink-0" />
              <span>
                <strong className="font-semibold">Subscription Start Date:</strong> {takenDateFormatted}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaRegClock className="text-gray-500 dark:text-gray-400 text-lg flex-shrink-0" />
              <span>
                <strong className="font-semibold">Subscription Expiry Date:</strong> {expDateFormatted}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <section className="max-w-xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center">
          <Image
            src="https://placehold.co/200x200/1DA1F2/FFFFFF?text=No+Plan"
            alt="No Membership"
            width={200}
            height={200}
            className="mx-auto mb-6 rounded-lg"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Active Membership Found
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            It looks like you don't have an active membership plan. Subscribe today to unlock exclusive tech content and premium features!
          </p>

          <Link href="/membership" className="inline-block">
            <button className="px-8 py-3 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
              Explore Membership Plans
            </button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default MyMembership;

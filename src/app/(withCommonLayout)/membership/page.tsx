"use client";

import { useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import PaymentModal from "./components/PaymentModal";

const membershipPackages = [
  {
    name: "Explorer Tier",
    price: 5,
    description:
      "Start your journey into the world of tech with essential updates and community access.",
    features: [
      "Daily Tech Digests",
      "Community Forum Access",
      "Basic Article Library",
      "Weekly Newsletter",
    ],
    colorClass: "text-blue-500",
    bgColorClass: "bg-blue-500",
    hoverBgColorClass: "hover:bg-blue-600",
  },
  {
    name: "Innovator Tier",
    price: 15,
    description:
      "Unlock deeper insights and exclusive content to fuel your innovation.",
    features: [
      "All Explorer features",
      "Premium Articles & Tutorials",
      "Early Access to Beta Features",
      "Ad-Free Experience",
      "Priority Forum Support",
    ],
    colorClass: "text-green-500",
    bgColorClass: "bg-green-500",
    hoverBgColorClass: "hover:bg-green-600",
  },
  {
    name: "Architect Tier",
    price: 25,
    description:
      "Master the tech landscape with personalized mentorship and advanced resources.",
    features: [
      "All Innovator features",
      "Exclusive Masterclasses",
      "1-on-1 Mentorship Sessions",
      "Dedicated Support Channel",
      "Access to Private Webinars",
    ],
    colorClass: "text-purple-500",
    bgColorClass: "bg-purple-500",
    hoverBgColorClass: "hover:bg-purple-600",
  },
  {
    name: "Visionary Tier",
    price: 50,
    description:
      "Lead the future with cutting-edge tech insights, business strategies, and VIP privileges.",
    features: [
      "All Architect features",
      "VIP Networking Events",
      "Personalized Tech Roadmaps",
      "Business & Startup Mentoring",
      "Exclusive Partner Discounts",
      "Lifetime Access to Premium Content",
    ],
    colorClass: "text-yellow-500",
    bgColorClass: "bg-yellow-500",
    hoverBgColorClass: "hover:bg-yellow-600",
  },
];

const Membership = () => {
  const [openPayModal, setOpenPayModal] = useState<boolean>(false);
  const [selectedMembership, setSelectedMembership] = useState<any>(null);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleSubscribeClick = (pack: any) => {
    if (!loggedUser) {
      router.push("/login");
      return;
    }
    setSelectedMembership(pack);
    setOpenPayModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 sm:mb-10 md:mb-14 text-center">
        Choose Your Tech Mastery Plan
      </h1>

      {openPayModal && selectedMembership && (
        <PaymentModal
          membersShip={selectedMembership}
          open={openPayModal}
          setOpen={setOpenPayModal}
        />
      )}

      <div className="w-full container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {membershipPackages.map((pack) => (
            <div
              key={pack.name}
              className="w-full sm:w-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col justify-between border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.02]"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {pack.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
                  {pack.description}
                </p>
                <div className="my-4">
                  <span
                    className={`text-5xl font-extrabold ${pack.colorClass}`}
                  >
                    ${pack.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-lg">
                    /month
                  </span>
                </div>
                <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-blue-500 dark:text-blue-400 mr-3 text-lg flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSubscribeClick(pack)}
                className={`w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base text-white font-semibold rounded-full ${pack.bgColorClass} ${pack.hoverBgColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${pack.colorClass.replace("text-", "")} transition-colors duration-200 dark:focus:ring-offset-gray-800`}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;

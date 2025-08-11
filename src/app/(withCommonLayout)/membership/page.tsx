"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import PaymentModal from "./components/PaymentModal";
import { useAppSelector } from "@/src/redux/hooks";

type MembershipPackage = {
  name: string;
  price: number; // total price for the billing cycle
  durationLabel: string; // e.g., "/month", "/3 months", "/year"
  description: string;
  features: string[];
  colorClass: string;
  bgColorClass: string;
  hoverBgColorClass: string;
};

const membershipPackages: MembershipPackage[] = [
  {
    name: "Explorer Tier",
    price: 5,
    durationLabel: "/month",
    description:
      "Start your journey into the world of tech with essential updates and community access.",
    features: [
      "Daily Tech Digests",
      "Community Forum Access",
      "Basic Article Library",
      "Weekly Newsletter",
    ],
    colorClass: "text-blue-600",
    bgColorClass: "bg-blue-600",
    hoverBgColorClass: "hover:bg-blue-700",
  },
  {
    name: "Innovator Tier",
    price: 15,
    durationLabel: "/month",
    description:
      "Unlock deeper insights and exclusive content to fuel your innovation.",
    features: [
      "All Explorer features",
      "Premium Articles & Tutorials",
      "Early Access to Beta Features",
      "Ad-Free Experience",
      "Priority Forum Support",
    ],
    colorClass: "text-green-600",
    bgColorClass: "bg-green-600",
    hoverBgColorClass: "hover:bg-green-700",
  },
  {
    name: "Architect Tier",
    price: 25,
    durationLabel: "/month",
    description:
      "Master the tech landscape with personalized mentorship and advanced resources.",
    features: [
      "All Innovator features",
      "Exclusive Masterclasses",
      "1-on-1 Mentorship Sessions",
      "Dedicated Support Channel",
      "Access to Private Webinars",
    ],
    colorClass: "text-purple-600",
    bgColorClass: "bg-purple-600",
    hoverBgColorClass: "hover:bg-purple-700",
  },
  {
    name: "Visionary Tier",
    price: 50,
    durationLabel: "/month",
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
    colorClass: "text-yellow-600",
    bgColorClass: "bg-yellow-400",
    hoverBgColorClass: "hover:bg-yellow-500",
  },
  {
    name: "Legend Tier",
    price: 100,
    durationLabel: "/month",
    description:
      "The ultimate tier for industry leaders who want full VIP treatment.",
    features: [
      "All Visionary features",
      "Personal Brand Consultation",
      "Exclusive Investor Networking",
      "Full Team Training Sessions",
      "Private Island Hackathon Invite",
    ],
    colorClass: "text-red-600",
    bgColorClass: "bg-red-600",
    hoverBgColorClass: "hover:bg-red-700",
  },
  {
    name: "Legend Tier - 3 Months",
    price: 270,
    durationLabel: "/3 months",
    description:
      "Get the full VIP experience for 3 months at a discounted rate.",
    features: [
      "All Visionary features",
      "Personal Brand Consultation",
      "Exclusive Investor Networking",
      "Full Team Training Sessions",
      "Private Island Hackathon Invite",
    ],
    colorClass: "text-red-600",
    bgColorClass: "bg-red-600",
    hoverBgColorClass: "hover:bg-red-700",
  },
  {
    name: "Legend Tier - 1 Year",
    price: 1000,
    durationLabel: "/year",
    description:
      "Lock in the ultimate VIP treatment for an entire year at the best value.",
    features: [
      "All Visionary features",
      "Personal Brand Consultation",
      "Exclusive Investor Networking",
      "Full Team Training Sessions",
      "Private Island Hackathon Invite",
    ],
    colorClass: "text-red-700",
    bgColorClass: "bg-red-700",
    hoverBgColorClass: "hover:bg-red-800",
  },
  {
    name: "Legend Tier - 2 Years",
    price: 1800,
    durationLabel: "/2 years",
    description:
      "Commit to excellence with the ultimate VIP experience for 2 years at a great discount.",
    features: [
      "All Visionary features",
      "Personal Brand Consultation",
      "Exclusive Investor Networking",
      "Full Team Training Sessions",
      "Private Island Hackathon Invite",
    ],
    colorClass: "text-red-800",
    bgColorClass: "bg-red-800",
    hoverBgColorClass: "hover:bg-red-900",
  },
];

const Membership = () => {
  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipPackage | null>(null);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleSubscribeClick = (pack: MembershipPackage) => {
    if (!loggedUser) {
      router.push("/login");
      return;
    }
    setSelectedMembership(pack);
    setOpenPayModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {membershipPackages.map((pack) => (
            <div
              key={pack.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col justify-between border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.05] ${pack.bgColorClass} bg-opacity-10 dark:bg-opacity-20`}
            >
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold mb-3 ${pack.colorClass}`}
                >
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
                  <span className="text-gray-600 dark:text-gray-400 text-lg ml-2">
                    {pack.durationLabel}
                  </span>
                </div>
                <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle
                        className={`mr-3 text-lg flex-shrink-0 ${pack.colorClass}`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base text-white font-semibold rounded-full ${pack.bgColorClass} ${pack.hoverBgColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 dark:focus:ring-offset-gray-800`}
                onClick={() => handleSubscribeClick(pack)}
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

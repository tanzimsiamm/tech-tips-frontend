"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { VscHistory } from "react-icons/vsc";
import { TfiLayoutListPost } from "react-icons/tfi";
import { SlUserFollowing } from "react-icons/sl";
import { SiSimpleanalytics } from "react-icons/si";
import { PiCards } from "react-icons/pi";

const UserNavigations = () => {
  const pathName = usePathname();

  return (
    <div className="w-full h-full p-4 space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          User Routes
        </h2>
        <ul className="space-y-2">
          {[
            {
              href: "/",
              icon: FaHome,
              label: "Home",
              match: "/",
            },
            {
              href: "/user-dashboard/my-posts",
              icon: TfiLayoutListPost,
              label: "My Posts",
              match: "/user-dashboard/my-posts",
            },
            {
              href: "/user-dashboard/my-membership",
              icon: PiCards,
              label: "Your Membership",
              match: "/user-dashboard/my-membership",
            },
            {
              href: "/user-dashboard/my-followers",
              icon: SlUserFollowing,
              label: "Followers / Following",
              match: "/user-dashboard/my-followers",
            },
            {
              href: "/user-dashboard/my-payments",
              icon: VscHistory,
              label: "Payment History",
              match: "/user-dashboard/my-payments",
            },
            {
              href: "/user-dashboard/user-analytics",
              icon: SiSimpleanalytics,
              label: "Analytics",
              match: "/user-dashboard/user-analytics",
            },
          ].map(({ href, icon: Icon, label, match }) => {
            const isActive = pathName === match;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <div
                    className={`p-2 rounded-full flex items-center justify-center text-xl
                      ${
                        isActive
                          ? "bg-transparent"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <Icon className={isActive ? "text-white" : ""} />
                  </div>
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserNavigations;

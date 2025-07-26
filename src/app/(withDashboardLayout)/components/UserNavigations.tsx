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
    <div className="w-full h-full p-4 space-y-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          User Routes
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/"
                      ? "bg-transparent" // Icon color handled by parent link's text color
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <FaHome className={pathName === "/" ? "text-white" : ""} />
              </div>
              <span className="font-medium">Home</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/user-dashboard/my-posts"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/user-dashboard/my-posts"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/user-dashboard/my-posts"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <TfiLayoutListPost
                  className={
                    pathName === "/user-dashboard/my-posts" ? "text-white" : ""
                  }
                />
              </div>
              <span className="font-medium">My Posts</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/user-dashboard/my-membership"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/user-dashboard/my-membership"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/user-dashboard/my-membership"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <PiCards
                  className={
                    pathName === "/user-dashboard/my-membership"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Your Membership</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/user-dashboard/my-followers"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/user-dashboard/my-followers"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/user-dashboard/my-followers"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <SlUserFollowing
                  className={
                    pathName === "/user-dashboard/my-followers"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Followers / Following</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/user-dashboard/my-payments"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/user-dashboard/my-payments"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/user-dashboard/my-payments"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <VscHistory
                  className={
                    pathName === "/user-dashboard/my-payments"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Payment History</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/user-dashboard/user-analytics"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              href="/user-dashboard/user-analytics"
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/user-dashboard/user-analytics"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <SiSimpleanalytics
                  className={
                    pathName === "/user-dashboard/user-analytics"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Analytics</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavigations;

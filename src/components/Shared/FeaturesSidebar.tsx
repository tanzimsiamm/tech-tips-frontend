/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import { FaTv, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { SiHomeadvisor } from "react-icons/si";
import { MdWifiCalling1 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoArrowRedoOutline } from "react-icons/io5";
import { logout } from "@/src/redux/features/authentication/authSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";

const FeaturesSidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    toast.success("Logout Successfully!");
    router.push("/");
  };

  return (
    <div className="w-full h-full p-4 space-y-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      {user ? (
        <>
          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              New Feeds
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaTv className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Newsfeed
                  </span>
                  <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    14
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-orange-500 text-xl flex items-center justify-center">
                    <GoPackage className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Membership
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/profile/${user?.email}`}
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaUserCircle className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    user?.role === "admin"
                      ? "/admin-dashboard/statistics"
                      : "/user-dashboard/my-posts"
                  }
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-yellow-400 text-xl flex items-center justify-center">
                    <RxDashboard className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              More Pages
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <SiHomeadvisor className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <MdWifiCalling1 className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/latest-event"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Latest Event
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              Account
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={logoutUser}
                  className="w-full flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                >
                  <div className="p-2 rounded-full bg-red-500 text-xl flex items-center justify-center">
                    <IoArrowRedoOutline className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Log out
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              New Feeds
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaTv className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Newsfeed
                  </span>
                  <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    14
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-orange-500 text-xl flex items-center justify-center">
                    <GoPackage className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Membership
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-gray-500 text-xl flex items-center justify-center">
                    <FaRegUser className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Register
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              More Pages
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <SiHomeadvisor className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <MdWifiCalling1 className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/latest-event"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Latest Event
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
              Account
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <BiLogIn className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Log In
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturesSidebar;

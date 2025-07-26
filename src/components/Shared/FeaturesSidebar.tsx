"use client";

import Link from "next/link";
import { FaTv, FaUserCircle, FaCalendarAlt, FaMoon } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { SiHomeadvisor } from "react-icons/si";
import { MdWifiCalling1 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoArrowRedoOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";

import { ThemeSwitch } from "../theme-switch";

import { logout } from "@/src/redux/features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

interface FeaturesSidebarProps {
  showAllText?: boolean;
}

const FeaturesSidebar = ({ showAllText = false }: FeaturesSidebarProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    toast.success("Logout Successfully!");
    router.push("/");
  };

  const textClass = showAllText
    ? "font-medium text-gray-800 dark:text-gray-200"
    : "hidden lg:inline font-medium text-gray-800 dark:text-gray-200";

  const menuItemClasses =
    "flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200";

  return (
    <div className="w-full h-full p-2 lg:p-4 space-y-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      {/* ---- NEW FEEDS ---- */}
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          New Feeds
        </h2>
        <ul className="space-y-2">
          <li>
            <Link className={menuItemClasses} href="/">
              <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                <FaTv className="text-white" />
              </div>
              <span className={textClass}>Newsfeed</span>
            </Link>
          </li>
          <li>
            <Link className={menuItemClasses} href="/membership">
              <div className="p-2 rounded-full bg-orange-500 text-xl flex items-center justify-center">
                <GoPackage className="text-white" />
              </div>
              <span className={textClass}>Membership</span>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className={menuItemClasses}
                  href={`/profile/${user?.email}`}
                >
                  <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                    <FaUserCircle className="text-white" />
                  </div>
                  <span className={textClass}>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className={menuItemClasses}
                  href={
                    user?.role === "admin"
                      ? "/admin-dashboard/statistics"
                      : "/user-dashboard/my-posts"
                  }
                >
                  <div className="p-2 rounded-full bg-yellow-400 text-xl flex items-center justify-center">
                    <RxDashboard className="text-white" />
                  </div>
                  <span className={textClass}>Dashboard</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className={menuItemClasses} href="/register">
                <div className="p-2 rounded-full bg-gray-500 text-xl flex items-center justify-center">
                  <FaRegUser className="text-white" />
                </div>
                <span className={textClass}>Register</span>
              </Link>
            </li>
          )}

          {/* Theme Switch */}
          <li>
            <div
              className={`${menuItemClasses} justify-between cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-500 text-xl flex items-center justify-center">
                  <FaMoon className="text-white" />
                </div>
                <span className={textClass}>Theme</span>
              </div>
              <div className="ml-2 pt-1">
                <ThemeSwitch />
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* ---- MORE PAGES ---- */}
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          More Pages
        </h2>
        <ul className="space-y-2">
          <li>
            <Link className={menuItemClasses} href="/about">
              <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                <SiHomeadvisor className="text-white" />
              </div>
              <span className={textClass}>About Us</span>
            </Link>
          </li>
          <li>
            <Link className={menuItemClasses} href="/contact">
              <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                <MdWifiCalling1 className="text-white" />
              </div>
              <span className={textClass}>Contact Us</span>
            </Link>
          </li>
          <li>
            <Link className={menuItemClasses} href="/latest-event">
              <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white" />
              </div>
              <span className={textClass}>Latest Event</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* ---- ACCOUNT ---- */}
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          Account
        </h2>
        <ul className="space-y-2">
          {user ? (
            <li>
              <button
                className="w-full flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                onClick={logoutUser}
              >
                <div className="p-2 rounded-full bg-red-500 text-xl flex items-center justify-center">
                  <IoArrowRedoOutline className="text-white" />
                </div>
                <span className={textClass}>Log out</span>
              </button>
            </li>
          ) : (
            <li>
              <Link className={menuItemClasses} href="/login">
                <div className="p-2 rounded-full bg-blue-500 text-xl flex items-center justify-center">
                  <BiLogIn className="text-white" />
                </div>
                <span className={textClass}>Log In</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesSidebar;

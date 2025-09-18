"use client";

import Link from "next/link";
import {
  FaTv,
  FaUserCircle,
  FaCalendarAlt,
  FaMoon,
  FaRegUser,
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { SiHomeadvisor } from "react-icons/si";
import { MdWifiCalling1 } from "react-icons/md";
import { IoArrowRedoOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Image from "next/image";
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
    ? "font-medium text-gray-900 dark:text-gray-100"
    : "hidden lg:inline font-medium text-gray-900 dark:text-gray-100";

  const menuItemClasses =
    "flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200";

  const iconBg = (colorClass: string) =>
    `p-2 rounded-full ${colorClass} text-xl flex items-center justify-center shadow-sm`;

  return (
    <nav
      className="w-full h-full p-3 lg:p-4 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      aria-label="Sidebar navigation"
    >
      {/* ---- LOGO ---- */}
      <div className="flex justify-start ml-3 mb-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          {showAllText}
        </Link>
      </div>

      {/* ---- NEW FEEDS ---- */}
      <section className="space-y-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className={menuItemClasses}>
              <div className={iconBg("bg-blue-600")}>
                <FaTv className="text-white" />
              </div>
              <span className={textClass}>Newsfeed</span>
            </Link>
          </li>
          <li>
            <Link href="/membership" className={menuItemClasses}>
              <div className={iconBg("bg-orange-600")}>
                <GoPackage className="text-white" />
              </div>
              <span className={textClass}>Membership</span>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  href={`/profile/${user.email}`}
                  className={menuItemClasses}
                >
                  <div className={iconBg("bg-blue-600")}>
                    <FaUserCircle className="text-white" />
                  </div>
                  <span className={textClass}>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    user.role === "admin"
                      ? "/admin-dashboard/statistics"
                      : "/user-dashboard/my-posts"
                  }
                  className={menuItemClasses}
                >
                  <div className={iconBg("bg-yellow-500")}>
                    <RxDashboard className="text-white" />
                  </div>
                  <span className={textClass}>Dashboard</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/register" className={menuItemClasses}>
                <div className={iconBg("bg-gray-600")}>
                  <FaRegUser className="text-white" />
                </div>
                <span className={textClass}>Register</span>
              </Link>
            </li>
          )}

          {/* Theme Switch */}
          <li>
  <div className={`${menuItemClasses} justify-between select-none`}>
    <div className="flex items-center gap-3">
      <div
        className={`${iconBg("bg-purple-600")} cursor-pointer hover:bg-purple-700 transition`}
      >
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
      </section>

      {/* ---- MORE PAGES ---- */}
      <section className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          More Pages
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href="/about" className={menuItemClasses}>
              <div className={iconBg("bg-blue-600")}>
                <SiHomeadvisor className="text-white" />
              </div>
              <span className={textClass}>About Us</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className={menuItemClasses}>
              <div className={iconBg("bg-blue-600")}>
                <MdWifiCalling1 className="text-white" />
              </div>
              <span className={textClass}>Contact Us</span>
            </Link>
          </li>
          <li>
            <Link href="/latest-event" className={menuItemClasses}>
              <div className={iconBg("bg-blue-600")}>
                <FaCalendarAlt className="text-white" />
              </div>
              <span className={textClass}>Latest Event</span>
            </Link>
          </li>
        </ul>
      </section>

      {/* ---- ACCOUNT ---- */}
      <section className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          Account
        </h2>
        <ul className="space-y-2">
          {user ? (
            <li>
              <button
                onClick={logoutUser}
                className="w-full flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                aria-label="Log out"
                type="button"
              >
                <div className={iconBg("bg-red-600")}>
                  <IoArrowRedoOutline className="text-white" />
                </div>
                <span className={textClass}>Log out</span>
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className={menuItemClasses}>
                <div className={iconBg("bg-blue-600")}>
                  <BiLogIn className="text-white" />
                </div>
                <span className={textClass}>Log In</span>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </nav>
  );
};

export default FeaturesSidebar;

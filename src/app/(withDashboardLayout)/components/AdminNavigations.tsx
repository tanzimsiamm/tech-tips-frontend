"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md"; 

const AdminNavigations = () => {
  const pathName = usePathname();

  return (
    <div className="w-full h-full p-4 space-y-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          Admin Routes
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin-dashboard/statistics"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/admin-dashboard/statistics"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/admin-dashboard/statistics"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <BsGraphUp
                  className={
                    pathName === "/admin-dashboard/statistics"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Statistics</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin-dashboard/manage-posts"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/admin-dashboard/manage-posts"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/admin-dashboard/manage-posts"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <ImBooks
                  className={
                    pathName === "/admin-dashboard/manage-posts"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Manage Posts</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin-dashboard/manage-users"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/admin-dashboard/manage-users"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/admin-dashboard/manage-users"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <FaUsers
                  className={
                    pathName === "/admin-dashboard/manage-users"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Manage Users</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin-dashboard/manage-admins"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/admin-dashboard/manage-admins"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/admin-dashboard/manage-admins"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <RiAdminFill
                  className={
                    pathName === "/admin-dashboard/manage-admins"
                      ? "text-white"
                      : ""
                  }
                />
              </div>
              <span className="font-medium">Admins</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin-dashboard/payment-history"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/admin-dashboard/payment-history"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/admin-dashboard/payment-history"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <MdOutlinePayment
                  className={
                    pathName === "/admin-dashboard/payment-history"
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
              href="/"
              className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 
                ${
                  pathName === "/"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center text-xl 
                  ${
                    pathName === "/"
                      ? "bg-transparent"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <FaHome className={pathName === "/" ? "text-white" : ""} />
              </div>
              <span className="font-medium">Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavigations;

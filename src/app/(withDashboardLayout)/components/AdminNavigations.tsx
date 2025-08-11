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
    <div className="w-full h-full p-4 space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <div className="space-y-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase">
          Admin Routes
        </h2>
        <ul className="space-y-2">
          {[
            { href: "/admin-dashboard/statistics", label: "Statistics", icon: BsGraphUp },
            { href: "/admin-dashboard/manage-posts", label: "Manage Posts", icon: ImBooks },
            { href: "/admin-dashboard/manage-users", label: "Manage Users", icon: FaUsers },
            { href: "/admin-dashboard/manage-admins", label: "Admins", icon: RiAdminFill },
            { href: "/admin-dashboard/payment-history", label: "Payment History", icon: MdOutlinePayment },
            { href: "/", label: "Home", icon: FaHome },
          ].map(({ href, label, icon: Icon }) => {
            const active = pathName === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center space-x-4 p-2 rounded-full transition-colors duration-200 ${
                    active
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full flex items-center justify-center text-xl ${
                      active
                        ? "bg-transparent text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Icon />
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

export default AdminNavigations;

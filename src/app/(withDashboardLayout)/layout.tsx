"use client";

import { ReactNode } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import Sidebar from "@/src/components/Shared/Sidebar";
import UserNavigations from "./components/UserNavigations";
import AdminNavigations from "./components/AdminNavigations";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <section className="fixed w-full h-screen bg-white dark:bg-gray-900">
      <section className="flex max-w-[1500px] mx-auto items-center gap-5 xl:gap-10 relative bg-[#F8F9FB] dark:bg-gray-900 p-3 pr-0 rounded-xl">
        <div className="hidden lg:block w-96">
          <Sidebar>
            {/* Navigations Based on the Role  */}
            {currentUser?.role === "user" && <UserNavigations />}
            {currentUser?.role === "admin" && <AdminNavigations />}
          </Sidebar>
        </div>

        <div className="w-full h-screen overflow-auto scrollbar-hide lg:pr-6 pb-32">
          {children}
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;

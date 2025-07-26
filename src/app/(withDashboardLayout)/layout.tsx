"use client";

import { ReactNode } from "react";

import UserNavigations from "./components/UserNavigations";
import AdminNavigations from "./components/AdminNavigations";
import DashboardDrawerNavbar from "./components/DashboardDrawerNavbar";

import Sidebar from "@/src/components/Shared/Sidebar";
import { useAppSelector } from "@/src/redux/hooks";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <section className="fixed w-full h-screen bg-white dark:bg-gray-900">
      {/* Drawer Navbar for Mobile */}
      <DashboardDrawerNavbar title="Dashboard">
        {currentUser?.role === "user" && <UserNavigations />}
        {currentUser?.role === "admin" && <AdminNavigations />}
      </DashboardDrawerNavbar>

      {/* Main Layout */}
      <section className="flex max-w-[1500px] mx-auto items-start gap-5 xl:gap-10 relative bg-[#F8F9FB] dark:bg-gray-900 p-3 pr-0 rounded-xl">
        {/* Sidebar for Large Screens */}
        <div className="hidden lg:block w-96">
          <Sidebar>
            {currentUser?.role === "user" && <UserNavigations />}
            {currentUser?.role === "admin" && <AdminNavigations />}
          </Sidebar>
        </div>

        {/* Content Area */}
        <div className="w-full h-screen overflow-auto scrollbar-hide lg:pr-6 pb-32">
          {children}
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;

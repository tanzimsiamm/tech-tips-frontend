"use client";

import DrawerNavbar from "@/src/components/Shared/DrawerNavbar";
import FeaturesSidebar from "@/src/components/Shared/FeaturesSidebar";
import Sidebar from "@/src/components/Shared/Sidebar";
import { useAppSelector } from "@/src/redux/hooks";
import { ReactNode } from "react";
import RightSidebar from "./(home)/components/RightSidebar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <section className="min-h-screen w-full bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-inter relative">
      {/* Drawer Navbar for Small Devices */}
      <DrawerNavbar />

      <section className="flex justify-center mx-auto pt-14 lg:pt-0">
        {/* Sidebar for Large Devices */}
        <div className="hidden lg:flex lg:w-72 xl:w-80 2xl:w-96 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen lg:py-0 lg:pr-4">
          <Sidebar>
            <FeaturesSidebar />
          </Sidebar>
        </div>

        {/* Main Content */}
        <main className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl min-h-screen overflow-y-auto scrollbar-hide border-x border-gray-200 dark:border-gray-800">
          {children}
        </main>

        {/* Right Sidebar */}
        {user && (
          <div className="hidden lg:flex lg:w-72 xl:w-80 2xl:w-96 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen lg:py-0 lg:pl-4">
            <RightSidebar />
          </div>
        )}
      </section>
    </section>
  );
};

export default CommonLayout;

"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

interface DashboardDrawerNavbarProps {
  title?: string;
  children: React.ReactNode;
}

const DashboardDrawerNavbar = ({
  title = "Dashboard",
  children,
}: DashboardDrawerNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Top Bar for Mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md">
        <button
          className="p-2 text-gray-800 dark:text-gray-100 focus:outline-none"
          onClick={openDrawer}
          aria-label="Open menu"
        >
          <HiMenuAlt3 className="text-3xl" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h1>
        <div className="w-8" />
      </div>

      {/* Drawer for Mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeDrawer}
            aria-label="Close menu overlay"
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                className="p-2 text-gray-800 dark:text-gray-100 focus:outline-none"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                <HiX className="text-3xl" />
              </button>
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardDrawerNavbar;

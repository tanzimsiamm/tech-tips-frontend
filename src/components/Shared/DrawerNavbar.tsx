"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import FeaturesSidebar from "@/src/components/Shared/FeaturesSidebar";

const DrawerNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Top Navbar for Small Devices */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 bg-white dark:bg-gray-900 shadow-md">
        <button
          className="p-2 text-gray-700 dark:text-gray-300"
          onClick={() => setIsDrawerOpen(true)}
        >
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          My App
        </h1>
      </div>

      {/* Drawer + Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              animate={{ opacity: 0.4 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Sidebar */}
            <motion.div
              key="drawer"
              animate={{ x: 0 }}
              className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 z-50 shadow-lg lg:hidden"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Menu
                </h2>
                <button
                  className="p-2 text-gray-700 dark:text-gray-300"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="p-2 overflow-y-auto h-[calc(100%-4rem)]">
                <FeaturesSidebar showAllText={true} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrawerNavbar;

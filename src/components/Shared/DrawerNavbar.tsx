"use client";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import FeaturesSidebar from "@/src/components/Shared/FeaturesSidebar";
import Link from "next/link";

const DrawerNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  // Trap focus inside drawer
  useEffect(() => {
    if (!isDrawerOpen) return;

    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElem = focusableElements?.[0];
    const lastElem = focusableElements?.[focusableElements.length - 1];

    function handleFocusTrap(e: KeyboardEvent) {
      if (e.key !== "Tab" || !focusableElements) return;

      if (e.shiftKey) {
        if (document.activeElement === firstElem) {
          e.preventDefault();
          lastElem?.focus();
        }
      } else {
        if (document.activeElement === lastElem) {
          e.preventDefault();
          firstElem?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleFocusTrap);
    firstElem?.focus();

    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Top Navbar for Small Devices */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
        <button
          className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={isDrawerOpen}
          aria-controls="drawer-sidebar"
          type="button"
        >
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white select-none">
          <Link href="/">Home</Link>
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
              aria-hidden="true"
            />

            {/* Drawer Sidebar */}
            <motion.aside
              key="drawer"
              animate={{ x: 0 }}
              className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-lg lg:hidden focus:outline-none"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              id="drawer-sidebar"
              role="dialog"
              aria-modal="true"
              ref={drawerRef}
              tabIndex={-1}
            >
              {/* Drawer Header */}
              <div className="flex justify-end items-center p-3 border-b border-gray-200 dark:border-gray-700">
                <button
                  className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  type="button"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="p-2 overflow-y-auto h-[calc(100%-3.2rem)]">
                <FeaturesSidebar showAllText={true} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrawerNavbar;

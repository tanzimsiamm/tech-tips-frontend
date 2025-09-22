"use client";

import { ReactNode } from "react";
import RightSidebar from "./(home)/components/RightSidebar";
import DrawerNavbar from "@/src/components/Shared/DrawerNavbar";
import FeaturesSidebar from "@/src/components/Shared/FeaturesSidebar";
import Sidebar from "@/src/components/Shared/Sidebar";
import { useAppSelector } from "@/src/redux/hooks";
import { usePathname } from "next/navigation";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();

  // Routes where right sidebar should be hidden
  const hideRightSidebarRoutes = [
    "/membership",
    "/details",
    "/about",
    "/contact",
    "/latest-event",
    "/mobile-follow",
  ];

  // Show right sidebar only if user exists and current route is not hidden
  const shouldShowRightSidebar =
    user && !hideRightSidebarRoutes.some((route) => pathname.startsWith(route));

  return (
    <section
      className="
        min-h-screen w-full 
        bg-gray-50 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100 
        font-inter 
        relative
      "
    >
      <DrawerNavbar />

      <section className="flex justify-center mx-auto pt-14 lg:pt-0">
        {/* Left Sidebar - visible only on lg+ screens */}
        <aside
          className="
            hidden lg:flex 
            lg:w-72 xl:w-80 2xl:w-96 
            flex-shrink-0 
            lg:sticky lg:top-0 
            lg:h-screen lg:py-0 
            lg:pr-4
          "
        >
          <Sidebar>
            <FeaturesSidebar />
          </Sidebar>
        </aside>

        {/* Main Content */}
        <main
          className={`
            w-full min-h-screen overflow-y-auto scrollbar-hide 
            border-x border-gray-200 dark:border-gray-700
            ${
              shouldShowRightSidebar
                ? "max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"
                : "max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl"
            }
          `}
        >
          {children}
        </main>

        {/* Right Sidebar - visible only on lg+ screens when allowed */}
        {shouldShowRightSidebar && (
          <aside
            className="
              hidden lg:flex 
              lg:w-72 xl:w-80 2xl:w-96 
              flex-shrink-0 
              lg:sticky lg:top-0 
              lg:h-screen lg:py-0 
              lg:pl-4
            "
          >
            <RightSidebar />
          </aside>
        )}
      </section>
    </section>
  );
};

export default CommonLayout;

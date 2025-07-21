import { ReactNode } from "react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-hide bg-white dark:bg-gray-800 relative lg:w-72 xl:w-80 2xl:w-96 lg:flex-shrink-0 lg:sticky lg:top-0 lg:pb-8 lg:px-4 border-r border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
};

export default Sidebar;

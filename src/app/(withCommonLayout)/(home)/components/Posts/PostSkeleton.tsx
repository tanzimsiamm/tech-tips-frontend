const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full mx-auto border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        <div className="ml-3 flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2" />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 rounded-lg overflow-hidden">
        <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200 dark:bg-gray-700 rounded-lg col-span-full" />
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>

      <div className="flex flex-col space-y-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3" />
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;

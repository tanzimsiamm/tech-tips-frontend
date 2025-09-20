// frontend/src/components/UI/Loading.tsx
import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
        <Loader className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
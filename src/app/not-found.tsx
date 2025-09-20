'use client';

import React from "react";
import Link from 'next/link';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import { Frown } from 'lucide-react';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <Frown className="w-24 h-24 text-red-500 mb-6" />
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl md:text-2xl font-semibold text-center mb-4">
        Page Not Found
      </p>
      <p className="text-lg text-center max-w-md mb-8 text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          color="primary"
          onClick={() => router.back()}
          className="px-8 py-3 rounded-lg shadow-md font-semibold"
        >
          Go Back
        </Button>
        <Link href="/" passHref>
          <Button
            variant="bordered"
            color="primary"
            className="px-8 py-3 rounded-lg shadow-md font-semibold"
          >
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
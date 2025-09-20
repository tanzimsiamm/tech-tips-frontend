// frontend/src/app/(commonLayout)/error.tsx
'use client';

import React from "react";
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-800 dark:text-white p-4">
      <Frown className="w-24 h-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-red-500 mb-2 text-center">Something went wrong!</h1>
      <p className="text-lg text-center max-w-lg mb-8 text-gray-600 dark:text-gray-400">
        We're sorry, but an unexpected error occurred. Please try again.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          color="danger"
          onClick={() => reset()}
          className="px-8 py-3 rounded-lg shadow-md font-semibold"
        >
          Try again
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
}
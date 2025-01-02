import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="bg-white dark:bg-black h-screen flex items-center justify-center bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.1]">
      <div className="p-8 bg-gray-100 dark:bg-gray-900 shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block py-3 px-6 bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}

export default Error;

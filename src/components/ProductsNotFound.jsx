import React from 'react';
import { Link } from 'react-router-dom';

function ProductsNotFound() {
  return (
    <div className="bg-white dark:bg-black h-screen flex items-center justify-center bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.1]">
      <div className="bg-gray-100 dark:bg-gray-900 p-8 shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8">
          No Products Found
        </h1>
        <Link
          to="/"
          className="inline-block py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}

export default ProductsNotFound;

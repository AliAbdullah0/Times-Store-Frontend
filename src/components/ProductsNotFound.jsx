import React from 'react'
import {Link} from 'react-router'
function ProductsNotFound() {
  return (
    <div class="bg-black h-screen flex items-center justify-center">
    <div class="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-8">No Products Found</h1>
        <Link to="/" class="inline-block py-3 px-6 bg-pink-500 hover:bg-pink-500 text-white rounded-lg font-semibold">Go
            back to homepage</Link>
    </div>
</div>
  )
}

export default ProductsNotFound

import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div class="bg-black h-screen flex items-center justify-center">
    <div class="p-8 bg-gray-100 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">404 - Page Not Found</h1>
        <p class="text-gray-600 mb-6">The page you are looking for might have been removed, had its name changed or is
            temporarily unavailable.</p>
        <Link to="/" class="inline-block py-3 px-6bg-black text-white rounded-lg font-semibold">Go
            back to homepage</Link>
    </div>
</div>
  )
}

export default Error

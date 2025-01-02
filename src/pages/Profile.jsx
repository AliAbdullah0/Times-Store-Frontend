import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../ProfileContext'; // Import the ProfileContext
import axios from 'axios';

function Profile() {
  const {
    user,
    orders,
    canceledOrders,
    userEmail,
    userPhone,
    username,
    isLoading,
    error,
    isCanceledLoading,
    cartCheckoutOrders, // Access cart checkout orders
    cancelingError,
    deleteProfile,
    loadingOrderId,
    handleCartCheckoutCancellation,
    handleOrderCancellation,
  } = useProfile(); // Access the context values

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <div className="w-[95%] mx-auto p-6 drop-shadow-xl rounded-lg shadow-lg bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
      <h1 className="text-3xl font-extrabold text-pink-500 mb-6">Your Profile</h1>

      {isLoading ? (
        <div className="flex w-full justify-center items-center rounded-2xl">
          {/* Loader component or animation */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {user && (
            <div className="mb-6 bg-transparent p-4 rounded-lg shadow text-white dark:text-white">
              <h2 className="text-2xl font-semibold text-indigo-500">
                <span className='text-2xl font-semibold text-blue-500'>Hello,</span> {user.username}
              </h2>
              <p className="italic text-indigo-500">{user.email}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4 text-pink-500 dark:text-white">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="p-4 text-white rounded-lg bg-black dark:bg-white dark:text-black">
                  <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                  <p>Products: {order.Products}</p>
                  <p>Total Price: Rs {order.TotalPrice}</p>
                  <a href='/canceledorders' className='text-blue-500 hover:underline'>Status</a>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <button
                    className={`pl-2 pr-2 py-1.5 ${localStorage.getItem(`canceled_${order.id}`)
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : loadingOrderId === order.id
                        ? 'bg-blue-400 text-white cursor-wait'
                        : 'bg-red-500 text-white hover:bg-red-600 transition-all'
                      } rounded-md mt-1`}
                    onClick={() => handleOrderCancellation(order.id)}
                    disabled={localStorage.getItem(`canceled_${order.id}`) || loadingOrderId === order.id}
                  >
                    {loadingOrderId === order.id ? (
                      <span className="flex items-center gap-1">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        Canceling...
                      </span>
                    ) : localStorage.getItem(`canceled_${order.id}`)
                      ? 'Canceled'
                      : 'Cancel Order'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No orders found.</p>
          )}

          {cancelingError && (
            <div className="text-center text-red-500 text-lg">
              The selected order is already canceled.
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4 text-pink-500 dark:text-white">Your Cart Checkout Orders</h2>
          {cartCheckoutOrders.length > 0 ? (
            <ul className="space-y-4">
              {cartCheckoutOrders.map((cartCheckout) => (
                <li key={cartCheckout.id} className="p-4 text-white bg-black dark:bg-white dark:text-black">
                  <h3 className="text-xl font-semibold">Cart Checkout ID: {cartCheckout.id}</h3>
                  <p>Products: {cartCheckout.Products}</p>
                  <p>Total Price: Rs {cartCheckout.TotalPrice}</p>
                  <a href='/canceledorders' className='text-blue-500 hover:underline'>Status</a>
                  <p>Date: {new Date(cartCheckout.createdAt).toLocaleDateString()}</p>
                  <button
                    className={`pl-2 pr-2 py-1.5 ${localStorage.getItem(`canceled_${cartCheckout.id}`)
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : loadingOrderId === cartCheckout.id
                        ? 'bg-blue-400 text-white cursor-wait'
                        : 'bg-red-500 text-white hover:bg-red-600 transition-all'
                      } rounded-md mt-1`}
                    onClick={() => handleCartCheckoutCancellation(cartCheckout.id)}
                    disabled={localStorage.getItem(`canceled_${cartCheckout.id}`) || loadingOrderId === cartCheckout.id}
                  >
                    {loadingOrderId === cartCheckout.id ? (
                      <span className="flex items-center gap-1">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        Canceling...
                      </span>
                    ) : localStorage.getItem(`canceled_${cartCheckout.id}`)
                      ? 'Canceled'
                      : 'Cancel Cart Checkout Order'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No cart checkout orders found.</p>
          )}

        </>
      )}
      
    </div>
  );
}

export default Profile;

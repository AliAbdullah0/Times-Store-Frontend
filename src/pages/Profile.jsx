import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelingError, setCancelingError] = useState(false);
  const [cancelingOrderId, setCancelingOrderId] = useState(null); // Track which order is being canceled
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [isCanceledLoading, setIsCanceledLoading] = useState(false); // Loading state for canceled orders
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    fetchUserProfile(decodedToken.email);
    fetchCanceledOrders();
  }, [navigate]);

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`https://times-store-production.up.railway.app/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setUserEmail(data.email);
      setUserPhone(data.phone);
      setUsername(data.username);
      fetchUserOrders(data.email);
    } catch (error) {
      setError('Failed to load user profile.');
    }
  };

  const fetchUserOrders = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://times-store-production.up.railway.app/api/orders?populate=*`);
      const filteredOrders = response.data.data.filter((order) => order.Email === email);
      setOrders(filteredOrders);
    } catch (error) {
      setError('Failed to load orders.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCanceledOrders = async () => {
    setIsCanceledLoading(true);
    try {
      const response = await axios.get(`https://times-store-production.up.railway.app/api/canceleds?populate=*`);
      setCanceledOrders(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCanceledLoading(false);
    }
  };

  const [loadingOrderId, setLoadingOrderId] = useState(null); // New state for tracking loading

const handleOrderCancellation = async (orderId) => {
  setLoadingOrderId(orderId); // Set the loading order ID
  try {
    setCancelingError(false);

    if (canceledOrders.some((order) => order.OrderId === orderId)) {
      setCancelingError(true);
      setIsModalOpen(true);
      return;
    }

    const orderToCancel = orders.find((order) => order.id === orderId);
    if (!orderToCancel) throw new Error('Order not found');

    await axios.post(
      `https://times-store-production.up.railway.app/api/canceleds/`,
      {
        data: {
          Product: orderToCancel?.Products || 'N/A',
          OrderId: orderId,
          OrderedOn: new Date(orderToCancel?.createdAt).toISOString(),
          CanceledOn: new Date().toISOString(),
          OrderedBy: username,
          Email: userEmail,
          Phone: userPhone,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );

    localStorage.setItem(`canceled_${orderId}`, true);
    navigate('/canceledorders');
  } catch (error) {
    setError(error.response?.data?.message || 'Failed to cancel the order.');
  } finally {
    setLoadingOrderId(null); // Reset loading state
  }
};

  

  useEffect(() => {
    // Load the canceled buttons state from local storage
    const canceledButtonState = JSON.parse(localStorage.getItem('canceledButtons')) || {};
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        canceledButtonState[order.id]
          ? { ...order, state: 'canceled' }
          : order
      )
    );
  }, []);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-[95%] mx-auto p-6 drop-shadow-xl rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-pink-500 mb-6">Your Profile</h1>

      {isLoading ? (
        <div className="flex w-full justify-center items-center rounded-2xl">

          <div class="mx-auto bg-zinc-800 w-full rounded-2xl">
            <div class="h-48 p-3 overflow-hidden bg-zinc-900 rounded-2xl animate-pulse">
            </div>
            <div class="p-3 h-full rounded-lg">
              <div class="grid grid-cols-3 gap-4 mt-2">
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 col-span-2 bg-zinc-900 rounded animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 col-span-2 bg-zinc-900 rounded animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
                <div class="h-8 col-span-2 bg-zinc-900 rounded animate-pulse">
                </div>
                <div class="h-8 rounded bg-zinc-900 animate-pulse">
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {user && (
            <div className="mb-6 bg-transparent p-4 rounded-lg shadow text-white">
              <h2 className="text-2xl font-semibold text-indigo-500"><span className='text-2xl font-semibold text-blue-500'>Hello,</span> {user.username}</h2>
              <p className="italic text-indigo-500">{user.email}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4 text-white">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="p-4 text-white rounded-lg bg-black">
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
            <p className="text-center text-gray-200">No orders found.</p>
          )}

          {cancelingError && (
            <div className="text-center text-red-500 text-lg">
              The selected order is already canceled.
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center">Order Already Canceled</h2>
                <p className="text-center mt-4">This order has already been canceled.</p>
                <div className="mt-4 text-center">
                  <button
                    className="bg-black text-pink-200 py-2 px-4 rounded-md hover:transition-all"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;

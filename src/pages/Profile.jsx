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

  const handleOrderCancellation = async (orderId) => {
    try {
      setCancelingError(false); 

      if (canceledOrders.some((order) => order.OrderId === orderId)) {
        setCancelingError(true);
        setIsModalOpen(true); 
        return;
      }

      setCancelingOrderId(orderId);

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

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, state: 'canceled' } : order
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel the order.');
    } finally {
      setCancelingOrderId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="w-[95%] mx-auto p-6 drop-shadow-xl rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-pink-500 mb-6">Your Profile</h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {user && (
            <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold">Hello, {user.username}</h2>
              <p className="italic">{user.email}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                  <p>Products: {order.Products}</p>
                  <p>Total Price: Rs {order.TotalPrice}</p>
                  <a href='/canceledorders' className='text-blue-500 hover:underline'>Status</a>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <button
                    className="pl-2 pr-2 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-all rounded-md mt-1"
                    onClick={() => handleOrderCancellation(order.id)}
                    disabled={cancelingError==true} // Disable button if this order is being canceled
                  >
                    {cancelingOrderId === order.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-75"></div>
                    ) : (
                      'Cancel Order'
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No orders found.</p>
          )}

          {cancelingError && (
            <div className="text-center text-red-500 text-lg">
              The selected order is already canceled.
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center">Order Already Canceled</h2>
                <p className="text-center mt-4">This order has already been canceled.</p>
                <div className="mt-4 text-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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

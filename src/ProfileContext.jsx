import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://times-store-production.up.railway.app'; // API URL constant

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCanceledLoading, setIsCanceledLoading] = useState(false);
  const [cancelingError, setCancelingError] = useState(false);
  const [loadingOrderId, setLoadingOrderId] = useState(null); // Track which order is being canceled

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (!user) { // Only fetch user profile if not already present
      fetchUserProfile(decodedToken.email);
    }
    fetchCanceledOrders();
  }, [user]);

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
    setLoadingOrderId(orderId); // Set the loading order ID
    try {
      setCancelingError(false);

      if (canceledOrders.some((order) => order.OrderId === orderId)) {
        setCancelingError(true);
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
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel the order.');
    } finally {
      setLoadingOrderId(null); // Reset loading state
    }
  };

  const value = {
    user,
    orders,
    canceledOrders,
    userEmail,
    userPhone,
    username,
    isLoading,
    error,
    isCanceledLoading,
    cancelingError,
    loadingOrderId,
    handleOrderCancellation,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

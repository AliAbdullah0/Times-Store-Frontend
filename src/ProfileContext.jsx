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
  const [cartCheckoutOrders, setCartCheckoutOrders] = useState([]); // New state for Cart Checkout orders
  const [userId,setUserId] = useState(0)
  const [deletingProfile,setDeletingProfile] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (!user) { // Only fetch user profile if not already present
      fetchUserProfile(decodedToken.email);
    }
    fetchCanceledOrders();
    fetchCartCheckoutOrders(); // Fetch Cart Checkout orders when the component mounts
  }, [user]);

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setUserId(data.id)
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
      const response = await axios.get(`${API_URL}/api/orders?populate=*`);
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
      const response = await axios.get(`${API_URL}/api/canceleds?populate=*`);
      setCanceledOrders(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCanceledLoading(false);
    }
  };


  const fetchCartCheckoutOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cartcheckouts?populate=*`);
      setCartCheckoutOrders(response.data.data);
    } catch (error) {
      setError('Failed to load cart checkout orders.');
    }
  };

  const handleCartCheckoutCancellation = async (cartCheckoutId) => {
    setLoadingOrderId(cartCheckoutId); 
    try {
      setCancelingError(false);
  
      if (canceledOrders.some((order) => order.OrderId === cartCheckoutId)) {
        setCancelingError(true);
        return;
      }
  
      const cartCheckoutToCancel = cartCheckoutOrders.find((order) => order.id === cartCheckoutId);
      if (!cartCheckoutToCancel) throw new Error('Cart checkout not found');
  
      await axios.post(
        `${API_URL}/api/canceleds/`,
        {
          data: {
            Product: cartCheckoutToCancel?.Products || 'N/A',
            OrderId: cartCheckoutId,
            OrderedOn: new Date(cartCheckoutToCancel?.createdAt).toISOString(),
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
  
      localStorage.setItem(`canceled_${cartCheckoutId}`, true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel the cart checkout order.');
    } finally {
      setLoadingOrderId(null);
    }
  };
  

  const handleOrderCancellation = async (orderId) => {
    setLoadingOrderId(orderId); 
    try {
      setCancelingError(false);

      if (canceledOrders.some((order) => order.OrderId === orderId)) {
        setCancelingError(true);
        return;
      }

      const orderToCancel = orders.find((order) => order.id === orderId);
      if (!orderToCancel) throw new Error('Order not found');

      await axios.post(
        `${API_URL}/api/canceleds/`,
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
      setLoadingOrderId(null);
    }
  };
  const deleteProfile = async ()=>{
    setDeletingProfile(true)
    const response = await axios.delete(`${API_URL}/api/users/${userId}`).then(()=>console.log("User Deleted!")).catch((err)=>console.log("Error Deleting User:",err))
    if(response.ok){
      setDeletingProfile(false)
    }
    
  }
  const value = {
    user,
    orders,
    canceledOrders,
    cartCheckoutOrders, 
    userEmail,
    userPhone,
    username,
    isLoading,
    error,
    isCanceledLoading,
    cancelingError,
    loadingOrderId,
    handleOrderCancellation,
    handleCartCheckoutCancellation,
    deleteProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

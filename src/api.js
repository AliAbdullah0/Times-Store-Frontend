import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;;

export const fetchProducts = () => axios.get(`${API_URL}/products?populate=*`);
// export const createOrder = (data) => axios.post(`${API_URL}/orders`, data);
// export const createPaymentSession = (data) => axios.post(`${API_URL}/order`, data);

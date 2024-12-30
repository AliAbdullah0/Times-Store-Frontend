import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;;

export const fetchProducts = () => axios.get(`https://times-store-production.up.railway.app/api/products?populate=*`);
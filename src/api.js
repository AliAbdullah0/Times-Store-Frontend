import axios from 'axios';

export const fetchProducts = () => axios.get(`https://times-store-production.up.railway.app/api/products?populate=*`);
export const fetchWomenWatches = () => axios.get('https://times-store-production.up.railway.app/api/womens?populate=*')
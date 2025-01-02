import axios from 'axios';

const API_URL = `https://times-store-production.up.railway.app/`

export const fetchProducts = () => axios.get(`${API_URL}api/products?populate=*`);
export const fetchWomenWatches = () => axios.get(`${API_URL}api/womens?populate=*`)
export const fetchSliderImages = () => axios.get(`${API_URL}api/sliderimages?populate=*`)
export const fetchUserFeedbacks = () => axios.get(`${API_URL}api/feedbacks?populate=*`)
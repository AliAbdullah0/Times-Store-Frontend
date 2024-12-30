import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';
import Error from '../pages/Error'
import ProductsNotFound from '../components/ProductsNotFound'
import Checkout from './Checkout';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data.data || []);

    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderLoading = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <img src="imgs/1496.gif" alt="Loading" className="h-14" />
    </div>
  );

  const renderError = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Error/>
    </div>
  );

  const renderNoProducts = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <ProductsNotFound/>
    </div>
  );


  const renderProducts = () =>
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <div className="w-full flex flex-col md:flex-row p-2 items-center md:items-start h-fit dark:bg-gray-800">
      {loading
        ? renderLoading()
        : error
        ? renderError()
        : products.length > 0
        ? renderProducts()
        : renderNoProducts()}
    </div>
  );
}

export default Products;

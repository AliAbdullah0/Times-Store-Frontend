import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import {fetchWomenWatches } from '../api';
import Error from '../pages/Error';
import ProductsNotFound from '../components/ProductsNotFound';
import { MultiStepLoader } from '../components/ui/MultiStepLoader';
import { useProduct } from '../ProductContext';

function Products() {
  const { products, setProducts } = useProduct(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getProducts = async () => {
    if (products.length > 0) return; 

    setLoading(true);
    try {
      const response = await fetchWomenWatches();
      setProducts(response.data.data || []); 

    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products, setProducts]);

  const renderLoading = () => (
    <MultiStepLoader
      loading={true}
      loadingStates={[
        { text: 'Browsing Timeless Designs' },
        { text: 'Assembling Precision Pieces' },
        { text: 'Polishing for Perfection' },
        { text: 'Your Timepiece Awaits!' },
      ]}
      duration={500}
      loop={true}
    />
  );

  const renderError = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Error />
    </div>
  );

  const renderNoProducts = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <ProductsNotFound />
    </div>
  );

  const renderProducts = () =>
    products.map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <div className="w-full dark:bg-grid-small-white/[0.2] light:bg-grid-small-black/[0.2] flex flex-col md:flex-row p-2 items-center md:items-start h-fit dark:bg-black bg-white gap-2 flex-wrap">
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

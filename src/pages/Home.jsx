import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';
import Error from '../pages/Error';
import ProductsNotFound from '../components/ProductsNotFound';
import Checkout from './Checkout';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredProducts = products.filter((product) => {
    // Ensure product name and category are defined before applying .toLowerCase()
    const matchesQuery = product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by search query and selected filter
    if (selectedFilter === 'all') return matchesQuery;
    if (selectedFilter === 'category' && matchesCategory) return true;
    return matchesQuery;
  });

  const renderLoading = () => (
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
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
    filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <div className="w-full flex flex-col md:flex-row p-2 items-center md:items-start h-fit dark:bg-gray-800 gap-2 flex-wrap">
      {/* Search Bar */}
      <div className="w-full mb-4 flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="absolute right-3 top-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {loading
        ? renderLoading()
        : error
        ? renderError()
        : filteredProducts.length > 0
        ? renderProducts()
        : renderNoProducts()}
    </div>
  );
}

export default Products;

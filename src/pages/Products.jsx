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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const renderLoading = () => (
    <div className="flex justify-center items-center">
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

  const filteredProducts = products.filter((product) => {
    // Ensure product name and category are defined before applying .toLowerCase()
    const matchesQuery = product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase());
  
    // Filter by search query and selected filter
    if (selectedFilter === 'all') return matchesQuery;
    if (selectedFilter === 'category' && matchesCategory) return true;
    return matchesQuery;
  });
  

  const renderProducts = () =>
    filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <div className="w-full flex flex-col p-2 items-center md:items-start h-fit dark:bg-gray-800 gap-2 flex-wrap">
      {/* Search Bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="p-2 border rounded-lg w-64"
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="category">Category</option>
          {/* Add more filter options as needed */}
        </select>
      </div>

      {/* Render Products */}
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

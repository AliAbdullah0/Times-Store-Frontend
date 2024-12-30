import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';

function Carousel() {
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

    return (
        <div className="relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">Loading...</div>}
            {error && <div className="absolute inset-0 flex items-center justify-center bg-red-200 bg-opacity-75">{error}</div>}
            
            <div className="carousel-container overflow-hidden relative">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(products.length > 0 && 100 / products.length) * (products.length % 3)}%)` }}>
                    {products.map((product, index) => (
                        <div key={index} className="carousel-item flex-shrink-0 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                            <img
                                src={product.image || 'https://via.placeholder.com/150'}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="mt-2 text-center">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel controls */}
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => setProducts(products.slice(1))}>
                &#8249;
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => setProducts(products.slice(0, -1))}>
                &#8250;
            </button>
        </div>
    );
}

export default Carousel;

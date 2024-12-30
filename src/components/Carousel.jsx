import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';

function Carousel() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">Loading...</div>}
            {error && <div className="absolute inset-0 flex items-center justify-center bg-red-200 bg-opacity-75">{error}</div>}

            <div className="carousel-container overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(100 / products.length) * currentIndex}%)`,
                    }}
                >
                    {products.map((product, index) => (
                        <div key={index} className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                            <img
                                src={product.image.url}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="mt-2 text-center">
                                <h3 className="text-lg font-semibold dark:text-white">{product.name}</h3>
                                <p className="text-sm text-pink-500">Rs {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel controls */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                &#8249;
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                &#8250;
            </button>
        </div>
    );
}

export default Carousel;

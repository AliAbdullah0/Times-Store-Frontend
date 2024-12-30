import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';

function Carousel() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1); // Start from index 1 to avoid showing an empty space initially

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

    useEffect(() => {
        if (products.length === 0) return; // Prevent interval from running if no products
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Change slides every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [products.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative">
            {loading && (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-200 bg-opacity-75">
                    {error}
                </div>
            )}

            <div className="carousel-container overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(100 / products.length) * currentIndex}%)`,
                    }}
                >
                    {products.length > 0 && (
                        <>
                            <div className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                                <img
                                    src={products[products.length - 1].image.url}
                                    alt={products[products.length - 1].name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-semibold dark:text-white">
                                        {products[products.length - 1].name}
                                    </h3>
                                    <p className="text-sm text-pink-500">
                                        Rs {products[products.length - 1].price}
                                    </p>
                                </div>
                            </div>
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
                            <div className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                                <img
                                    src={products[0].image.url}
                                    alt={products[0].name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-semibold dark:text-white">{products[0].name}</h3>
                                    <p className="text-sm text-pink-500">Rs {products[0].price}</p>
                                </div>
                            </div>
                        </>
                    )}
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

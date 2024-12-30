import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';

function Carousel() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

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
        if (products.length === 0) return;
        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === 1 ? products.length : prevIndex - 1;
            return newIndex;
        });
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === products.length ? 1 : prevIndex + 1;
            return newIndex;
        });
    };

    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setCurrentIndex(products.length);
        } else if (currentIndex === products.length + 1) {
            setCurrentIndex(1);
        }
        setIsTransitioning(false);
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
                        transform: `translateX(-${(100 / (products.length + 2)) * currentIndex}%)`,
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {products.length > 0 && (
                        <>
                            {/* Clone the last item */}
                            <div className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 group relative">
                                <div className="relative">
                                    <img
                                        src={products[products.length - 1].image.url}
                                        alt={products[products.length - 1].name}
                                        className="w-full h-48 object-cover rounded-lg transition duration-300 group-hover:blur-sm"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-lg font-semibold dark:text-white bg-black bg-opacity-50 p-2 rounded-lg">
                                            {products[products.length - 1].name}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Show all products */}
                            {products.map((product, index) => (
                                <div key={index} className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 group relative">
                                    <div className="relative">
                                        <img
                                            src={product.image.url}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-lg transition duration-300 group-hover:blur-sm"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <h3 className="text-lg font-semibold dark:text-white bg-black bg-opacity-50 p-2 rounded-lg">
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clone the first item */}
                            <div className="carousel-item flex-shrink-0 drop-shadow-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 group relative">
                                <div className="relative">
                                    <img
                                        src={products[0].image.url}
                                        alt={products[0].name}
                                        className="w-full h-48 object-cover rounded-lg transition duration-300 group-hover:blur-sm"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-lg font-semibold dark:text-white bg-black bg-opacity-50 p-2 rounded-lg">
                                            {products[0].name}
                                        </h3>
                                    </div>
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

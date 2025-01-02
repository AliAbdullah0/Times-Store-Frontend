import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

function ProductCard({ product }) {
  if (!product) return null;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const fallbackImage = 'default-image.png'; // Replace with your actual fallback image path if necessary.

  return (
    <div className="flex flex-col w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
      {/* Product Image */}
      <div className="w-full overflow-hidden">
        <img
          src={product.image?.url || fallbackImage}
          alt={product.title || 'Product'}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4">
        <h3 className="font-extrabold text-pink-400 text-2xl">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-200 text-sm">{product.description}</p>
        <p className="text-gray-600 dark:text-gray-200 text-sm">
          <span className="font-extrabold text-base text-gray-800 dark:text-gray-200">Items Left: </span>
          {product.stock}
        </p>
        <p className="font-semibold text-sm text-pink-400">
          <span className="font-extrabold text-base text-gray-800 dark:text-gray-200">Rs </span>
          {product.price}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 pb-4">
        <Link
          to={{
            pathname: `/product/checkout/${product.id}/${product.title}/${product.price}/${encodeURIComponent(
              product.image?.url || fallbackImage
            )}`,
            state: { product },
          }}
          className="flex-grow bg-pink-600 hover:bg-pink-700 text-white text-xs md:text-base p-2 text-center rounded transition-all"
        >
          Buy Now
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex-grow ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-base p-2 rounded transition-all"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

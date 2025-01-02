import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

function ProductCard({ product }) {
  if (!product) return null;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Directly dispatch the product as payload
  };

  return (
    <div className="flex flex-col md:w-[23%] w-10/12 justify-between bg-black dark:bg-transparent border border-gray-300 dark:border-gray-700 rounded-md ml-2 mr-2 hover:scale-[1.03] hover:transition-all hover:shadow-2xl drop-shadow-xl p-3">
      {/* Product Image */}
      <div className="w-full overflow-hidden">
        <img
          src={product.image?.url || 'default-image.png'}
          alt={product.title || 'Product'}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Details */}
      <div className="flex h-full items-end justify-between w-full p-1">
        <ul className="flex flex-col items-start justify-start w-fit">
          <li className="font-extrabold text-pink-400 text-2xl">{product.title}</li>
          <li className="text-gray-700 dark:text-gray-200 text-sm">{product.description}</li>
          <li className="text-gray-700 dark:text-gray-200 text-sm">
            <span className="font-extrabold text-base text-gray-900 dark:text-gray-200">Items Left:</span> {product.stock}
          </li>
          <li className="font-semibold font-[Roboto] text-sm text-pink-400">
            <span className="font-extrabold text-base text-gray-900 dark:text-gray-200">Rs </span> {product.price}
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={{
              pathname: `/product/checkout/${product.id}/${product.title}/${product.price}/${encodeURIComponent(
                product.image?.url || 'default-image.png'
              )}`,
              state: { product },
            }}
          >
            <button className="bg-pink-500 text-white text-xs md:text-base px-4 py-2 rounded hover:bg-pink-600 transition-all">
              Buy Now
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white text-xs md:text-base px-4 py-2 rounded hover:bg-blue-600 transition-all"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

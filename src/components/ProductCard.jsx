import React from 'react';
import { Link } from 'react-router-dom'; 
function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="flex flex-col md:w-[23%] w-10/12 justify-between ml-2 mr-2 dark:bg-gray-900 drop-shadow-xl rounded-md p-2">
      <div className='w-full overflow-hidden'>
        <img
          src={product.image?.url || 'default-image.png'}
          alt={product.title || 'Product'}
          className="size-full rounded hover:scale-105 hover:transition-all "
        />
      </div>
      <div className="flex h-full items-end justify-between w-full p-1">
        <ul className="flex flex-col items-start justify-start w-fit">
          <li className="font-extrabold text-pink-400 text-2xl">{product.title}</li>
          <li className="dark:text-gray-200 text-sm">{product.description}</li>
          <li className="dark:text-gray-200 text-sm">
            <span className="font-extrabold text-base text-gray-800 dark:text-gray-200">Items Left:</span> {product.stock}
          </li>
          <li className="font-semibold font-[Roboto] text-sm text-pink-400">
            <span className="font-extrabold text-base dark:text-gray-200">Rs </span> {product.price}
          </li>
        </ul>
        
        <Link
          to={{
            pathname: `/product/checkout/${product.id}/${product.title}/${product.price}/${encodeURIComponent(product.image.url)}`,
            state: { product } 
          }}
        >
          <button className="bg-pink-500 text-white text-sm md:text-base p-2 rounded-xl hover:bg-pink-600 hover:transition-all">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../features/CartSlice';

const MyCartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      dispatch({ type: 'cart/setCart', payload: cartData });
    }
  }, [dispatch]);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-600">Rs {item.price}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">Total: Rs {cart.totalPrice}</p>
          </div>
          <Link
            to='cartcheckout'
          >
            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCartPage;

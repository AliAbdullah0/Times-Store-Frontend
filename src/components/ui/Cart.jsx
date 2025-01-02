// src/components/CartDrawer.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/CartSlice";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <>
      {/* Cart Icon */}
      <div
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full cursor-pointer"
        onClick={toggleDrawer}
      >
        <span className="text-xl">🛒</span>
      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleDrawer}
      />
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white p-6 overflow-y-auto transition-transform ${
          isOpen ? "transform-none" : "transform translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between mb-4">
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <p className="font-semibold">Total: ${cart.totalPrice}</p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;

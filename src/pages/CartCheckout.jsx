import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CartCheckout() {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart); // Getting cart data from Redux
  const [userData, setUserData] = useState({ email: '', username: '' });
  const [formData, setFormData] = useState({
    Address: '',
    Phone: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deliveryCharge = 300;

  // Calculate total price
  const totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0) + deliveryCharge;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://times-store-production.up.railway.app/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserData({ email: user.email, username: user.username });
        } else {
          navigate('/login');
        }
      } catch {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://times-store-production.up.railway.app/api/cartcheckouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            Name: userData.username,
            Address: formData.Address,
            Phone: formData.Phone,
            Email: userData.email,
            Products: cart.items.map(item => item.title).join(', '),
            TotalPrice: totalPrice,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(`Order placed successfully! Order ID: ${result.data.id}`);
        setFormData({ Address: '', Phone: '' });
        setIsModalOpen(true);
      } else {
        setErrorMessage('Failed to place the order. Please try again.');
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-4xl mt-4 mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Checkout</h1>

      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Your Cart</h2>
          <ul>
            {cart.items.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span className="text-lg text-gray-800 dark:text-white">{item.title}</span>
                <span className="text-lg text-pink-500">Rs {item.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-4 space-y-2">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Delivery Charge: <span className="font-semibold text-pink-500">Rs {deliveryCharge}</span>
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Total Price: <span className="font-semibold text-pink-500">Rs {totalPrice}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Email: <span className="font-semibold text-pink-500">{userData.email}</span>
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Username: <span className="font-semibold text-pink-500">{userData.username}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="p-3 border rounded-md bg-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="Phone"
            placeholder="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="p-3 border rounded-md bg-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700"
          disabled={isLoading}
        >
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-500 dark:text-green-400">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500 dark:text-red-400">{errorMessage}</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Order Confirmed!
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Your order has been placed successfully. Thank you for shopping with us!
            </p>
            <button
              onClick={closeModal}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartCheckout;

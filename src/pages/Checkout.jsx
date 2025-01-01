import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from '../components/ui/Background-beams-with-collision';

function Checkout() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id, title, price, image } = useParams();
  const [userData, setUserData] = useState({ email: '', username: '' });
  const [formData, setFormData] = useState({
    Address: '',
    Phone: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const productImage = image;
  const deliveryCharge = 300;
  const totalPrice = parseFloat(price) + deliveryCharge;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login'); 
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://times-store-production.up.railway.app/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserData({ email: user.email, username: user.username });
        } else {
          console.error('Failed to fetch user data');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      const response = await fetch('https://times-store-production.up.railway.app/api/orders', {
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
            Products: title,
            TotalPrice: totalPrice,
          },
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        setErrorMessage(`Failed to place the order. Details: ${errorDetails.error.details[0].message}`);
      } else {
        const result = await response.json();
        setSuccessMessage(`Order placed successfully! Order ID: ${result.data.id}`);
        setFormData({ Address: '', Phone: '' });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mt-2 mb-2 mx-auto p-6 bg-transparent shadow-lg">
      <h1 className="text-3xl font-bold text-pink-500 mb-6"><span className='text-white'>Chec</span>kout</h1>
      
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="w-full md:w-1/2 p-4 overflow-hidden">
          <h2 className="text-2xl font-semibold mb-2 text-white">{title}</h2>
          <div className="overflow-hidden w-full">
            <img src={productImage} alt={title} className="w-full h-64 object-cover rounded-md hover:scale-105 hover:transition-all" />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <p className="text-lg text-white">Price: <span className="font-semibold text-pink-500">Rs {price}</span></p>
          <p className="text-lg text-white">Delivery Charge: <span className="font-semibold text-pink-500">Rs {deliveryCharge}</span></p>
          <p className="text-lg text-white">Total Price: <span className="font-semibold text-pink-500">Rs {totalPrice}</span></p>
          <p className="text-lg text-white">Product ID: <span className="font-semibold text-pink-500">{id}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <p className="text-lg text-white">Email: <span className="font-semibold text-pink-500">{userData.email}</span></p>
          <p className="text-lg text-white">Username: <span className="font-semibold text-pink-500">{userData.username}</span></p>
        </div>

        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 bg-transparent rounded-md w-full md:w-1/2 text-gray-200 mr-2 mb-4 md:mb-0"
          />
          <input
            type="text"
            name="Phone"
            placeholder="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 bg-transparent rounded-md w-full text-gray-200 md:w-1/2"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6"></div>
          ) : (
            'Place Order'
          )}
        </button>
      </form>

      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      {isModalOpen && (
        <div className="fixed p-2 inset-0 bg-black text-white flex justify-center items-center z-50">
        <div className="sm:p-8 p-4 rounded-lg shadow-lg w-full sm:w-1/3 text-center">
          <h2 className="text-xl font-bold mb-4">Order Confirmed!</h2>
          <p className="mb-4">Your order has been placed successfully. Thank you for shopping with us!</p>
          <button
            onClick={closeModal}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          >
            Close
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Checkout;

import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      setFormError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const response = await axios.post(`https://times-store-production.up.railway.app/api/feedbacks`, {
        data: {
          name,
          email,
          message,
        }
      });


      setFormSuccess('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Handle error
      setFormError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-black">
      <h1 className="text-3xl font-extrabold text-pink-500 mb-6">Contact Us</h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-6">Feel free to reach out to us if you have any questions or inquiries about our watches!</p>

        {/* Email Section */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Email:</span>
          <a href="mailto:aliabdullah10nov2006@gmail.com" className="text-pink-500 hover:underline">
            aliabdullah10nov2006@gmail.com
          </a>
        </div>

        {/* GitHub Section */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold text-gray-800">GitHub:</span>
          <a href="https://github.com/AliAbdullah0" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
            AliAbdullah0
          </a>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold text-gray-800">Phone:</span>
          <span className="text-gray-700">+92 319 705 5066</span>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold text-gray-800">Address:</span>
          <span className="text-gray-700">Islamabad,Pakistan</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>

        {formError && (
          <div className="text-red-500 text-center mb-4">
            <p>{formError}</p>
          </div>
        )}

        {formSuccess && (
          <div className="text-green-500 text-center mb-4">
            <p>{formSuccess}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

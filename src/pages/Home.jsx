import React, { useEffect, useState } from 'react';
import Feature from '../components/Feature';
import { HeroParallax } from '../components/ui/Hero-parrallax';
import { fetchProducts } from '../api';
import { TextGenerateEffect } from '../components/ui/Text-generate-effect';
import Userfeedbacks from '../components/Userfeedbacks';
import { SparklesPreview } from '../components/SparkeSection';
import { useProduct } from '../ProductContext';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection'

function Home() {
  const { products, setProducts } = useProduct();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const getProducts = async () => {
    if (products.length > 0) return;

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
    const jwt = localStorage.getItem('jwt');
    const hasRefreshed = localStorage.getItem('hasRefreshed'); // Check if the page has already been refreshed

    if (jwt && !hasRefreshed) {
      setIsVerified(true);
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <main className="dark:bg-black bg-white relative overflow-x-hidden">
      {error && (
        <TextGenerateEffect
          words={'Oops! Looks Like An Error! Try Refreshing Page!'}
          className={'text-center w-full text-red-400 font-light md:text-4xl text-xl'}
        />
      )}

      <HeroSection />
      <div className="w-full overflow-x-hidden flex items-center justify-center">
        <Feature />
      </div>
      <div className='w-full overflow-x-hidden flex flex-col gap-2 items-center justify-center mt-8 mb-6'>
        <div className='w-full'>
          <img src="https://www.watchesofswitzerland.com/medias/breitling-nfl-desktop-homepage.jpg?context=bWFzdGVyfGltYWdlc3wxMDA1MjgyfGltYWdlL2pwZWd8YURSbUwyZ3hZaTg1TWprMk1UVXpNVGd5TWpNNEwySnlaV2wwYkdsdVp5MXVabXd0WkdWemEzUnZjQzFvYjIxbGNHRm5aUzVxY0djfDE1MmExZGUwNzBkMmVjNDk4ZTc3OGUzZmQ4YmFjNmQ5ZWViNzNiOWE3NzQ0MDY5MTUxYWRjNjllMzVmYjFkYjk&imwidth=1920" alt="" className='w-full' />
        </div>
        <div className="w-full items-center justify-center text-center p-3">
          <h2 className="font-thin text-4xl text-pink-500">
            Timeless Elegance
          </h2>
          <p className="font-light text-pink-500">
            Discover the finest collection of watches crafted for every moment.
          </p>
          <Link to='product' className='text-light text-green-600 hover:translate-y-0.5 font-light hover:transition-all'>Browse Now</Link>
        </div>

      </div>
      <Userfeedbacks />
      <SparklesPreview />
    </main>
  );
}

export default Home;

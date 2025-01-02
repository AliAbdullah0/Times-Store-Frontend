import React, { useEffect, useState } from 'react';
import Feature from '../components/Feature';
import { HeroParallax } from '../components/ui/Hero-parrallax';
import { fetchProducts } from '../api';
import { TextGenerateEffect } from '../components/ui/Text-generate-effect';
import Userfeedbacks from '../components/Userfeedbacks';
import { SparklesPreview } from '../components/SparkeSection';
import { useProduct } from '../ProductContext';
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

      <HeroSection/>
      <div className="w-full overflow-x-hidden flex items-center justify-center">
        <Feature />
      </div>
      <Userfeedbacks />
      <SparklesPreview />
    </main>
  );
}

export default Home;

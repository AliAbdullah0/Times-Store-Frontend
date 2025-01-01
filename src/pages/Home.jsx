import React, { useEffect, useState } from 'react';
import Feature from '../components/Feature';
import Carousel from '../components/Carousel';
import { HeroParallax } from '../components/ui/Hero-parrallax';
import { fetchProducts } from '../api';
import { CanvasRevealEffectDemo3 } from '../components/CanvasRevealEffectDemo3';
import { TextGenerateEffect } from '../components/ui/Text-generate-effect';
import Userfeedbacks from '../components/Userfeedbacks';
import { SparklesPreview } from '../components/SparkeSection';
import { useProduct } from '../ProductContext';

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
    getProducts()
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsVerified(true);
      window.location.reload(); 
    }
  }, []);
  

  return (
    <main className="bg-black relative overflow-x-hidden">
      {loading && (
        <div className="flex w-full justify-center items-center mt-8">
          <h2 className="uppercase md:text-5xl text-xl text-gray-400 text-center font-bold animate-pulse">
            <TextGenerateEffect
              words={'Creating Mindblowing effects'}
              className={'uppercase md:text-5xl text-xl text-gray-400 text-center font-bold animate-pulse'}
            />
          </h2>
        </div>
      )}

      {error && (
        <TextGenerateEffect
          words={'Oops! Looks Like An Error! Try Refreshing Page!'}
          className={'text-center w-full text-red-400 font-light md:text-4xl text-xl'}
        />
      )}

      <HeroParallax products={products} />
      <div className="w-full overflow-x-hidden flex items-center justify-center">
        <Feature />
      </div>
      <Userfeedbacks />
      <SparklesPreview />
    </main>
  );
}

export default Home;

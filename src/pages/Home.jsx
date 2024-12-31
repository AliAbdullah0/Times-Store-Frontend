// Home Component
import React, { useEffect, useState } from 'react';
import Products from './Products';
import Feature from '../components/Feature';
import Carousel from '../components/Carousel';
import { HeroParallax } from '../components/ui/Hero-parrallax';
import { fetchProducts } from '../api';
import { CanvasRevealEffectDemo3 } from '../components/CanvasRevealEffectDemo3';

function Home() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data.data || []);
      setItems(response.data.data || []);
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []); 

  return (
    <main className="bg-black relative overflow-x-hidden">
      {loading &&(<div className="flex w-full justify-center items-center mt-8">
    <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
</div>)}
      {error && <p>{error}</p>}
      <HeroParallax products={items} />
        <CanvasRevealEffectDemo3/>
      <div className="w-full overflow-x-hidden flex items-center justify-center">
        <Feature />
      </div>
    </main>
  );
}

export default Home;


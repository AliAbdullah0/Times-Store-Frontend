import React, { useEffect, useState } from 'react'
import Products from './Products'
import Feature from '../components/Feature'
import Carousel from '../components/Carousel'
import { HeroParallax } from '../components/ui/Hero-parrallax'
import { fetchProducts } from '../api'

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const getProducts = async () => {
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
      getProducts();
    }, []);
  return (
    <main class="dark:bg-gray-800 bg-white  relative overflow-x-h">
    <HeroParallax products={products}/>
<div className='w-full flex items-center justify-center overflow-hidden'>
<Carousel/>
</div>
<div className='w-full overflow-x-hidden flex items-center justify-center'>
<Feature/>
</div>

</main>
  )
}

export default Home

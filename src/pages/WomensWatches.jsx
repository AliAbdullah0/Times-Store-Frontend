import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchWomenWatches } from '../api';
import Error from '../pages/Error';
import ProductsNotFound from '../components/ProductsNotFound';
import { MultiStepLoader } from '../components/ui/MultiStepLoader';
import { useWomenProducts } from '../WomensWatchesContext';

function Products() {
  const { womensWatches, setWomensWatches } = useWomenProducts();  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchWomenWatches();
      setWomensWatches(response.data.data || []); 
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderLoading = () => (
    <MultiStepLoader
      loading={true}
      loadingStates={[
        { text: "Initializing" },
        { text: "Loading Assets" },
        { text: "Almost There" },
        { text: "Done!" },
      ]}
      duration={1500}
      loop={false}
    />
  );

  const renderError = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Error />
    </div>
  );

  const renderNoProducts = () => (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <ProductsNotFound />
    </div>
  );

  const renderProducts = () =>
    womensWatches.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <div className="w-full bg-grid-small-white/[0.2] flex flex-col md:flex-row p-2 items-center md:items-start h-fit bg-black gap-2 flex-wrap">
      {loading
        ? <MultiStepLoader
          loading={true}
          loadingStates={[
            { text: "Browsing Timeless Designs" },
            { text: "Assembling Precision Pieces" },
            { text: "Polishing for Perfection" },
            { text: "Your Timepiece Awaits!" },
          ]}
          duration={500}
          loop={true}
        />
        : error
          ? renderError()
          : womensWatches.length > 0
            ? renderProducts()
            : renderNoProducts()}
    </div>
  );
}

export default Products;

// ProductContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

// Hook to access products
export const useProduct = () => {
  return useContext(ProductContext);
};

// Context Provider to wrap your app
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

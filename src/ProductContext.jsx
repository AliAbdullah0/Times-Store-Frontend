
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();


export const useProduct = () => {
  return useContext(ProductContext);
};


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Ensure this part exists in WomensWatches.jsx
import { createContext, useContext, useState } from "react";

const WomensWatchesContext = createContext();

export const useWomenProducts = () => {
  return useContext(WomensWatchesContext);
};

export const WomensContextProvider = ({ children }) => {
  const [womensWatches, setWomensWatches] = useState([]);

  return (
    <WomensWatchesContext.Provider value={{ womensWatches, setWomensWatches }}>
      {children}
    </WomensWatchesContext.Provider>
  );
};

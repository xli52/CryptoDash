import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState({});
  const [currency, setCurrency] = useState('usd');

  return (
    <DataContext.Provider value={{ data, setData, currency, setCurrency }} >
      {children}
    </DataContext.Provider>
  )
};

export function useData() {
  return useContext(DataContext);
};
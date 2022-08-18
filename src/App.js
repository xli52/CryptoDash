import React from "react";
import Nav from "./components/Nav";
import PriceTable from "./components/PriceTable";
// import DataProvider from "./contexts/DataContext";

function App() {
  return (
    // <DataProvider>
    <>
      <Nav />
      <PriceTable />
    </>
    // </DataProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";
import './PriceTable.scss';

export default function PriceTable() {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { data, currency } = useData();
  const [table, setTable] = useState([]);

  useEffect(() => {
    let prevPrice = data.prices[0][1];

    const table = data.prices.map((price, index) => {
      if (index !== 0) {
        // Calculate price change and change rate
        const currPrice = price[1];
        const dailyChange = currPrice - prevPrice;
        const dailyChangeRate = (dailyChange / prevPrice * 100).toFixed(2);
        prevPrice = currPrice;

        // Get date of price
        const date = new Date(price[0]);

        return (
          <tr className="table-row">
            <td className="table-data">{date.toDateString().split(' ').slice(1).join(' ')}</td>
            <td className="table-data">{days[date.getDay()]}</td>
            <td className="table-data">{`$${currPrice.toFixed(2)}`}</td>
            <td className={`table-data table-data--${dailyChange >= 0 ? 'increase' : 'decrease'}`}>{`$${dailyChange.toFixed(6)}`}</td>
            <td className={`table-data table-data--${dailyChange >= 0 ? 'increase' : 'decrease'}`}>{`${dailyChangeRate}%`}</td>
          </tr>
        );
      }
    });

    setTable(table.reverse());

  }, [data, currency]);

  return (
    <main className="main-content">
      <div className="data-container">
        <h1 className="table-title">
          <img src={data.thumb} alt={data.name} className="coin-thumb" />
          {`${data.name} (${data.symbol})`}
        </h1>
        <h2>{`7-day Price History (${data.symbol}/${currency.toUpperCase()})`}</h2>
        <table className="price-table">
          <thead>
            <tr className="table-header">
              <th scope="col" className="table-head">Date</th>
              <th scope="col" className="table-head">Day of week</th>
              <th scope="col" className="table-head">Price</th>
              <th scope="col" className="table-head">24hr Changes</th>
              <th scope="col" className="table-head">Changes %</th>
            </tr>
          </thead>
          <tbody className="price-table-body">
            {table}
          </tbody>
        </table>
      </div>
    </main>
  );
}
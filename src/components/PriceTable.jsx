import React, { useEffect, useState } from "react";
import "./PriceTable.scss";
import { useSelector } from "react-redux";
import { changeCurrency, fetchPrices } from "../redux/actions";
import { connect } from "react-redux";

function PriceTable({ fetchPrices, changeCurrency }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [table, setTable] = useState([]);

  const currency = useSelector((state) => state.currency);
  const coinData = useSelector((state) => state.coinData);

  function handleChange(e) {
    const newCurrency = e.target.value;
    changeCurrency(newCurrency);

    if (coinData.prices.length > 0) {
      fetchPrices(coinData, newCurrency);
    }
  }

  useEffect(() => {
    if (coinData.prices.length > 0) {
      let prevPrice = coinData.prices[0][1];

      const table = coinData.prices.map((price, index) => {
        if (index !== 0) {
          // Calculate price change and change rate
          const currPrice = price[1];
          const dailyChange = currPrice - prevPrice;
          const dailyChangeRate = ((dailyChange / prevPrice) * 100).toFixed(2);
          prevPrice = currPrice;

          // Get date of price
          const date = new Date(price[0]);

          return (
            <tr
              key={index}
              className={`table-row${
                index % 2 === 1 ? " table-row--dark" : ""
              }`}
            >
              <td className="table-data">
                {date.toDateString().split(" ").slice(1).join(" ")}
              </td>
              <td className="table-data">{days[date.getDay()]}</td>
              <td className="table-data">{`$${currPrice.toFixed(2)}`}</td>
              <td
                className={`table-data table-data--${
                  dailyChange >= 0 ? "increase" : "decrease"
                }`}
              >{`$${dailyChange.toFixed(6)}`}</td>
              <td
                className={`table-data table-data--${
                  dailyChange >= 0 ? "increase" : "decrease"
                }`}
              >{`${dailyChangeRate}%`}</td>
            </tr>
          );
        }
      });

      setTable(table.reverse());
    }

    if (coinData.prices.length === 0) {
      setTable([
        <tr key={0} className={"table-row table-row--dark"}>
          <td className="table-data">{"-"}</td>
          <td className="table-data">{"-"}</td>
          <td className="table-data">{"-"}</td>
          <td className="table-data">{"-"}</td>
          <td className="table-data">{"-"}</td>
        </tr>,
      ]);
    }
  }, [coinData]);

  return (
    <main className="main-content">
      <div className="data-container">
        {coinData.prices.length > 0 && (
          <h1 className="coin-title">
            <img
              src={coinData.thumb}
              alt={coinData.name}
              className="coin-thumb"
            />
            {`${coinData.name} (${coinData.symbol})`}
          </h1>
        )}
        <div className="table-topbar">
          <h2 className="table-title">
            {`7-day Price History${
              coinData.prices.length > 0
                ? ` (${coinData.symbol}/${currency.toUpperCase()})`
                : ""
            } `}
          </h2>
          <select className="currency-seletor" onChange={handleChange}>
            <option value="usd">USD</option>
            <option value="cad">CAD</option>
          </select>
        </div>
        <table className="price-table">
          <thead>
            <tr className="table-header">
              <th scope="col" className="table-head">
                Date
              </th>
              <th scope="col" className="table-head">
                Day of week
              </th>
              <th scope="col" className="table-head">
                Price
              </th>
              <th scope="col" className="table-head">
                24hr Changes
              </th>
              <th scope="col" className="table-head">
                Changes %
              </th>
            </tr>
          </thead>
          <tbody className="price-table-body">{table}</tbody>
        </table>
      </div>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrices: (coin, currency) => dispatch(fetchPrices(coin, currency)),
    changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  };
};

export default connect(null, mapDispatchToProps)(PriceTable);

import React, { useEffect, useState } from "react";
import "./PriceTable.scss";
import { changeCurrency, fetchPrices } from "../redux/actions";
import { getPriceTable } from "../helpers/priceHelper";
import { connect } from "react-redux";

function PriceTable({
  fetchPrices,
  changeCurrency,
  coin,
  priceData,
  currency,
}) {
  const [table, setTable] = useState([]);

  function handleChange(e) {
    const newCurrency = e.target.value;
    changeCurrency(newCurrency);
    if (priceData.length > 0) {
      fetchPrices(coin, newCurrency);
    }
  }

  useEffect(() => {
    if (priceData.length > 0) {
      const priceTable = getPriceTable(priceData);

      const table = priceTable.map(
        ({ price, dailyChange, dailyChangeRate, date, day, time }, index) => {
          return (
            <tr
              key={index}
              className={`table-row${
                index % 2 === 1 ? " table-row--dark" : ""
              }`}
            >
              <td className="table-data">{date}</td>
              <td className="table-data">{time}</td>
              <td className="table-data">{day}</td>
              <td className="table-data">{`$${price.toFixed(2)}`}</td>
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
      );

      setTable(table);
    }
  }, [priceData]);

  return (
    <main className="main-content">
      <div className="data-container">
        {priceData.length > 0 && (
          <h1 className="coin-title">
            <img src={coin.thumb} alt={coin.name} className="coin-thumb" />
            {`${coin.name} (${coin.symbol})`}
          </h1>
        )}
        <div className="table-topbar">
          <h2 className="table-title">
            {`7-day Price History${
              priceData.length > 0
                ? ` (${coin.symbol}/${currency.toUpperCase()})`
                : ""
            } `}
          </h2>
          <select className="currency-seletor" onChange={handleChange}>
            <option value="usd">USD</option>
            <option value="cad">CAD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <table className="price-table">
          <thead>
            <tr className="table-header">
              <th scope="col" className="table-head">
                Date
              </th>
              <th scope="col" className="table-head">
                Time
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
          <tbody className="price-table-body">
            {priceData.length > 0 ? (
              table
            ) : (
              <tr key={0} className={"table-row table-row--dark"}>
                <td className="table-data">{"-"}</td>
                <td className="table-data">{"-"}</td>
                <td className="table-data">{"-"}</td>
                <td className="table-data">{"-"}</td>
                <td className="table-data">{"-"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    coin: state.coin,
    priceData: state.priceData,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrices: (coin, currency) => dispatch(fetchPrices(coin, currency)),
    changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceTable);

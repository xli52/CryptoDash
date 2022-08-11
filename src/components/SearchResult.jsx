import axios from "axios";
import React, { useState } from "react";
import './SearchResult.scss';

export default function SearchResult({ id, name, symbol, thumb, rank }) {

  const [data, setData] = useState({});

  function handleClick() {
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=6&interval=daily`
    })
    .then(res => {
      for (const price of res.data.prices.reverse()) {
        let date = new Date(price[0]);
        console.log(date.toDateString(), `$ ${price[1]}` )
      }
      setData({
        id: id,
        name: name,
        symbol: symbol,
        thumb: thumb,
        prices: res.data.prices.reverse()
      });
    })
    .catch(e => {
      console.error(e);
    })
  }

  return (
    <div className="result-container" onClick={handleClick}>
      <div className="coin-info">
        <img className="coin-thumb" src={thumb}></img>
        <div className="coin-name">{`${name} (${symbol})`}</div>
      </div>
      <div className="coin-ranking">{`#${rank}`}</div>
    </div>
  );
}
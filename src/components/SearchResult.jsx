import axios from "axios";
import React, { useState } from "react";
import './SearchResult.scss';
import classNames from "classnames";

export default function SearchResult({ coin, show, loading, empty }) {

  const resultClass = classNames(
    'search-result',
    { 'result--show': show },
    { 'result--empty': empty },
    { 'result--loading': loading }
  );

  const [data, setData] = useState({});

  function handleClick() {
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=6&interval=daily`
    })
      .then(res => {
        for (const price of res.data.prices.reverse()) {
          let date = new Date(price[0]);
          console.log(date.toDateString(), `$ ${price[1]}`)
        }
        setData({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          thumb: coin.thumb,
          prices: res.data.prices.reverse()
        });
      })
      .catch(e => {
        console.error(e);
      })
  }

  return (
    <div className={resultClass} onClick={show && handleClick} >
      {show &&
        <>
          <div className="coin-info">
            <img className="coin-thumb" src={coin.thumb}></img>
            <div className="coin-name">{`${coin.name} (${coin.symbol})`}</div>
          </div>
          <div className="coin-ranking">{`#${coin.market_cap_rank}`}</div>
        </>
      }
      {empty &&
        <div className="no-results">No Results Found</div>
      }
      {loading &&
        <div className="loading-results"></div>
      }

    </div>
  );
}
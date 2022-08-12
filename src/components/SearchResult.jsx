import axios from "axios";
import React from "react";
import './SearchResult.scss';
import classNames from "classnames";
import { useData } from "../contexts/DataContext";

export default function SearchResult({ coin, setList, show, loading, empty }) {

  const resultClass = classNames(
    'search-result',
    { 'result--show': show },
    { 'result--empty': empty },
    { 'result--loading': loading }
  );

  const { setData, currency } = useData();

  function handleClick() {
    setList([]);
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=7&interval=daily`
    })
      .then(res => {
        setData({
          // rank: coin.market_cap_rank,
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
            <img className="coin-thumb" src={coin.thumb} alt={coin.name}></img>
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
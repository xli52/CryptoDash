import React from "react";
import './SearchResult.scss';

export default function SearchResult({ name, symbol, thumb, rank }) {

  return (
    <div className="result-container">
      <div className="coin-info">
        <img className="coin-thumb" src={thumb}></img>
        <div className="coin-name">{`${name} (${symbol})`}</div>
      </div>
      <div className="coin-ranking">{`#${rank}`}</div>
    </div>
  );
}
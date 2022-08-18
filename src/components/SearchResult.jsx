import "./SearchResult.scss";
import React from "react";
import classNames from "classnames";
import { fetchPrices, changeCoin } from "../redux/actions";
import { connect } from "react-redux";

function SearchResult({
  coin,
  setShowList,
  show,
  loading,
  empty,
  fetchPrices,
  changeCoin,
  currency,
}) {
  const resultClass = classNames(
    "search-result",
    { "result--show": show },
    { "result--empty": empty },
    { "result--loading": loading }
  );

  function handleClick() {
    changeCoin(coin);
    fetchPrices(coin, currency);
    setShowList(false);
  }

  return (
    <div className={resultClass} onMouseDown={show && handleClick}>
      {show && (
        <>
          <div className="coin-info">
            <img className="coin-thumb" src={coin.thumb} alt={coin.name}></img>
            <div className="coin-name">{`${coin.name} (${coin.symbol})`}</div>
          </div>
          <div className="coin-ranking">{`#${coin.market_cap_rank}`}</div>
        </>
      )}
      {empty && <div className="no-results">No Results Found</div>}
      {loading && <div className="loading-results"></div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrices: (coin, currency) => dispatch(fetchPrices(coin, currency)),
    changeCoin: (coin) => dispatch(changeCoin(coin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

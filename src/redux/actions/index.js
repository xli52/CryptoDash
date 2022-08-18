import axios from "axios";

export const changeCurrency = (currency) => {
  return {
    type: 'CHANGE_CURRENCY',
    payload: currency
  }
}

export const changeCoin = (coin) => {
  return {
    type: 'CHANGE_COIN',
    payload: coin
  }
}

export const fetchPrices = (coin, currency) => {

  return function (dispatch) {
    axios({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=7&interval=daily`,
    })
      .then((res) => {
        const priceData = res.data.prices.reverse();

        dispatch({
          type: "UPDATE_DATA",
          payload: priceData
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
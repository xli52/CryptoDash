import axios from "axios";
import { getPriceTable } from "../../helpers/priceHelper";

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

const updatePriceData = (priceData) => {
  return {
    type: "UPDATE_PRICE_DATA",
    payload: priceData
  }
}

export const fetchPrices = (coin, currency) => {

  return function (dispatch) {
    axios({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=8&interval=daily`
    })
      .then((res) => {
        const priceData = res.data.prices;
        dispatch(updatePriceData(priceData));
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

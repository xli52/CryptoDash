import { combineReducers } from "redux";
import priceDataReducer from "./priceData";
import currencyReducer from "./currency";
import coinReducer from "./coin";

const rootReducer = combineReducers({
  coin: coinReducer,
  priceData: priceDataReducer,
  currency: currencyReducer
});

export default rootReducer;
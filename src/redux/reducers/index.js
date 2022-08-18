import { combineReducers } from "redux";
import coinDataReducer from "./coinData";
import currencyReducer from "./currency";

const rootReducer = combineReducers({ coinData: coinDataReducer, currency: currencyReducer });

export default rootReducer;
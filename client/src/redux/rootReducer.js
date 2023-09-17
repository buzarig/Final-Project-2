import { combineReducers } from "redux";
import productsReducer from "./reducers/productsReducer";

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;

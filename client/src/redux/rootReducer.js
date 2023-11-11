import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";
import merchandiseReducer from "./reducers/merchandise";
import cartReducer from "./reducers/cartReducer";

import addressReducer from "./reducers/addressReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer,
  merchandiseReducer,
  cart: cartReducer,
  shippingInfo: addressReducer
});

export default rootReducer;

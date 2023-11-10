import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";
import cartReducer from "./reducers/cartReducer";
import merchandiseReducer from "./reducers/merchandise";
import customerReducer from "./reducers/customer";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer,
  merchandiseReducer,
  customerReducer,
  cart: cartReducer
});

export default rootReducer;

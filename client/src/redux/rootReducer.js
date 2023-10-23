import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";
import merchandiseReducer from "./reducers/merchandise";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer,
  merchandiseReducer,
  cartReducer:cartReducer,
});

export default rootReducer;

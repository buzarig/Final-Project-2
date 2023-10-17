import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";
import { merchandiseReducer as merchandise } from "./reducers/merchandise";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer,
  merchandise: merchandise
});

export default rootReducer;

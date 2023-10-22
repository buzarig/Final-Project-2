import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";
import merchandiseReducer from "./reducers/merchandise";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer,
  merchandiseReducer
});

export default rootReducer;

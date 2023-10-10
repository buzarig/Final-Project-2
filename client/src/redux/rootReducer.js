import { combineReducers } from "redux";

import tokenReducer from "./reducers/tokenReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  search: searchReducer
});

export default rootReducer;

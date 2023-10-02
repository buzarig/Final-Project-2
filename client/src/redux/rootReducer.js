import { combineReducers } from "redux";
import tokenReducer from "./token/reducers";

const rootReducer = combineReducers({
  token: tokenReducer
});

export default rootReducer;

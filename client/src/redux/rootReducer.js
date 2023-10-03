import { combineReducers } from "redux";
import tokenReducer from "./reducers/tokenReducer";

const rootReducer = combineReducers({
  token: tokenReducer
});

export default rootReducer;

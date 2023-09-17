import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";

import { composeEnhancers, middleware } from "./middleware";

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

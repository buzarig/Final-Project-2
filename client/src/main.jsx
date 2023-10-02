import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/style.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);

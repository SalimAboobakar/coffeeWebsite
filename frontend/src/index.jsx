import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // your custom brown theming

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

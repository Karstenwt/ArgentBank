import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import { Provider } from "react-redux";
import store from "./store";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      
      <AppRouter />
    </Provider>
  </React.StrictMode>
);


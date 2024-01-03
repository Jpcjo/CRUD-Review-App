import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "../src/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={500}
      hideProgressBar={true}
      closeOnClick
      theme="light"
    />
  </Provider>
  // </React.StrictMode>,
);

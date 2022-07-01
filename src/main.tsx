import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Navigation } from "./routes/Navigation";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <Navigation /> */}
  </React.StrictMode>
);

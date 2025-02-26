import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProcessorPage from "./components/ProcessorPage.jsx";
import BuyerPage from "./components/BuyerPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/processor" element={<ProcessorPage />} />
        <Route path="/buyer" element={<BuyerPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

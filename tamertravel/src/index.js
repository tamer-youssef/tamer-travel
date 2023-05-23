import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage"
import Admin from "./pages/Admin"
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles.css";
import AppRoutes from "./routes.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppRoutes />);

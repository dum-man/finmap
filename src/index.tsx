import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AppProviders from "./app/providers/AppProviders";
import "./app/i18n";
import "./assets/styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppProviders>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Toaster />
  </AppProviders>
);

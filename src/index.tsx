import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AppProviders from "./app/AppProviders";
import "./i18next";
import "./assets/sass/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppProviders>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Toaster />
  </AppProviders>
);

// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const PUBLISHABLE_KEY =
  "pk_test_dXB3YXJkLWxpemFyZC0xNy5jbGVyay5hY2NvdW50cy5kZXYk"; // Replace with your Clerk key

const root = createRoot(document.getElementById("root")); // Create root
root.render(
  <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </Provider>
);

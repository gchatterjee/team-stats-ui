import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./root"; // Assuming your root.tsx exports the <App /> component

// GitHub Pages SPA redirect fix
if (typeof window !== "undefined") {
  const search = window.location.search;
  if (search.startsWith("?/")) {
    const newPath = search.slice(2) + window.location.hash;

    window.history.replaceState(
      null,
      "",
      window.location.pathname.replace(/\/$/, "") + newPath,
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/team-stats-ui">
    <App />
  </BrowserRouter>,
);

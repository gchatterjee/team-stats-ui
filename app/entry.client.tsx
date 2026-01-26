import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes"; // your route config with loaders

// GitHub Pages SPA redirect
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

// Create the data router
const router = createBrowserRouter(routes, { basename: "/team-stats-ui" });

const container = document.getElementById("root");
if (!container) throw new Error("Could not find #root element");
createRoot(container).render(<RouterProvider router={router} />);

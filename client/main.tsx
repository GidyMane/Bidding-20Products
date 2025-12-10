import "./global.css";

import { createRoot } from "react-dom/client";
import { App } from "./App";

console.log("main.tsx loaded");

const root = document.getElementById("root");

console.log("root element:", root);

if (!root) {
  throw new Error("Root element not found");
}

try {
  console.log("Creating root...");
  const reactRoot = createRoot(root);
  console.log("Rendering app...");
  reactRoot.render(<App />);
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering app:", error);
  root.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;">
    <h1>Error rendering app</h1>
    <pre>${error instanceof Error ? error.message + "\n" + error.stack : String(error)}</pre>
  </div>`;
}

import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetNewest,
  handleGetEndingSoon,
  handleSearch,
  handleGetById,
  handleGetStartingSoon,
} from "./routes/products";
import {
  handleGetAll as handleGetAllCategories,
  handleGetRoot,
  handleGetBySlug,
} from "./routes/categories";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Products routes
  app.get("/api/products/newest", handleGetNewest);
  app.get("/api/products/ending-soon", handleGetEndingSoon);
  app.get("/api/products/starting-soon", handleGetStartingSoon);
  app.get("/api/products/search", handleSearch);
  app.get("/api/products/:id", handleGetById);

  // Categories routes
  app.get("/api/categories", handleGetAllCategories);
  app.get("/api/categories/root", handleGetRoot);
  app.get("/api/categories/slug/:slug", handleGetBySlug);

  return app;
}

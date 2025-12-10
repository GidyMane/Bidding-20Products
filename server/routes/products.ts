import { RequestHandler } from "express";
import { mockProducts } from "@shared/mock-products";

export const handleGetNewest: RequestHandler = (req, res) => {
  const limit = parseInt(req.query.limit as string) || 12;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const products = [...mockProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(offset, offset + limit);

  res.json({
    products,
    total: mockProducts.length,
    page,
    limit,
  });
};

export const handleGetEndingSoon: RequestHandler = (req, res) => {
  const limit = parseInt(req.query.limit as string) || 12;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const now = new Date().getTime();
  const products = [...mockProducts]
    .filter((p) => new Date(p.endDate).getTime() > now)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(offset, offset + limit);

  res.json({
    products,
    total: mockProducts.filter((p) => new Date(p.endDate).getTime() > now).length,
    page,
    limit,
  });
};

export const handleSearch: RequestHandler = (req, res) => {
  const limit = parseInt(req.query.limit as string) || 12;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;
  const query = (req.query.query as string)?.toLowerCase() || "";
  const categoryId = req.query.categoryId as string;
  const condition = req.query.condition as string;
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : null;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : null;
  const sortBy = req.query.sortBy as string;

  let products = [...mockProducts];

  // Apply filters
  if (query) {
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }

  if (categoryId) {
    products = products.filter((p) => p.categoryId === categoryId);
  }

  if (condition) {
    products = products.filter((p) => p.condition === condition);
  }

  if (minPrice !== null) {
    products = products.filter((p) => p.startingPrice >= minPrice);
  }

  if (maxPrice !== null) {
    products = products.filter((p) => p.startingPrice <= maxPrice);
  }

  // Apply sorting
  if (sortBy === "newest") {
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "ending-soon") {
    products.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
  } else if (sortBy === "lowest-price") {
    products.sort((a, b) => a.startingPrice - b.startingPrice);
  } else if (sortBy === "highest-bid") {
    products.sort((a, b) => (b.currentBid || 0) - (a.currentBid || 0));
  }

  const total = products.length;
  const paginatedProducts = products.slice(offset, offset + limit);

  res.json({
    products: paginatedProducts,
    total,
    page,
    limit,
  });
};

export const handleGetById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};

export const handleGetStartingSoon: RequestHandler = (req, res) => {
  const limit = parseInt(req.query.limit as string) || 12;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const now = new Date().getTime();
  const products = [...mockProducts]
    .filter((p) => new Date(p.startDate).getTime() > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(offset, offset + limit);

  res.json({
    products,
    total: mockProducts.filter((p) => new Date(p.startDate).getTime() > now).length,
    page,
    limit,
  });
};

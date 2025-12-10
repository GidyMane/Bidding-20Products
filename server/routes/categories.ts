import { RequestHandler } from "express";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parent?: string;
}

const categories: Category[] = [
  { id: "electronics", name: "Electronics", slug: "electronics" },
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    parent: "electronics",
  },
  { id: "laptops", name: "Laptops", slug: "laptops", parent: "electronics" },
  { id: "tablets", name: "Tablets", slug: "tablets", parent: "electronics" },
  {
    id: "smartwatches",
    name: "Smart Watches",
    slug: "smartwatches",
    parent: "electronics",
  },
  {
    id: "audio",
    name: "Audio & Headphones",
    slug: "audio",
    parent: "electronics",
  },
  { id: "gaming", name: "Gaming", slug: "gaming" },
  { id: "cameras", name: "Cameras", slug: "cameras", parent: "electronics" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
];

export const handleGetAll: RequestHandler = (_req, res) => {
  res.json(categories);
};

export const handleGetRoot: RequestHandler = (_req, res) => {
  const rootCategories = categories.filter((c) => !c.parent);
  res.json(rootCategories);
};

export const handleGetBySlug: RequestHandler = (req, res) => {
  const { slug } = req.params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  const subcategories = categories.filter((c) => c.parent === category.id);

  res.json({
    ...category,
    subcategories,
  });
};

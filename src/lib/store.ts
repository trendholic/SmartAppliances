import fs from "node:fs";
import path from "node:path";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string;
  tagline: string;
  description: string;
  price: number;
  energyRating: "A+++" | "A++" | "A+";
  finish: string[];
  features: string[];
  specs: Record<string, string>;
  accent: string;
  image: string;
};

type StoreData = {
  categories: Category[];
  products: Product[];
};

const DATA_FILE = path.join(process.cwd(), "data", "store.json");

function readStore(): StoreData {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as StoreData;
}

function writeStore(data: StoreData) {
  const tmpFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2));
  fs.renameSync(tmpFile, DATA_FILE);
}

export function getCategories(): Category[] {
  return readStore().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return readStore().categories.find((c) => c.slug === slug);
}

export function createCategory(category: Category): Category {
  const data = readStore();
  if (data.categories.some((c) => c.slug === category.slug)) {
    throw new Error(`Category with slug "${category.slug}" already exists`);
  }
  data.categories.push(category);
  writeStore(data);
  return category;
}

export function updateCategory(slug: string, updates: Partial<Category>): Category {
  const data = readStore();
  const idx = data.categories.findIndex((c) => c.slug === slug);
  if (idx === -1) throw new Error(`Category "${slug}" not found`);
  data.categories[idx] = { ...data.categories[idx], ...updates, slug };
  writeStore(data);
  return data.categories[idx];
}

export function deleteCategory(slug: string) {
  const data = readStore();
  data.categories = data.categories.filter((c) => c.slug !== slug);
  data.products = data.products.filter((p) => p.categorySlug !== slug);
  writeStore(data);
}

export function getProducts(): Product[] {
  return readStore().products;
}

export function getProductsByCategory(slug: string): Product[] {
  return readStore().products.filter((p) => p.categorySlug === slug);
}

export function getProductById(id: string): Product | undefined {
  return readStore().products.find((p) => p.id === id);
}

export function createProduct(product: Product): Product {
  const data = readStore();
  if (data.products.some((p) => p.id === product.id)) {
    throw new Error(`Product with id "${product.id}" already exists`);
  }
  data.products.push(product);
  writeStore(data);
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product {
  const data = readStore();
  const idx = data.products.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Product "${id}" not found`);
  data.products[idx] = { ...data.products[idx], ...updates, id };
  writeStore(data);
  return data.products[idx];
}

export function deleteProduct(id: string) {
  const data = readStore();
  data.products = data.products.filter((p) => p.id !== id);
  writeStore(data);
}

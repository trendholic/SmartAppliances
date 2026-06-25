"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Category, Product } from "@/lib/store";
import ProductCard from "./ProductCard";

export default function ProductShowcase({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.categorySlug === active)),
    [active, products]
  );

  return (
    <section id="products" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Catalogue
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The full Atlanteos lineup
            </h2>
          </div>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2">
          {[{ slug: "all", name: "All Products" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                active === c.slug
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

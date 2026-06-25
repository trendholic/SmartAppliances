"use client";

import { motion } from "framer-motion";
import {
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Wine,
  Box,
  ArrowUpRight,
} from "lucide-react";
import { categories } from "@/data/products";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  snowflake: Snowflake,
  flame: Flame,
  oven: Box,
  wind: Wind,
  droplets: Droplets,
  wine: Wine,
};

export default function CategoryGrid() {
  return (
    <section id="categories" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            Collections
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Six systems. One intelligent kitchen.
          </h2>
          <p className="mt-4 text-muted">
            Every Atlanteos collection is engineered to communicate with the
            others — a connected ecosystem rather than a row of separate
            machines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = icons[cat.icon] ?? Box;
            return (
              <motion.a
                key={cat.slug}
                href={`#products`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-80" />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <h3 className="relative mt-6 text-lg font-semibold">{cat.name}</h3>
                <p className="relative mt-1 text-sm font-medium text-accent">
                  {cat.tagline}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

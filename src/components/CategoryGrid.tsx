"use client";

import Image from "next/image";
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-black/50 text-accent backdrop-blur">
                    <Icon size={18} />
                  </span>
                </div>
                <div className="relative p-7 pt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                    <ArrowUpRight
                      size={18}
                      className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {cat.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {cat.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

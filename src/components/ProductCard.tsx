"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* Visual */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${product.accent}22, transparent 60%), linear-gradient(160deg, #11161c, #0a0d11)`,
        }}
      >
        <motion.div
          animate={{ rotateY: [0, 12, 0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-16 rounded-lg border"
          style={{
            borderColor: `${product.accent}55`,
            background: "linear-gradient(160deg, #1b222b, #0d1116)",
            boxShadow: `0 0 40px ${product.accent}33`,
          }}
        >
          <div
            className="mx-auto mt-4 h-8 w-10 rounded-sm"
            style={{ background: product.accent, opacity: 0.85, boxShadow: `0 0 18px ${product.accent}` }}
          />
        </motion.div>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/90">
          <Zap size={11} className="text-accent" />
          {product.energyRating}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm font-medium" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-foreground/80 transition-colors hover:text-accent"
        >
          {open ? "Hide specifications" : "View specifications"}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted">
                {Object.entries(product.specs).map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-3">
                    <span>{k}</span>
                    <span className="text-right text-foreground/80">{v}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: product.accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="text-lg font-semibold">
            ${product.price.toLocaleString()}
          </span>
          <button className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20">
            Configure
          </button>
        </div>
      </div>
    </motion.div>
  );
}

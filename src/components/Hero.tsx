"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden noise-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(63,208,201,0.14),transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent">
            <Sparkles size={14} /> 2026 Smart Kitchen Collection
          </span>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Kitchen appliances that{" "}
            <span className="text-gradient">think ahead.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Atlanteos fuses precision engineering with on-device intelligence —
            refrigeration, cooking, and cleaning systems that sense, learn, and
            respond before you do.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#04201d] transition-transform hover:scale-[1.03]"
            >
              Explore the Catalogue
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
            >
              How it works
            </a>
          </div>

          <div className="mt-14 flex gap-10 border-t border-border pt-8">
            {[
              ["6", "Product collections"],
              ["A+++", "Top energy ratings"],
              ["24/7", "Predictive diagnostics"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="text-2xl font-semibold text-foreground">{stat}</div>
                <div className="mt-1 text-xs text-muted">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px]"
        >
          <Scene3D />
        </motion.div>
      </div>

      <motion.a
        href="#categories"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}

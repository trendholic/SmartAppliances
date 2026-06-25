"use client";

import { motion } from "framer-motion";
import { Brain, Leaf, ShieldCheck, Smartphone } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "On-device intelligence",
    description:
      "Every unit runs local sensor models — no cloud round-trip needed to detect a boil-over or a near-empty fridge shelf.",
  },
  {
    icon: Smartphone,
    title: "One app, every appliance",
    description:
      "Matter and Wi-Fi 6 native. Control, monitor, and update your entire kitchen from a single Atlanteos app, or your voice assistant of choice.",
  },
  {
    icon: Leaf,
    title: "Engineered for efficiency",
    description:
      "Most collections carry an A++ or A+++ energy rating, with adaptive sensing that cuts real-world water and power use further still.",
  },
  {
    icon: ShieldCheck,
    title: "Predictive maintenance",
    description:
      "Components are monitored continuously; you're notified about a filter or seal before it ever becomes a service call.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(63,208,201,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            Intelligence
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            The technology behind every door, dial, and drawer.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <f.icon size={20} />
              </span>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

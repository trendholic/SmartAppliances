"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(63,208,201,0.16),transparent_60%)]" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
            Design your kitchen with Atlanteos.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">
            Book a private showroom visit or speak with a design consultant
            about pairing collections, panel finishes, and smart-home
            integration for your space.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent/50"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#04201d] transition-transform hover:scale-[1.03]"
            >
              Request a Consultation
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

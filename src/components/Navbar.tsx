"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#categories", label: "Collections" },
  { href: "#products", label: "Catalogue" },
  { href: "#features", label: "Intelligence" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-accent/40">
            <span className="absolute inset-0 rounded-full bg-accent/15 animate-pulse-glow" />
            <span className="relative text-sm font-semibold tracking-tight text-accent">A</span>
          </span>
          <span className="text-lg font-semibold tracking-[0.18em] text-foreground">
            ATLANTEOS
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 md:inline-block"
        >
          Book a Showroom Visit
        </a>

        <button
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="glass flex flex-col gap-4 px-6 pb-6 md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

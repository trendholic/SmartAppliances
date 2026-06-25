"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Package, Tags, ExternalLink } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-6 py-5">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-accent/40">
          <span className="absolute inset-0 rounded-full bg-accent/15" />
          <span className="relative text-sm font-semibold tracking-tight text-accent">A</span>
        </span>
        <span className="text-sm font-semibold tracking-[0.18em]">ADMIN</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ExternalLink size={16} />
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}

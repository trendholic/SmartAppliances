import Link from "next/link";
import { Package, Tags, ArrowUpRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage everything in the Atlanteos catalogue — products, categories, pricing, and imagery.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/products"
          className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Package size={20} />
            </span>
            <div>
              <p className="text-2xl font-semibold">{products.length}</p>
              <p className="text-sm text-muted">Products</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>

        <Link
          href="/admin/categories"
          className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Tags size={20} />
            </span>
            <div>
              <p className="text-2xl font-semibold">{categories.length}</p>
              <p className="text-sm text-muted">Categories</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Quick actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
          >
            + Add product
          </Link>
          <Link
            href="/admin/categories/new"
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition-colors hover:text-foreground"
          >
            + Add category
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { getCategories, getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getProducts();
  const categories = getCategories();
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted">{products.length} products in the catalogue</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
        >
          + Add product
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/admin/products/${p.id}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
              {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted">{categoryName(p.categorySlug)}</p>
            </div>
            <p className="text-sm font-semibold">${p.price.toLocaleString()}</p>
            <Pencil size={15} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
        {products.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No products yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}

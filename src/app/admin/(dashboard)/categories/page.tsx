import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { getCategories } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted">{categories.length} collections</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
        >
          + Add category
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/admin/categories/${c.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
              {c.image && <Image src={c.image} alt={c.name} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted">{c.tagline}</p>
            </div>
            <Pencil size={15} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
        {categories.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No categories yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}

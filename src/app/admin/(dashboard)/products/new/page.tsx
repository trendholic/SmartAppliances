import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/store";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/products" className="mb-6 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> Back to products
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Add product</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}

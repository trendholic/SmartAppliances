import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, getProductById } from "@/lib/store";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/products" className="mb-6 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> Back to products
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Edit product</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug } from "@/lib/store";
import CategoryForm from "@/components/admin/CategoryForm";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/categories" className="mb-6 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> Back to categories
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Edit category</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}

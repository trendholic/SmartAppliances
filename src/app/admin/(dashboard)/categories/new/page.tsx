import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/categories" className="mb-6 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> Back to categories
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Add category</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <CategoryForm />
      </div>
    </div>
  );
}

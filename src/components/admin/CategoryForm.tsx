"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { Category } from "@/lib/store";
import ImageUploader from "./ImageUploader";

const ICONS = ["snowflake", "flame", "oven", "wind", "droplets", "wine"] as const;

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const isEdit = Boolean(category);
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [name, setName] = useState(category?.name ?? "");
  const [tagline, setTagline] = useState(category?.tagline ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [icon, setIcon] = useState<string>(category?.icon ?? ICONS[0]);
  const [image, setImage] = useState(category?.image ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!slug || !name) {
      setError("Slug and name are required.");
      return;
    }
    const payload = { slug, name, tagline, description, icon, image };
    setSaving(true);
    try {
      const res = await fetch(isEdit ? `/api/categories/${category!.slug}` : "/api/categories", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!category) return;
    if (!confirm(`Delete "${category.name}"? Products in this category will also be deleted.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Image</label>
          <ImageUploader value={image} onChange={setImage} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              disabled={isEdit}
              placeholder="refrigeration"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Tagline</label>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Icon</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className="input">
              {ICONS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-muted">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {isEdit ? "Save changes" : "Create category"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
          >
            {deleting && <Loader2 size={14} className="animate-spin" />}
            Delete category
          </button>
        )}
      </div>
    </form>
  );
}

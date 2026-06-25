"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Category, Product } from "@/lib/store";
import ImageUploader from "./ImageUploader";

const ENERGY_RATINGS = ["A+++", "A++", "A+"] as const;

type FormState = {
  id: string;
  name: string;
  categorySlug: string;
  tagline: string;
  description: string;
  price: string;
  energyRating: Product["energyRating"];
  finish: string;
  features: string;
  specs: { key: string; value: string }[];
  accent: string;
  image: string;
};

function toFormState(product?: Product, defaultCategorySlug?: string): FormState {
  return {
    id: product?.id ?? "",
    name: product?.name ?? "",
    categorySlug: product?.categorySlug ?? defaultCategorySlug ?? "",
    tagline: product?.tagline ?? "",
    description: product?.description ?? "",
    price: product?.price !== undefined ? String(product.price) : "",
    energyRating: product?.energyRating ?? "A+++",
    finish: product?.finish?.join(", ") ?? "",
    features: product?.features?.join("\n") ?? "",
    specs: product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }],
    accent: product?.accent ?? "#3fd0c9",
    image: product?.image ?? "",
  };
}

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [form, setForm] = useState<FormState>(toFormState(product, categories[0]?.slug));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateSpec(index: number, field: "key" | "value", value: string) {
    setForm((f) => {
      const specs = [...f.specs];
      specs[index] = { ...specs[index], [field]: value };
      return { ...f, specs };
    });
  }

  function addSpec() {
    setForm((f) => ({ ...f, specs: [...f.specs, { key: "", value: "" }] }));
  }

  function removeSpec(index: number) {
    setForm((f) => ({ ...f, specs: f.specs.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.id || !form.name || !form.categorySlug) {
      setError("Product ID, name, and category are required.");
      return;
    }

    const payload = {
      id: form.id,
      name: form.name,
      categorySlug: form.categorySlug,
      tagline: form.tagline,
      description: form.description,
      price: Number(form.price) || 0,
      energyRating: form.energyRating,
      finish: form.finish.split(",").map((s) => s.trim()).filter(Boolean),
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      specs: Object.fromEntries(
        form.specs.filter((s) => s.key.trim()).map((s) => [s.key.trim(), s.value.trim()])
      ),
      accent: form.accent,
      image: form.image,
    };

    setSaving(true);
    try {
      const res = await fetch(isEdit ? `/api/products/${product!.id}` : "/api/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      router.push("/admin/products");
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
          <ImageUploader value={form.image} onChange={(url) => update("image", url)} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Product ID (slug)">
            <input
              value={form.id}
              onChange={(e) => update("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              disabled={isEdit}
              placeholder="cryo-fridge-x1"
              className="input"
            />
          </Field>
          <Field label="Category">
            <select
              value={form.categorySlug}
              onChange={(e) => update("categorySlug", e.target.value)}
              className="input"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Name">
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" />
          </Field>
          <Field label="Tagline">
            <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className="input" />
          </Field>
          <Field label="Price (USD)">
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Energy rating">
            <select
              value={form.energyRating}
              onChange={(e) => update("energyRating", e.target.value as Product["energyRating"])}
              className="input"
            >
              {ENERGY_RATINGS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Accent color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.accent}
                onChange={(e) => update("accent", e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-surface-2"
              />
              <input value={form.accent} onChange={(e) => update("accent", e.target.value)} className="input" />
            </div>
          </Field>
          <Field label="Finishes (comma separated)">
            <input
              value={form.finish}
              onChange={(e) => update("finish", e.target.value)}
              placeholder="Graphite, Brushed Steel"
              className="input"
            />
          </Field>
        </div>
      </div>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className="input resize-none"
        />
      </Field>

      <Field label="Features (one per line)">
        <textarea
          value={form.features}
          onChange={(e) => update("features", e.target.value)}
          rows={4}
          className="input resize-none"
        />
      </Field>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium text-muted">Specifications</label>
          <button
            type="button"
            onClick={addSpec}
            className="flex items-center gap-1 text-xs font-semibold text-accent hover:opacity-80"
          >
            <Plus size={13} /> Add spec
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {form.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={spec.key}
                onChange={(e) => updateSpec(i, "key", e.target.value)}
                placeholder="Capacity"
                className="input flex-1"
              />
              <input
                value={spec.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="640L"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
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
          {isEdit ? "Save changes" : "Create product"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
          >
            {deleting && <Loader2 size={14} className="animate-spin" />}
            Delete product
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

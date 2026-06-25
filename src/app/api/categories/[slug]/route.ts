import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, getCategoryBySlug, updateCategory, type Category } from "@/lib/store";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const updates = (await req.json()) as Partial<Category>;
  try {
    const category = updateCategory(slug, updates);
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  deleteCategory(slug);
  return NextResponse.json({ ok: true });
}

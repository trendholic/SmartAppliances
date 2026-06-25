import { NextRequest, NextResponse } from "next/server";
import { createCategory, getCategories, type Category } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getCategories());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Category;
  if (!body.slug || !body.name) {
    return NextResponse.json({ error: "slug and name are required" }, { status: 400 });
  }
  try {
    const category = createCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}

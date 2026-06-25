import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts, type Product } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Product;
  if (!body.id || !body.name || !body.categorySlug) {
    return NextResponse.json({ error: "id, name, and categorySlug are required" }, { status: 400 });
  }
  try {
    const product = createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}

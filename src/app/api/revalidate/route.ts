// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tags: string[] = body.tags || [];

    tags.forEach((tag) => {
      revalidateTag(tag);
    });

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to revalidate", details: err },
      { status: 500 }
    );
  }
}

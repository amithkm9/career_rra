// app/api/blog/featured-posts/route.ts
import { NextResponse } from "next/server";
import { getFeaturedPosts } from "@/lib/sanity-client";

export async function GET() {
  try {
    const posts = await getFeaturedPosts();
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
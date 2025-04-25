// app/blog/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, getFeaturedPosts } from "@/lib/sanity-client";
import BlogLayout from "@/components/blog/blog-layout";
import BlogPostCard from "@/components/blog/blog-post-card";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | ClassMent",
  description: "Read our latest articles about career development, skill-building, and professional growth.",
};

async function FeaturedPosts() {
  try {
    const featuredPosts = await getFeaturedPosts();
    
    // Debug log to see how many featured posts are coming back
    console.log("Featured posts count:", featuredPosts?.length || 0);
    
    if (!featuredPosts || featuredPosts.length === 0) {
      return null;
    }
    
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogPostCard key={post._id} post={post} featured={true} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load featured posts. Please try again later.</p>
      </div>
    );
  }
}

async function AllPosts() {
  try {
    const posts = await getAllPosts();
    
    // Debug log to see how many posts are coming back
    console.log("All posts count:", posts?.length || 0);
    console.log("All posts data:", JSON.stringify(posts));
    
    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No posts found. Check back soon!</p>
        </div>
      );
    }
    
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load posts. Please try again later.</p>
      </div>
    );
  }
}

export default async function BlogPage() {
  try {
    const categories = await getAllCategories();
    
    return (
      <BlogLayout categories={categories}>
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">ClassMent Blog</h1>
            <p className="text-lg text-gray-600">
              Insights, guides, and resources for your career journey
            </p>
          </div>
          
          <Suspense fallback={<LoadingSpinner label="Loading featured posts" />}>
            <FeaturedPosts />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner label="Loading all posts" />}>
            <AllPosts />
          </Suspense>
        </div>
      </BlogLayout>
    );
  } catch (error) {
    console.error("Error in BlogPage:", error);
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">ClassMent Blog</h1>
        <div className="py-12 border rounded-lg my-8">
          <p className="text-xl text-red-500 mb-6">Sorry, we couldn't load the blog at this time.</p>
          <Link href="/" className="text-primary hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }
}

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
// app/blog/search/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { searchPosts, getAllCategories } from "@/lib/sanity-client";
import BlogLayout from "@/components/blog/blog-layout";
import BlogPostCard from "@/components/blog/blog-post-card";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Results | ClassMent Blog",
  description: "Search results for your query on the ClassMent blog.",
};

interface SearchPageProps {
  searchParams: { q: string };
}

async function SearchResults({ query }: { query: string }) {
  const posts = await searchPosts(query);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Search Results</h2>
      <p className="text-gray-600 mb-6">
        {posts.length === 0
          ? "No posts found matching your search."
          : `Found ${posts.length} post${posts.length === 1 ? '' : 's'} for "${query}"`}
      </p>
      
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const categories = await getAllCategories();
  
  return (
    <BlogLayout categories={categories}>
      <div className="space-y-6">
        <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </BlogLayout>
  );
}
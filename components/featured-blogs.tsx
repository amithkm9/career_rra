// components/featured-blogs.tsx
"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity-client";
import { format } from "date-fns";
import type { Post } from "@/types/blog";

export function FeaturedBlogs() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const response = await fetch('/api/blog/featured-posts');
        const data = await response.json();
        setFeaturedPosts(data.posts);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and resources to help you navigate your career journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              {post.mainImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(post.mainImage).width(500).height(300).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2">
                  {post.publishedAt && (
                    <span className="text-xs text-gray-500">
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                )}
                <Link href={`/blog/${post.slug.current}`} className="text-primary font-medium text-sm hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/blog" className="inline-flex items-center gap-2">
              View all posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
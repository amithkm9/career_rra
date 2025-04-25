// components/blog/sidebar-nav.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tag, Bookmark } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/types/blog";

interface SidebarNavProps {
  categories?: Category[];
}

export default function SidebarNav({ categories = [] }: SidebarNavProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Link
              href="/blog"
              className="block p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="block p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscribe Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Subscribe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Stay up to date with our latest blog posts and updates.
          </p>
          <form className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              required
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
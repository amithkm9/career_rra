"use client"

// components/blog/sidebar-nav.tsx
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tag, Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";
import type { Category } from "@/types/blog";

// Initialize Supabase client directly here to avoid import errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SidebarNavProps {
  categories?: Category[];
}

export default function SidebarNav({ categories = [] }: SidebarNavProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      // First, check if this email already exists in the profiles table
      const { data: existingProfiles, error: checkError } = await supabase
        .from("profiles")
        .select("id, subscribed_to_blog")
        .eq("email", email);

      if (checkError) {
        console.error("Error checking existing profile:", checkError);
        throw new Error("Failed to check subscription status");
      }

      // If profile exists and already subscribed
      if (existingProfiles && existingProfiles.length > 0 && existingProfiles[0].subscribed_to_blog) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our blog updates.",
        });
        setEmail("");
        return;
      }
      
      // If profile exists but not subscribed to blog
      if (existingProfiles && existingProfiles.length > 0) {
        // Update existing profile to subscribe to blog
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            subscribed_to_blog: true,
            blog_subscription_date: new Date().toISOString()
          })
          .eq("id", existingProfiles[0].id);
          
        if (updateError) {
          console.error("Error updating profile:", updateError);
          throw new Error("Failed to save subscription");
        }
      } else {
        // Create new profile with blog subscription
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              email,
              subscribed_to_blog: true,
              blog_subscription_date: new Date().toISOString()
            },
          ]);

        if (insertError) {
          console.error("Error inserting profile:", insertError);
          throw new Error("Failed to save subscription");
        }
      }

      // Success message
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our blog updates.",
      });

      // Clear the input
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
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
          <form className="space-y-2" onSubmit={handleSubscribe}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubscribing}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
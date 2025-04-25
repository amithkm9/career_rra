// app/blog/author/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getAuthorBySlug, getAllCategories, urlFor } from "@/lib/sanity-client";
import BlogLayout from "@/components/blog/blog-layout";
import BlogPostCard from "@/components/blog/blog-post-card";
import { Loader2 } from "lucide-react";

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  
  if (!author) {
    return {
      title: "Author Not Found | ClassMent Blog",
      description: "The blog author you're looking for could not be found.",
    };
  }
  
  return {
    title: `${author.name} | ClassMent Blog`,
    description: `Read posts by ${author.name} on ClassMent Blog.`,
    openGraph: author.image ? {
      images: [
        {
          url: urlFor(author.image).width(800).height(800).url(),
          width: 800,
          height: 800,
          alt: author.name,
        }
      ]
    } : undefined,
  };
}

async function AuthorProfile({ slug }: { slug: string }) {
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    notFound();
  }
  
  return (
    <div>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {author.image && (
            <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={urlFor(author.image).width(256).height(256).url()}
                alt={author.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            {author.role && (
              <p className="text-xl text-gray-600 mb-4">{author.role}</p>
            )}
            
            {author.bio && (
              <div className="prose">
                <PortableText value={author.bio} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Posts by {author.name}</h2>
        
        {(!author.posts || author.posts.length === 0) ? (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-600">This author hasn't published any posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.posts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const categories = await getAllCategories();
  
  return (
    <BlogLayout categories={categories}>
      <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <AuthorProfile slug={params.slug} />
      </Suspense>
    </BlogLayout>
  );
}
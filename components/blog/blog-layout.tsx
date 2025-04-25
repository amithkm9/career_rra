// components/blog/blog-layout.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import SidebarNav from "./sidebar-nav";
import type { ReactNode } from "react";
import type { Category } from "@/types/blog";

interface BlogLayoutProps {
  children: ReactNode;
  categories?: Category[];
}

export default function BlogLayout({ children, categories = [] }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-80 lg:w-96 shrink-0">
              <SidebarNav categories={categories} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
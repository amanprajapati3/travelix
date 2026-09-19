import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import BlogDetail from "../../components/layout/blog/BlogDetail";
import { getBlogDetailBySlug, getBlogPostBySlug, getBlogPostSlugs, site } from "@/data";

export function generateStaticParams() {
  return getBlogPostSlugs().map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const detail = getBlogDetailBySlug(slug);
  if (!post || !detail) notFound();

  const recentPosts = getBlogPostSlugs().filter((recent) => recent.slug !== post.slug).slice(0, 4);
  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title="Our"
        highlightedTitle="Detail"
        backgroundImage={site.blog.banner?.backgroundImage ?? ""}
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Blog Detail" }]}
      />
      <BlogDetail post={post} detail={detail} recentPosts={recentPosts} />
    </main>
  );
}
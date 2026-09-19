"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data";
import type { TravelBlogData, TravelBlogPost } from "@/type/typeSection";

const blogData: TravelBlogData = site.blog;

export default function Blog() {
  if (!blogData) return null;

  const { banner, badge, title, desc, featuredPost, posts } = blogData;

  const allPosts: Array<TravelFeaturedBlogPostType | TravelBlogPost> =
    featuredPost ? [featuredPost, ...posts] : posts;

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden">
      {/* REUSABLE BANNER */}
      {banner && (
        <Banner
          title={banner.title}
          highlightedTitle={banner.highlightedTitle}
          backgroundImage={banner.backgroundImage}
          breadcrumbItems={banner.breadcrumbItems}
        />
      )}

      {/* HEADING SECTION */}
      <section className="relative w-full py-8 md:py-12">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="relative mb-5">
            <ScrollReveal className="relative z-10 flex flex-col items-center text-center " direction="up">
              {badge && (
                <span className="mb-2 inline-block text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
                  {badge}
                </span>
              )}
              <h2 className="mb-3 max-w-2xl text-[clamp(2.2rem,4vw,2.5rem)] font-semibold leading-tight tracking-wide">
                <span className="text-white">{title.normal}</span>{" "}
                <span className="relative inline-block text-amber-400">
                  {title.highlighted}
                </span>
              </h2>
              {/* {desc && (
                <p className="max-w-xl text-sm text-slate-400 md:text-base">
                  {desc}
                </p>
              )} */}
            </ScrollReveal>
          </div>

          {/* BLOG GRID: 1-col mobile, 2-col tablet, 3-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post, i) => (
              <ScrollReveal key={post.id} direction="up" index={i} staggerChildren={0.08}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type TravelFeaturedBlogPostType = TravelBlogData["featuredPost"];

function BlogCard({ post }: { post: TravelBlogPost }) {
  return (
    <div className="group flex flex-col overflow-hidden  transition-colors duration-300 hover:border-amber-400/40">
      {/* IMAGE */}
      <div className="relative h-[240px] flex-shrink-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform rounded-2xl duration-500 group-hover:scale-105"
        />
        {/* DATE BADGE - left bottom, transparent rounded bg */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-block rounded-2xl bg-white/30 px-3 py-1.5 text-md font-semibold tracking-wider text-white backdrop-blur-sm">
            {post.date.trim()}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-grow flex-col py-6">
        <h3 className="line-clamp-2 min-h-[60]  text-xl font-bold leading-snug text-white transition-colors group-hover:text-amber-400">
          {post.title}
        </h3>

        {/* UNDERLINE */}
        <div className="my-2 h-[1px] w-full rounded-md bg-white/80" />

        {/* AUTHOR + VERTICAL LINE + READ MORE */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-md font-medium uppercase tracking-wider text-amber-400">
            BY <span className="text-white/80">{post.author}</span>
          </span>
          <span className="h-4 w-px bg-white/25"></span>
          <Link
            href={`/blog/${post.slug}`}
            className="group/btn inline-flex items-center gap-2 font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            <span>{post.readMoreText || "Read More"}</span>
            <span className="flex mt-1 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover/btn:translate-x-1">
              <ArrowRight className="h-6 w-6" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
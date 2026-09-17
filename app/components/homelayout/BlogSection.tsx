"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, MessageSquare, ArrowRight } from "lucide-react";
import { site } from "@/data"; // Adjust import path to match your project structure
import type { TravelBlogData, TravelBlogPost } from "@/type/typeSection"; // Adjust import path

const blogData: TravelBlogData = site.blog;

export default function BlogSection() {
  if (!blogData) return null;

  const { badge, title, desc, featuredPost, posts } = blogData;

  return (
    <section className="relative w-full bg-[#05060a] py-8 md:py-12 text-white overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* HEADER SECTION */}
        <div className="relative mb-8">
          {" "}
          <div className="absolute left-[45%] top-0 z-0 h-[180px] w-[300px] pointer-events-none">
            {" "}
            <Image
              src="/travel/world_map_transparent (2).png"
              alt="background map"
              fill
              className="object-contain object-left-top opacity-40"
            />{" "}
          </div>{" "}
          <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left">
            {" "}
            {badge && (
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
                {" "}
                {badge}{" "}
              </span>
            )}{" "}
            <h2 className="mb-3 max-w-2xl text-[clamp(2.2rem,4vw,2rem)] uppercase leading-tight tracking-wide">
              {" "}
              <span className="text-white">{title.normal}</span>{" "}
              <span className="relative inline-block text-amber-400">
                {" "}
                {title.highlighted}{" "}
                <span className="absolute -bottom-1 right-0 h-1 w-full rounded-full bg-amber-400"></span>{" "}
              </span>{" "}
            </h2>{" "}
            {desc && (
              <p className="max-w-xl text-sm text-slate-400 md:text-base">
                {" "}
                {desc}{" "}
              </p>
            )}{" "}
          </div>{" "}
        </div>

      <div className="absolute bottom-0 right-0">
        <img src="/travel/mountain_only_transparent.png" alt="" />
      </div>
        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT SIDE: HUGE FEATURED POST CARD (Takes 7 cols on Desktop) */}
          {featuredPost && (
            <div className="lg:col-span-7 bg-[#0b0f17] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col h-fit group">
              {/* Image Container */}
              <div className="relative w-full h-[270px]  overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {featuredPost.tag && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-md tracking-wider">
                      {featuredPost.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-4  flex flex-col justify-between">
                <div>
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-0">
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-amber-400" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-amber-400" />
                      <span>Comments ({featuredPost.comments})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl md:max-w-[400px] font-bold text-white mb-3 leading-snug group-hover:text-amber-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  {/* Description */}
                  {featuredPost.description && (
                    <p className="text-slate-300 text-sm md:max-w-[470px] sm:text-base  mb-0">
                      {featuredPost.description}
                    </p>
                  )}
                </div>

                {/* Read More Button */}
                <div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex  mt-3 items-center gap-2 text-white font-semibold text-sm sm:text-base group/btn"
                  >
                    <span>{featuredPost.readMoreText || "Read More"}</span>
                    <span className="h-8 w-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT SIDE: THREE STACKED CARDS (Takes 5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {posts &&
              posts.slice(0, 3).map((post: TravelBlogPost) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xl text-slate-900 flex flex-col sm:flex-row items-stretch group border border-slate-100"
                >
                  {/* Thumbnail Image (Left side on desktop/tablet) */}
                  <div className="relative w-full sm:w-2/5 h-38 sm:h-auto min-h-[140px] overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content (Right side on desktop/tablet) */}
                  <div className="p-3 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 mb-2.5">
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-amber-500" />
                          <span>{post.author}</span>
                        </div>
                        <span>|</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                          <span>Comments ({post.comments})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>

                    {/* Read More Link */}
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex  items-center gap-2 text-slate-900 font-semibold text-xs sm:text-sm group/btn"
                      >
                        <span>{post.readMoreText || "Read More"}</span>
                        <span className="h-7 w-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

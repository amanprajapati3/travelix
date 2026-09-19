import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import type {
  TravelBlogDetail,
  TravelBlogPost,
  TravelFeaturedBlogPost,
} from "@/type/typeSection";

type BlogCardPost = TravelBlogPost | TravelFeaturedBlogPost;

export default function BlogDetail({
  post,
  detail,
  recentPosts,
}: {
  post: BlogCardPost;
  detail: TravelBlogDetail;
  recentPosts: BlogCardPost[];
}) {
  return (
    <section className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6 md:py-14 lg:px-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-10">
        <article className="min-w-0">
          <div className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.2em] text-amber-300">
            <span className="h-0.5 w-5 bg-amber-300" /> Blog Details
          </div>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-amber-400" />
              {post.date.trim()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-amber-400" />
              By {post.author}
            </span>
          </div>
          <div className="relative mt-5 h-[250px] overflow-hidden rounded-xl sm:h-[380px] lg:h-[410px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-sm md:text-base leading-6 text-white">
            {detail.intro}
          </p>
          <div className="mt-5 space-y-5">
            {detail.sections.map((section) => (
              <section key={section.number} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-slate-950">
                  {section.number}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white sm:text-xl">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base leading-6 text-slate-100">
                    {section.body}
                  </p>
                </div>
              </section>
            ))}
          </div>
          <blockquote className="mt-7 rounded-lg border-l-4 border-amber-400 bg-[#061b20] px-5 py-4 text-sm sm:text-base leading-6 text-slate-200">
            {detail.quote}
          </blockquote>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-6">
          <div className="rounded-lg border-2 border-cyan-900 bg-[#061b20] p-2 sm:p-3">
            <h2 className="text-base font-bold">Recent Posts</h2>
            <div className="mt-2 h-0.5 w-7 bg-amber-400" />
            <div className="mt-4 space-y-4">
              {recentPosts.map((recent) => (
                <Link
                  key={recent.slug}
                  href={`/blog/${recent.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={recent.image}
                      alt={recent.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-4 text-white group-hover:text-amber-400">
                      {recent.title}
                    </h3>
                    <p className="mt-1 text-[12px] text-white">
                      {recent.date.trim()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg  text-slate-950">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="310px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 p-3">
              <div className="md:max-w-[150px] text-white">
                <p className="text-[15px] font-bold tracking-[0.15em]">
                  Need help planning?
                </p>
                <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
                  Make Your Next Journey Memorable
                </h2>
                <Link
                  href="/enquiry"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-3 text-sm font-bold text-black"
                >
                  Plan Your Trip
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </section>
  );
}

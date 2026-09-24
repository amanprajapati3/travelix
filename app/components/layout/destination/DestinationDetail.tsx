"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../../shared/ScrollReveal";
import { ArrowLeft, MapPin } from "lucide-react";
import type { TravelDestinationItem } from "@/data";

export default function DestinationDetail({
  destination,
}: {
  destination: TravelDestinationItem;
}) {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 md:py-14 lg:px-10">
      {/* DESTINATION NAME (CENTERED) + SHORT DESCRIPTION */}
      <ScrollReveal className="text-center" direction="up">
        <p className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
          <MapPin className="h-4 w-4 text-amber-400" /> {destination.country}
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {destination.name}
        </h1>
        <div className="mx-auto mt-3 h-1 w-14 bg-amber-300" />
        {destination.description && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white sm:text-base">
            {destination.description}
          </p>
        )}
        {destination.type && (
          <p className="mt-3 text-xs sm:text-sm uppercase tracking-wide text-slate-300">
            {destination.type} Destination
          </p>
        )}
        {destination.tags && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-400/30 bg-[#061b20] px-3 py-1 text-xs font-medium text-amber-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </ScrollReveal>

      {/* MAIN IMAGE */}
      <ScrollReveal className="relative mt-10" direction="up">
        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-cyan-900 sm:h-[420px] md:h-[480px]">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021216]/60 via-transparent to-transparent" />
        </div>
      </ScrollReveal>

      {/* TWO PARAGRAPHS */}
      {destination.paragraphs && destination.paragraphs.length > 0 && (
        <ScrollReveal
          className="mt-10 rounded-2xl border border-cyan-900 bg-[#061b20] p-6 sm:p-10"
          direction="up"
        >
          <h2 className="flex items-center gap-3 text-xl font-bold sm:text-2xl md:text-3xl">
            <span className="h-8 w-1 bg-amber-400" /> About {destination.name}
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {destination.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-7 text-white sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>
      )}

      <Link
        href="/destination"
        className="mt-8 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back to destinations
      </Link>
    </section>
  );
}
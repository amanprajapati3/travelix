"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  ArrowRight,
  CarFront,
  Check,
  Clock3,
  Headphones,
  Heart,
  Map,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import type { TravelServiceItem } from "@/type/typeSection";

const icons = { car: CarFront, check: Check, clock: Clock3, headphones: Headphones, heart: Heart, map: Map, shield: ShieldCheck, star: Star, users: Users };

export default function ServiceDetail({ service }: { service: TravelServiceItem }) {
  return (
    <section className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6 md:py-14 lg:px-10">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
        <ScrollReveal direction="left">
          <div className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            <span className="h-0.5 w-4 bg-amber-300" /> {service.detail.eyebrow}
          </div>
          <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {service.title} <span className="text-amber-300">{service.highlightedTitle}</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm md:text-base leading-6 text-white">{service.detail.intro}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {service.detail.features.map((feature) => {
              const Icon = icons[feature.icon as keyof typeof icons] ?? Star;
              return (
                <div key={feature.title} className="rounded-lg border border-cyan-900/80 bg-[#061b20] p-2 text-center">
                  <Icon className="mx-auto h-8 w-8 text-amber-300" />
                  <h2 className="mt-2 text-[14px] font-semibold text-white">{feature.title}</h2>
                </div>
              );
            })}
          </div>
          <Link href="/enquiry" className="mt-6 inline-flex items-center gap-3 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300">
            Plan This Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        <ScrollReveal className="relative min-h-[300px] sm:min-h-[410px]" direction="right">
          <div className="absolute -left-3 -top-3 h-36 w-32 rounded-xl bg-amber-300 sm:h-44 sm:w-36" />
          <div className="relative z-10 h-[300px] overflow-hidden rounded-xl border border-cyan-900 sm:h-[410px]">
            <Image src={service.image} alt={service.title} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031216]/70 via-transparent to-transparent" />
            <div className="absolute  top-5 left-5 max-w-[130px] rounded-lg bg-[#061b20]/90 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white">{service.badge}</p>
              <div className="mt-2 h-0.5 w-8 bg-amber-300" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-8 rounded-xl border border-cyan-900 bg-[#061b20] p-6 sm:p-8" direction="up">
        <h2 className="flex items-center gap-3 text-lg font-bold sm:text-xl md:text-2xl"><span className="h-1 w-5 bg-amber-400" /> Overview</h2>
        <p className="mt-4 text-sm leading-6 text-white sm:text-base">{service.detail.overview}</p>
        <p className="mt-3 text-sm leading-6 text-white sm:text-base">{service.detail.overviewExtra}</p>
      </ScrollReveal>
    </section>
  );
}
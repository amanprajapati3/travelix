"use client";

import Link from "next/link";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Compass,
  FileText,
  HelpCircle,
  Image,
  MapPin,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getBlogPostSlugs, getDestinationSlugs, getPackageSlugs, getServiceIds, getTeamMemberSlugs, site, type SitemapLink } from "@/data";

const icons = { calendar: CalendarDays, car: CarFront, compass: Compass, "file-text": FileText, "help-circle": HelpCircle, image: Image, "map-pin": MapPin, plane: Plane, "shield-check": ShieldCheck, users: Users };

export default function Sitemap() {
  const groups = site.sitemap.groups.map((group) => {
    let dynamicLinks: SitemapLink[] = [];
    if (group.title === "Tour Packages") dynamicLinks = getPackageSlugs().map((item) => ({ label: item.title, href: `/package/${item.slug}` }));
    if (group.title === "Destinations") dynamicLinks = getDestinationSlugs().map((item) => ({ label: item.name, href: item.slug }));
    if (group.title === "Our Services") dynamicLinks = getServiceIds().map((item) => ({ label: `${item.title} ${item.highlightedTitle}`, href: `/services/${item.id}` }));
    if (group.title === "Blog") dynamicLinks = getBlogPostSlugs().map((item) => ({ label: item.title, href: `/blog/${item.slug}` }));
    if (group.title === "Our People") dynamicLinks = getTeamMemberSlugs().map((item) => ({ label: item.name, href: `/team/${item.slug}` }));
    return { ...group, links: [...group.links, ...dynamicLinks] };
  });

  return (
    <section className="bg-[#011014] px-4 py-10 text-white sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto mb-8 max-w-2xl text-center" direction="up">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[0.3em] text-amber-400">
            <span className="h-px w-5 bg-amber-400" /> {site.sitemap.eyebrow} <span className="h-px w-5 bg-amber-400" />
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{site.sitemap.title.normal} <span className="text-amber-400">{site.sitemap.title.highlighted}</span></h1>
          <p className="mt-2 text-sm sm:text-base leading-6 text-slate-100">{site.sitemap.description}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {groups.map((group, i) => {
            const Icon = icons[group.icon as keyof typeof icons] ?? Compass;
            return (
              <ScrollReveal key={group.title} className="rounded-lg border border-cyan-900/80 bg-[#03191e]/80 p-4" direction="up" index={i} staggerChildren={0.08}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-slate-950"><Icon className="h-6 w-6" /></span>
                  <div><h2 className="text-base md:text-lg font-bold text-white">{group.title}</h2><div className="mt-1 h-0.5 w-8 bg-amber-400" /></div>
                </div>
                <ul className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="flex items-center justify-between gap-2 text-sm leading-5 text-slate-100 transition-colors hover:text-amber-400">
                        <span className="line-clamp-1">{link.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

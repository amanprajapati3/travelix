"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hotel, Map, ShieldCheck } from "lucide-react";
import { IoCarSportOutline } from "react-icons/io5";

import { site } from "@/data";
import Banner from "../../shared/Banner";
import type { TravelServiceItem, TravelServicesData } from "@/type/typeSection";

const servicesData: TravelServicesData = site.services;

function getServiceIcon(iconName: string) {
    const className = "h-9 w-9 text-amber-300";

    switch (iconName) {
        case "shield-check":
            return <ShieldCheck className={className} />;
        case "map":
            return <Map className={className} />;
        case "car":
            return <IoCarSportOutline className={className} />;
        default:
            return <Hotel className={className} />;
    }
}

function ServiceCard({ service }: { service: TravelServiceItem }) {
    return (
        <article className="group relative flex min-h-[430px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#090d18] shadow-2xl">
            <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/55 to-transparent" />
            <div className="relative z-10 flex flex-col items-start gap-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                    {getServiceIcon(service.iconName)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                    {service.badge}
                </span>
                <div className="h-[2px] w-[30px] bg-amber-400" />
                <h2 className="text-2xl font-bold leading-tight tracking-wide">
                    <span className="block text-white">{service.title}</span>
                    <span className="block text-amber-300">{service.highlightedTitle}</span>
                </h2>
                {service.description && (
                    <p className="text-sm leading-relaxed text-gray-200">{service.description}</p>
                )}
                <Link
                    href={service.button.href}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-amber-400"
                >
                    {service.button.label}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}

export default function Service() {
    if (!servicesData) return null;

    return (
        <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
            {servicesData.banner && (
                <Banner
                    title={servicesData.banner.title}
                    highlightedTitle={servicesData.banner.highlightedTitle}
                    backgroundImage={servicesData.banner.backgroundImage}
                    breadcrumbItems={servicesData.banner.breadcrumbItems}
                />
            )}

            <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                <div className="mb-8 text-center md:mb-10">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
                        {servicesData.badge}
                    </span>
                    <h1 className="mt-0 text-3xl font-bold tracking-tight sm:text-4xl">
                        {servicesData.title}
                    </h1>
                    <div className="w-[90px] h-1 bg-amber-300 mx-auto mt-3"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </section>
        </main>
    );
}
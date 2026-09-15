"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Menu as MenuIcon,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Mountain,
} from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { site as siteData } from "@/data";
import type { TravelHeaderData } from "@/type/typeSection";

const headerData: TravelHeaderData = siteData.header;

const socialIconMap: Record<string, React.ElementType> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNavIndex, setOpenNavIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { site: siteInfo, nav, ctaButton } = headerData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Top Info Bar */}
      <div
        className={` w-full border-b-2 border-white/20 - px-4 py-2 text-white/80 transition-all duration-500 ${
          scrolled
            ? "bg-[#05060a]/85 backdrop-blur-xl"
            : "bg-black/85 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between font-sans text-[14px]">
          <div className="flex items-center gap-4">
            {siteInfo.TopBar?.address && (
              <span className="flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4 text-amber-400" strokeWidth={2.5} />
                {siteInfo.TopBar.address}
              </span>
            )}
          </div>
          <div>
            {siteInfo.TopBar?.navLinks &&
              siteInfo.TopBar.navLinks.length > 0 && (
                <span className="hidden items-center gap-2 md:gap-4 text-white xl:flex">
                  {siteInfo.TopBar.navLinks.map((link, i) => (
                    <React.Fragment key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-300 hover:text-amber-400"
                      >
                        {link.label}
                      </Link>
                      {i < siteInfo.TopBar.navLinks.length - 1 && (
                        <span className="text-amber-400 text-xl">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              )}
          </div>

          <div className="flex items-center gap-5">
            {siteInfo.TopBar?.socialLinks &&
              siteInfo.TopBar.socialLinks.length > 0 && (
                <span className="hidden items-center gap-3 border-r border-white/40 pr-4 md:flex">
                  {siteInfo.TopBar.socialLinks.map((s, i) => {
                    const Icon =
                      socialIconMap[s.label.toLowerCase()] ?? FaFacebookF;
                    return (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/70 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </span>
              )}
            {siteInfo.TopBar?.phone && (
              <a
                href={
                  siteInfo.TopBar.phoneHref || `tel:${siteInfo.TopBar.phone}`
                }
                className="flex items-center gap-2 text-white/80 sm:border-r border-white/40 sm:pr-4 transition-colors duration-300 hover:text-amber-400"
              >
                <FaPhoneAlt
                  className="h-3.5 w-3.5 text-amber-400"
                  strokeWidth={2.5}
                />
                {siteInfo.TopBar.phone}
              </a>
            )}

            {siteInfo.TopBar?.email && (
              <a
                href={`mailto:${siteInfo.TopBar.email}`}
                className=" hidden sm:flex items-center gap-2 text-white/80 transition-colors duration-300 hover:text-amber-400"
              >
                <IoMail
                  className="h-3.5 w-3.5 text-amber-400"
                  strokeWidth={2.5}
                />
                {siteInfo.TopBar.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full px-4 transition-all py-2 md:py-0  duration-500 sm:px-6 lg:px-10 ${
          scrolled
            ? "bg-[#05060a]/85 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            : "bg-black/85 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              {siteInfo.logo?.light ? (
                <Image
                  src={siteInfo.logo.light}
                  alt={siteInfo.siteName || "Travelix"}
                  width={140}
                  height={60}
                  sizes="(max-width: 640px) 120px, 160px"
                  className="h-10 w-auto object-contain sm:h-16 md:h-20"
                />
              ) : (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black">
                    <Mountain className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <span className="flex flex-col leading-none">
                    <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                      {siteInfo.siteName || "Travelix"}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-amber-400">
                      {siteInfo.tagline || "Explore More"}
                    </span>
                  </span>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
          </div>
          <nav className="hidden items-center gap-8 lg:gap-12 md:flex">
            {nav.map((item, index) => {
              const isActive = pathname === item.href;
              const hasChildren = item.children && item.children.length > 0;
              return (
                <div key={index} className="group relative">
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center gap-1 py-2 text-[15px] transition-colors duration-300 ${
                      isActive
                        ? "text-amber-400"
                        : "text-white/90 hover:text-amber-400"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-amber-400 transition-all duration-500 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {hasChildren && (
                    <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-2 rounded-2xl border border-white/10 bg-[#0b0f1a] p-2 opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                              isChildActive
                                ? "bg-white/10 text-amber-400"
                                : "text-white/80 hover:bg-white/5 hover:text-amber-400"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Button */}
          {ctaButton && (
            <Link
              href={ctaButton.href || "/plan-your-trip"}
              className="hidden items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-[15px] font-bold text-black shadow-md transition-all duration-300 hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] hover:brightness-105 lg:flex"
            >
              {ctaButton.label || "Plan Your Trip"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-amber-400 hover:text-black lg:hidden"
            aria-label="Open Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Mobile Drawer — slides in from the left */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-[320px] flex-col overflow-y-auto bg-[#05060a] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            {siteInfo.logo?.light ? (
              <Image
                src={siteInfo.logo.light}
                alt={siteInfo.siteName || "Travelix"}
                width={130}
                height={50}
                sizes="120px"
                className="h-9 sm:h-16 w-auto object-contain"
              />
            ) : (
              <>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black">
                  <Mountain className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold tracking-tight text-white">
                    {siteInfo.siteName || "Travelix"}
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-amber-400">
                    {siteInfo.tagline || "Explore More"}
                  </span>
                </span>
              </>
            )}
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-amber-400 hover:text-black"
            aria-label="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Nav */}
        <div className="flex flex-1 flex-col px-5 py-3">
          {nav.map((item, index) => {
            const isActive = pathname === item.href;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openNavIndex === index;
            return (
              <div
                key={index}
                className="border-b border-white/10 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href || "#"}
                    onClick={() => {
                      if (!hasChildren) closeMenu();
                    }}
                    className={`flex-1 py-4 text-[15px] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-amber-400"
                        : "text-white/85 hover:text-amber-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => setOpenNavIndex(isOpen ? null : index)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-amber-400"
                      aria-label={`Toggle ${item.label} menu`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                {hasChildren && isOpen && (
                  <div className="mb-2 flex flex-col gap-1 pl-4">
                    {item.children!.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={`rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                            isChildActive
                              ? "bg-white/10 text-amber-400"
                              : "text-white/70 hover:bg-white/5 hover:text-amber-400"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Contact / CTA */}
        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 p-5">
          {siteInfo.TopBar?.address && (
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-amber-400">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-white/80">
                {siteInfo.TopBar.address}
              </span>
            </div>
          )}

          {ctaButton && (
            <Link
              href={ctaButton.href || "/plan-your-trip"}
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-[15px] font-bold text-black"
            >
              {ctaButton.label || "Plan Your Trip"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

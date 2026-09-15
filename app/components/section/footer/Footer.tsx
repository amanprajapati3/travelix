"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Mountain,
  ChevronRight,
} from "lucide-react";
import { IoAirplane } from "react-icons/io5";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";
import { site as siteData } from "@/data";
import type { TravelFooterData } from "@/type/typeSection";
import { Allura } from "next/font/google";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const footerData: TravelFooterData = siteData.footer;

const socialIconMap: Record<string, React.ElementType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
};

const paymentIconMap: Record<string, React.ElementType> = {
  visa: FaCcVisa,
  mastercard: FaCcMastercard,
  paypal: FaCcPaypal,
  amex: FaCcAmex,
};

/** Reusable Signature Component */
function Signature({
  text,
  className = "",
  textClassName = "text-3xl sm:text-4xl",
  color = "text-white/80",
}: {
  text: string;
  className?: string;
  textClassName?: string;
  color?: string;
}) {
  return (
    <span className={`inline-flex flex-col -rotate-12 items-start select-none ${className}`}>
      <span className={`${allura.className} ${textClassName} ${color} leading-none`}>
        {text}
      </span>
      <svg
        viewBox="0 0 220 28"
        className="mt-1 h-4 w-full"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M10 20C55 7 105 8 155 2C177 0 194 0 216 1"
          stroke="#F5B800"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M35 26C78 15 125 10 185 4"
          stroke="#F5B800"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Footer() {
  const {
    logoImage,
    desc,
    tagline,
    columns,
    newsletter,
    footerContact,
    socialLinks,
    paymentIcons,
    copyright,
    legalLinks,
    sideTagline,
  } = footerData;

  return (
    <footer className="relative overflow-hidden top-0 bg-[#05060a] text-white">
      {/* Background Image & Multi-step Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/travel/1.jpg"
          alt=""
          fill
          className="object-cover object-top opacity-35"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05060a] via-[#05060a]/80 to-[#05060a]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/80 via-transparent to-[#05060a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 pb-6 pt-16 sm:px-6 lg:px-10">

        {/* Main Grid — single responsive flex-wrap layout */}
        <div className="flex flex-row flex-wrap justify-between items-stretch gap-x-6 lg:gap-x-10 gap-y-12 text-left">

          {/* Column 1: Brand & Logo Info */}
          <div className="flex max-w-[300px] flex-col items-start">
            <Link href="/" className="flex items-center gap-2">
              {logoImage ? (
                <Image
                  src={logoImage}
                  alt="Travelix"
                  width={140}
                  height={60}
                  className="h-10 sm:h-12 md:h-20 w-auto object-contain"
                />
              ) : (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black">
                    <Mountain className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <span className="flex flex-col leading-none">
                    <span className="text-xl font-extrabold tracking-tight text-white">
                      Travelix
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-amber-400">
                      Explore More
                    </span>
                  </span>
                </>
              )}
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">
              {desc}
            </p>

            {/* Social Icons */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-2.5">
                {socialLinks.map((s, i) => {
                  const Icon = socialIconMap[s.label.toLowerCase()] ?? FaFacebookF;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-amber-400 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Left Signature */}
            {tagline && (
              <div className="mt-8 max-w-[180px]">
                <Signature text={tagline} textClassName="text-2xl sm:text-3xl" />
              </div>
            )}
          </div>
          <div className="hidden lg:block w-[1px] bg-white/10 self-stretch my-2"></div>

          {/* Nav Columns — direct children so they wrap naturally:
              tablet shows brand + 1 nav (justify-between), then 2 navs + newsletter below */}
          {columns?.map((col, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-start">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    {col.title}
                  </h4>
                  <div className="mt-2 h-0.5 w-8 bg-amber-400" />
                </div>
                <ul className="mt-5 flex flex-col gap-2.5 w-full">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-amber-400"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-amber-400 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {idx === columns.length - 1 && (
                <div className="hidden lg:block w-[1px] bg-white/10 self-stretch my-2"></div>
              )}
            </React.Fragment>
          ))}

          {/* Newsletter + Contact */}
          <div className="flex flex-col justify-between items-start relative max-w-[270px]">
            <div className="w-full pr-2">

              {/* Newsletter Section */}
              {newsletter && (
                <div className="w-full">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      {newsletter.title}
                    </h4>
                    <div className="mt-2 h-0.5 w-8 bg-amber-400" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    {newsletter.desc}
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-4 flex items-center overflow-hidden rounded-2xl border border-white/15 bg-white/5  focus-within:border-amber-400 w-full"
                  >
                    <input
                      type="email"
                      required
                      placeholder={newsletter.placeholder}
                      className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-1 rounded-xl bg-amber-400 py-4 pl-2 pr-3 text-[12px]  font-bold  tracking-wider text-gray-800 transition-transform duration-300 hover:bg-amber-300 shrink-0"
                    >
                      <span>{newsletter.buttonText || "Subscribe"}</span>
                      <Send className="h-3 w-3" />
                    </button>
                  </form>
                </div>
              )}

              {/* Contact Info Section */}
              {footerContact && (
                <div className="mt-8 w-full">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      {footerContact.title}
                    </h4>
                    <div className="mt-2 h-0.5 w-8 bg-amber-400" />
                  </div>
                  <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70 w-full">
                    {footerContact.phone && (
                      <li>
                        <a
                          href={footerContact.phoneHref}
                          className="flex items-center gap-2.5 transition-colors duration-300 hover:text-amber-400"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-black">
                            <Phone className="h-3 w-3" />
                          </span>
                          <span className="text-xs sm:text-sm">{footerContact.phone}</span>
                        </a>
                      </li>
                    )}
                    {footerContact.email && (
                      <li>
                        <a
                          href={`mailto:${footerContact.email}`}
                          className="flex items-center gap-2.5 transition-colors duration-300 hover:text-amber-400"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-black">
                            <Mail className="h-3 w-3" />
                          </span>
                          <span className="text-xs sm:text-sm truncate">{footerContact.email}</span>
                        </a>
                      </li>
                    )}
                    {footerContact.address && (
                      <li className="flex items-start gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-black mt-0.5">
                          <MapPin className="h-3 w-3" />
                        </span>
                        <span className="text-xs sm:text-sm">{footerContact.address}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Right-Side Signature positioned safely in the opened right space */}
            {sideTagline && (
              <div className="absolute right-5 max-w-[120px] bottom-25 translate-x-4 lg:translate-x-12 pointer-events-none block z-20">
                <Signature
                  text={sideTagline}
                  textClassName="text-2xl sm:text-3xl"
                  color="text-amber-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-6 lg:flex-row lg:justify-between lg:gap-4">
          <p className="text-center text-xs text-white/70 lg:text-left shrink-0">
            {copyright}
          </p>

         

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
               <div className="hidden xl:flex items-center gap-3 shrink-0">
            <IoAirplane className="h-5 w-5 text-white -rotate-45" />
            <svg className="w-32 h-8 text-white/40" viewBox="0 0 120 30" fill="none">
              <path d="M2 15C20 30 50 30 118 5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
            <span className={`${allura.className} text-2xl  text-white tracking-wide relative inline-block -rotate-6`}>
              Travel Far <span className="text-amber-400">Live More</span>
              <svg viewBox="0 0 140 16" className="absolute -bottom-2 left-1/4 w-3/4 h-3 pointer-events-none" fill="none">
                <path d="M2 12C35 4 80 4 135 2" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <svg className="w-24 h-8 text-white/40" viewBox="0 0 100 30" fill="none">
              <path d="M2 5C40 25 70 25 98 15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>
            {paymentIcons && paymentIcons.length > 0 && (
              <div className="flex items-center gap-1">
                {paymentIcons.map((p, i) => {
                  const Icon = paymentIconMap[p.toLowerCase()];
                  return (
                    <span key={i} className="flex items-center justify-center rounded shadow-sm">
                      {Icon ? <Icon className="h-9 w-12" /> : <span className="text-[9px] font-bold uppercase">{p}</span>}
                    </span>
                  );
                })}
              </div>
            )}

            {legalLinks && legalLinks.length > 0 && (
                
              <div className="flex items-center gap-4 text-xs text-white/70">
                <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
                {legalLinks.map((link, i) => (
                  <React.Fragment key={link.href}>
                    <Link href={link.href} className="transition-colors duration-300 hover:text-amber-400">
                      {link.label}
                    </Link>
                    {i < legalLinks.length - 1 && <span className="text-white/30">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
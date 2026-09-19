"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  FileText,
  Globe,
  Headphones,
  Plus,
  Minus,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data";
import type { TravelFaqData } from "@/type/typeSection";
import { RiQuestionMark } from "react-icons/ri";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Faq() {
  const faqData: TravelFaqData = site.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqData) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="h-6 w-6 md:h-7 md:w-7 text-amber-400" />;
      case "FileText": return <FileText className="h-6 w-6 md:h-7 md:w-7 text-amber-400" />;
      case "Globe": return <Globe className="h-6 w-6 md:h-7 md:w-7 text-amber-400" />;
      case "Headphones": return <Headphones className="h-6 w-6 md:h-7 md:w-7 text-amber-400" />;
      default: return <RiQuestionMark className="h-6 w-6 md:h-7 md:w-7 text-amber-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden font-sans">
      
      {/* 1. TOP BANNER */}
      {faqData.banner && (
        <Banner
          title={faqData.banner.title}
          highlightedTitle={faqData.banner.highlightedTitle}
          backgroundImage={faqData.banner.backgroundImage}
          breadcrumbItems={faqData.banner.breadcrumbItems as any}
        />
      )}

      {/* 2. MAIN FAQ SECTION */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1400px] mx-auto">
        
        {/* HEADER SECTION WITH LEFT & RIGHT SPEECH BUBBLES */}
        <ScrollReveal className="relative mb-14 text-center max-w-3xl mx-auto" direction="up">
          
          {/* Left Speech Bubble */}
          <div className="hidden md:flex absolute md:w-[200px] md:h-[100px] -left-44 top-10 md:top-15 items-center gap-2  border-2 border-amber-400/80 rounded-2xl p-3 shadow-xl transform -rotate-12 z-10">
            <div className="h-12 w-12 rounded-full border-2 text-amber-300 flex items-center justify-center  font-black">
              <RiQuestionMark className="h-7 w-7" />
            </div>
            <span className="font-bold text-[11px] tracking-wider text-amber-300 max-w-[90px] text-left leading-tight">
              {faqData.speechBubbles.leftText}
            </span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#090e1a] border-r-2 border-b-2 border-amber-400/80 transform rotate-45" />
          </div>

          {/* Right Speech Bubble */}
          <div className="hidden md:flex absolute md:w-[200px] md:h-[100px]  top-10 md:top-15 -right-44 top-0 items-center gap-2  border-2 border-amber-400/80 rounded-2xl p-3 shadow-xl transform rotate-12 z-10">
            <div className="h-12 w-12 rounded-full border-2 text-amber-300 flex items-center justify-center  font-black">
              <MessageSquare className="h-7 w-7" />
            </div>
            <span className="font-bold text-[11px] tracking-wider text-amber-300 max-w-[90px] text-left leading-tight">
              {faqData.speechBubbles.rightText}
            </span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-4 w-3 h-3 bg-[#090e1a] border-l-2 border-b-2 border-amber-400/80 transform rotate-45" />
          </div>

          {/* Eyebrow */}
          <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-2">
            — {faqData.header.eyebrow} —
          </p>

          {/* Title */}
          <h2 className=" text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
            <span className="text-white">{faqData.header.title.normal}</span>{" "}
            <span className="text-amber-400">{faqData.header.title.highlighted}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            {faqData.header.subtitle}
          </p>
        </ScrollReveal>

        {/* FAQ GRID CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Features List + Travel Card Image */}
          <ScrollReveal className="lg:col-span-4 flex flex-col gap-6" direction="left">
            
            {/* Feature Cards Column */}
            <div className="bg-[#080d1a] md:-mt-4 border-2 border-gray-700 rounded-2xl p-4 flex flex-col gap-3">
              {faqData.leftFeatures.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 hover:border-amber-400/40 transition-colors"
                >
                  <div className="h-12 w-12 md:w-14 md:h-14 rounded-full  border border-amber-300 flex items-center justify-center shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-md leading-snug">{item.title}</h4>
                    <p className="text-md font-semibold text-white">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Image Card with Embedded Banner Text */}
            <div className="relative h-[280px] sm:h-[520px] rounded-2xl overflow-hidden border-2 border-amber-400/30 shadow-2xl group">
              <Image
                src={faqData.cardImage.src}
                alt="Travel Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-5">
                <div className="px-3 pb-8 -rotate-12 w-full text-center">
                  <p className={` ${caveat.className} text-lg max-w-[110px] sm:text-3xl  text-white leading-tight`}>
                    {faqData.cardImage.tagline}
                  </p>
                </div>
              </div>
            </div>

          </ScrollReveal>

          {/* RIGHT SIDE: 10 FAQ Accordion Items */}
          <ScrollReveal className="lg:col-span-8 flex flex-col gap-3" direction="right">
            {faqData.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? " border-amber-300 shadow-lg"
                      : " border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left cursor-pointer p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Number Badge */}
                      <span className="h-9 w-9 rounded-full bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0 shadow">
                        {faq.id}
                      </span>
                      {/* Question Text */}
                      <h3 className="font-semibold text-white text-xs sm:text-sm leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Toggle Icon */}
                    <div className="h-7 w-7 rounded-full border-2 border-amber-300 flex items-center justify-center text-amber-300 shrink-0">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 mt-1 pt-3 pl-14">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollReveal>

        </div>

        {/* 3. FAQ BOTTOM HELP / SUPPORT BAR */}
        <ScrollReveal className="mt-12  border-2 border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl" direction="up">
          
          <div className="flex  gap-4 text-center sm:text-left">
            <div className=" flex items-center justify-center text-amber-400 shrink-0 hidden sm:flex">
              <Headphones className="h-10 w-10 sm:w-16 sm:h-16" />
            </div>
            <div>
              <p className="text-amber-300 font-semibold text-[12px] tracking-widest uppercase">
                {faqData.supportBar.eyebrow}
              </p>
              <h3 className=" text-xl sm:text-3xl font-bold text-white">
                {faqData.supportBar.title}
              </h3>
              <p className="text-white text-base mt-1">
                {faqData.supportBar.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm border-t md:border-t-0 md:border-l border-slate-400 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex flex-col justify-start items-start gap-2">
              <Phone className="h-6 w-6 text-amber-300" />
              <div>
                <p className="text-white text-[12px]">Call Us</p>
                <p className="font-semibold text-white">{faqData.supportBar.phone}</p>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <Mail className="h-6 w-6 text-amber-300" />
              <div>
                <p className="text-white text-[12px]">Email Us</p>
                <p className="font-semibold text-white">{faqData.supportBar.email}</p>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <MessageSquare className="h-6 w-6 text-amber-300" />
              <div>
                <p className="text-white text-[12px]">{faqData.supportBar.chatText}</p>
                <p className="font-semibold text-white">{faqData.supportBar.chatSubtext}</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-amber-300 hover:bg-amber-400 text-slate-950 font-bold py-4 px-8 rounded-full flex items-center gap-2 shadow-md transition-all text-base"
            >
              <span>{faqData.supportBar.buttonText}</span>
              <ArrowRight className="h-5 w-5 " />
            </Link>
          </div>

        </ScrollReveal>

      </section>

      

    </main>
  );
}
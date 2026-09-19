"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Users,
  ShieldCheck,
  Heart,
  User,
  MessageSquare,
} from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data";
import type { TravelContactData } from "@/type/typeSection";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Contact() {
  const contactData: TravelContactData = site.contact;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  if (!contactData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Phone":
        return <Phone className="h-5 sm:w-8 sm:h-8 w-5" />;
      case "Mail":
        return <Mail className="h-5 w-5 sm:w-8 sm:h-8" />;
      case "MapPin":
        return <MapPin className="h-5 w-5 sm:w-8 sm:h-8" />;
      case "Clock":
        return <Clock className="h-5 w-5 sm:w-8 sm:h-8" />;
      case "Users":
        return <Users className="h-5 w-5 sm:w-8 sm:h-8" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 sm:w-8 sm:h-8" />;
      case "Heart":
        return <Heart className="h-5 w-5 sm:w-8 sm:h-8" />;
      default:
        return <MapPin className="h-5 w-5 sm:w-8 sm:h-8 " />;
    }
  };

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden font-sans">
      {/* 1. TOP BANNER */}
      {contactData.banner && (
        <Banner
          title={contactData.banner.title}
          highlightedTitle={contactData.banner.highlightedTitle}
          backgroundImage={contactData.banner.backgroundImage}
          breadcrumbItems={contactData.banner.breadcrumbItems as any}
        />
      )}

      {/* 2. MAIN CONTACT US SECTION */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1400px] mx-auto">
        {/* Top Right Background Mountain Graphic */}
        <div className="absolute top-5 right-30 opacity-80 pointer-events-none -z-0">
          <Image
            src={contactData.images.mountainTransparent}
            alt="Mountain Graphic"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="absolute w-[300px] -right-20  h-[200px] shrink-0">
          <Image
            src={contactData.images.planeLoop}
            alt="Plane Loop"
            fill
            className="object-contain"
          />
        </div>

        {/* Section Header */}
        <ScrollReveal className="mb-14 max-w-2xl relative z-10" direction="up">
          <h2 className=" text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide">
            <span className="text-white">
              {contactData.header.title.normal}
            </span>{" "}
            <span className="text-amber-400">
              {contactData.header.title.highlighted}
            </span>
          </h2>
          <div className="w-16 h-1 bg-amber-400 rounded-full mt-3" />
          <p className="text-white text-xs sm:text-base mt-4 leading-relaxed">
            {contactData.header.subtitle}
          </p>
        </ScrollReveal>

        {/* Main 7 / 5 split, not 6 / 6 — the left block is visibly wider than the form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start relative z-10">
          {/* LEFT SIDE (7 cols): Info list + script text beside overlapping photo cards */}
          <ScrollReveal className="lg:col-span-7" direction="left">
            <div className="grid grid-cols-1 sm:grid-cols-[230px_1fr] gap-x-4 gap-y-10 items-start">
              {/* Column A: single-column info list + script text underneath */}
              <div className="flex flex-col gap-6">
                {contactData.infoItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-12 w-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-400 text-base">
                        {item.title}
                      </h4>
                      <p className="text-white text-sm font-semibold mt-0.5">
                        {item.value}
                      </p>
                      {item.subtext && (
                        <p className="text-slate-400 text-[13px] mt-0.5">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Handwritten Text with Dashed Underline + plane */}
                <div className="relative pt-1 flex items-center gap-2">
                  <div className="inline-block transform -rotate-12">
                    <p
                      className={`${caveat.className}  max-w-[150px] text-xl sm:text-3xl font-extrabold text-white tracking-wide leading-snug`}
                    >
                      {contactData.scriptTexts.travelMore}
                    </p>
                    <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mt-1 border-b-2 border-amber-400 border-dashed" />
                  </div>
                </div>
              </div>

              {/* Column B: Overlapping tilted image cards — pulled left to overlap Column A */}
              <div className="relative h-[300px] sm:h-[340px] sm:-ml-10">
                {/* Image 2: Main Background Card Tilted Right */}
                <div className="absolute right-5 top-10 w-[200px] sm:w-[340px] h-[260px] sm:h-[450px] rounded-[24px]  border-4 border-white/90 shadow-2xl transform -rotate-6 z-10 hover:scale-105 transition-all duration-300">
                  <Image
                    src={contactData.images.tiltImage2}
                    alt="Good Travels Brighter Tomorrows"
                    fill
                    className="object-cover rounded-[20px] "
                  />
                  <div className="absolute -left-30 -bottom-10 w-[170px] sm:w-[195px] h-[170px] sm:h-[195px] rounded-[24px] overflow-hidden border-4 border-white/90 shadow-2xl transform -rotate-3 z-20 transition-all duration-300">
                    <Image
                      src={contactData.images.tiltImage1}
                      alt="Explore Dream Discover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute right-5 bottom-0  p-4">
                    <p
                      className={`${caveat.className}  max-w-[130px] text-xl sm:text-3xl font-extrabold text-white tracking-wide leading-snug`}
                    >
                      Good Travels
                      <br />
                      <span className="text-amber-400">Brighter Tomorrows</span>
                    </p>
                  </div>
                </div>

                {/* Image 1: Bottom Left Overlay Card — in front, offset lower-left */}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT SIDE (5 cols): Contact Form with Airplane Trail Asset */}
          <ScrollReveal className="lg:col-span-5 relative" direction="right">
            {/* Top Right Script Text & Plane Loop Image */}
            <div className="absolute -top-30 right-20 flex items-center gap-2 pointer-events-none z-20">
              <div className="text-right transform -rotate-[30deg]">
                <p
                  className={` ${caveat.className} text-lg max-w-[140px] sm:text-3xl font-extrabold text-amber-400 leading-tight`}
                >
                  {contactData.scriptTexts.planAdventure}
                </p>
                <div className="w-full h-0.5 bg-amber-400 border-b border-amber-400 border-dashed mt-0.5" />
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-[#080d1a] border border-gray-600 rounded-3xl p-6 sm:p-8 shadow-2xl relative mt-10 lg:mt-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                {contactData.form.title.normal}{" "}
                <span className="text-amber-400">
                  {contactData.form.title.highlighted}
                </span>
              </h3>
              <div className="w-14 h-1 bg-amber-400 rounded-full mb-3" />
              <p className="text-slate-400 text-xs mb-6">
                {contactData.form.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full bg-[#05060a] border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#05060a] border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-[#05060a] border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-[#05060a] border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      {contactData.form.subjects.map((subj, idx) => (
                        <option key={idx} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Your Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#05060a] border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full sm:w-auto self-start bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all text-xs"
                >
                  <span>{contactData.form.buttonLabel}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FEATURE CARDS BAR */}
      <section className="relative mx-auto w-full mt-6 py-5 bg-[#070b14] max-w-[1200px] border-gray-600 border rounded-2xl mb-10">
        <div className=" mx-auto px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {contactData.features.map((item, i) => (
                <ScrollReveal
                  key={item.id}
                  className="  border-r-1 border-gray-800 p-1 flex  gap-1"
                  direction="up"
                  index={i}
                  staggerChildren={0.08}
                >
                  <div className="h-10 sm:w-14 sm:h-14 w-10 rounded-full bg-amber-gray-800 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="ml-2">
                    <h4 className="font-bold text-amber-300 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-[12px] max-w-[125px] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="lg:col-span-3 flex items-center justify-center lg:justify-end relative">
              <div className="relative w-[180px] h-[100px]">
                <Image
                  src={contactData.images.mountainOnly}
                  alt="Mountain"
                  fill
                  className="object-contain"
                />
                <div className="absolute -rotate-12 inset-0 flex flex-col items-center justify-center transform ">
                  <p className={` ${caveat.className} text-lg max-w-[110px] sm:text-3xl  text-white leading-tight`}>
                    {contactData.scriptTexts.exploreWorld}
                  </p>
                  <div className="w-24 h-0.5 bg-amber-400 border-b border-amber-400 border-dashed" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

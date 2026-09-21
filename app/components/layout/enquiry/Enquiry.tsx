"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Users,
  MapPin,
  Calendar,
  Tag,
  Briefcase,
  MessageSquare,
  Headphones,
  ShieldCheck,
  ArrowRight,
  CalendarRange,
} from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type TravelEnquiryData } from "@/data";

export default function Enquiry() {
  const enquiryData: TravelEnquiryData = site.enquiry;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travellers: "",
    destination: "",
    travelDate: "",
    tourType: "",
    budget: "",
    message: "",
    agreed: false,
  });

  if (!enquiryData) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry Form Submitted:", formData);
  };

  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "Headphones":
        return <Headphones className="h-5 w-5 md:h-7 md:w-7 text-amber-400" />;
      case "Tag":
        return <Tag className="h-5 w-5 md:h-7 md:w-7 text-amber-400" />;
      case "Calendar":
        return <Calendar className="h-5 w-5 md:h-7 md:w-7 text-amber-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 md:h-7 md:w-7 text-amber-400" />;
      default:
        return <Headphones className="h-5 w-5 md:h-7 md:w-7 text-amber-400" />;
    }
  };

  const renderContactIcon = (iconName: string) => {
    switch (iconName) {
      case "Phone":
        return <Phone className="h-5 w-5 md:w-6 md:h-6 text-slate-950" />;
      case "Mail":
        return <Mail className="h-5 w-5 md:w-6 md:h-6 text-slate-950" />;
      case "MapPin":
        return <MapPin className="h-5 w-5 md:w-6 md:h-6 text-slate-950" />;
      default:
        return <Phone className="h-5 w-5 md:w-6 md:h-6 text-slate-950" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#00171f] text-white font-sans overflow-hidden">
      {/* 1. TOP BANNER */}
      {enquiryData.banner && (
        <Banner
          title={enquiryData.banner.title}
          highlightedTitle={enquiryData.banner.highlightedTitle}
          backgroundImage={enquiryData.banner.backgroundImage}
          breadcrumbItems={enquiryData.banner.breadcrumbItems as any}
        />
      )}

      {/* 2. MAIN ENQUIRY CONTENT */}
      <section className="relative w-full py-12 md:py-16 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  items-start">
          {/* LEFT COLUMN: WHITE FORM CARD (FIRST ON MOBILE/TABLET & DESKTOP LEFT) */}
          <ScrollReveal className="lg:col-span-7 xl:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-100" direction="left">
            {/* Form Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-1 bg-amber-400 rounded-full" />
                <span className="text-black font-bold text-sm tracking-widest uppercase">
                  {enquiryData.formHeader.eyebrow}
                </span>
              </div>
              <h2 className=" text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
                <span>{enquiryData.formHeader.title.normal}</span>{" "}
                <span className="text-amber-400">
                  {enquiryData.formHeader.title.highlighted}
                </span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base mt-2 leading-relaxed">
                {enquiryData.formHeader.subtitle}
              </p>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all item-center gap-1">
                  <User className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                  <div className="">
                    <label className="textsm font-semibold text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center ">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all item-center gap-1">
                  <Mail className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                  <div className="">
                    <label className="textsm font-semibold text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center ">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email Address"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all item-center gap-1">
                  <Phone className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                  <div className="">
                    <label className="textsm font-semibold text-slate-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center ">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Travellers */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all item-center gap-1">
                  <Users className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                  <div className="">
                    <label className="font-semibold text-slate-700">
                      Number of Travlers <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center ">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.travellers}
                        onChange={handleChange}
                        placeholder="Enter No. of Travellers"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
                  <MapPin className="h-6 w-6 text-slate-900 mt-2 mr-2.5 shrink-0" />

                  <div className="">
                    <label className=" font-semibold text-slate-700">
                      Destination <span className="text-red-500">*</span>
                    </label>

                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-xs sm:text-sm text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Where would you like to go?
                      </option>
                      <option value="bali">Bali, Indonesia</option>
                      <option value="paris">Paris, France</option>
                      <option value="tokyo">Tokyo, Japan</option>
                      <option value="dubai">Dubai, UAE</option>
                      <option value="swiss">Swiss Alps, Switzerland</option>
                      <option value="maldives">Maldives</option>
                    </select>
                  </div>
                </div>

                {/* Travel Date */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all item-center gap-1">
                  <CalendarRange className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                  <div className="">
                    <label className="textsm font-semibold text-slate-700">
                      Travel Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center ">
                      <input
                        type="date"
                        name="fullName"
                        value={formData.travelDate}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Tour Type */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all gap-1">
                  <Tag className="h-6 w-6 text-slate-900 mr-2.5 mt-2 shrink-0" />

                  <div className=" items-center ">
                    <label className=" font-semibold text-slate-700">
                      Tour Type
                    </label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs sm:text-sm text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select tour type
                      </option>
                      <option value="family">Family Package</option>
                      <option value="honeymoon">Honeymoon Special</option>
                      <option value="adventure">Adventure & Trekking</option>
                      <option value="luxury">Luxury Cruise</option>
                      <option value="custom">Custom Itinerary</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all gap-1">
                  <Briefcase className="h-6 w-6 text-slate-900 mr-2.5 mt-2 shrink-0" />

                  <div className=" items-center ">
                    <label className=" font-semibold text-slate-700">
                      Budget (Optional)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs sm:text-sm text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select your budget
                      </option>
                      <option value="1000">$500 - $1,000</option>
                      <option value="2500">$1,000 - $2,500</option>
                      <option value="5000">$2,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="flex bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-amber-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/20 transition-all gap-1 pt-1">
                <MessageSquare className="h-6 w-6 mt-2 text-slate-900 mr-2.5 shrink-0" />

                <div className=" items-start ">
                  <label className=" font-semibold text-slate-700">
                    Your Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your requirements, special requests, etc."
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <label
                  htmlFor="agreed"
                  className="text-sm text-slate-600 leading-tight"
                >
                  I agree to be contacted by Wanderly and accept the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-500 hover:underline font-semibold"
                  >
                    privacy policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 bg-amber-300 hover:bg-amber-500 text-slate-950 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all duration-200 text-sm sm:text-base cursor-pointer"
              >
                <span>Submit Enquiry</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </ScrollReveal>

          {/* RIGHT COLUMN: INFO SIDEBAR (BELOW ON MOBILE/TABLET & DESKTOP RIGHT) */}
          <ScrollReveal className="lg:col-span-5 xl:col-span-5 space-y-8" direction="right">
            {/* Why Enquire With Us */}
            <div className="border-2 border-gray-700 rounded-xl py-3 px-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-1 bg-amber-300 rounded-full" />
                <h3 className=" text-xl sm:text-3xl font-bold text-white">
                  {enquiryData.whyEnquire.title}
                </h3>
              </div>

              <div className="space-y-5 mt-6">
                {enquiryData.whyEnquire.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-11 md:w-16 md:h-16 w-11 rounded-full border-2 border-amber-300/80 bg-[#00171f] flex items-center justify-center shrink-0 shadow-md">
                      {renderFeatureIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-lg leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-white text-md mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card Box */}
            <div className="border-2 border-slate-700 bg-[#041c24] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-1 bg-amber-300 rounded-full" />
                <h3 className=" text-xl md:text-3xl font-bold text-white">
                  {enquiryData.needHelp.title}
                </h3>
              </div>
              <p className="text-white text-sm md:text-base mb-6">
                {enquiryData.needHelp.subtitle}
              </p>

              <div className="space-y-4">
                {enquiryData.needHelp.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3.5">
                    <div className="h-10 md:w-14 md:h-14 w-10 rounded-full bg-amber-300 flex items-center justify-center shrink-0 shadow-md">
                      {renderContactIcon(contact.icon)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs sm:text-lg">
                        {contact.title}
                      </p>
                      <p className="text-white text-sm md:text-md">
                        {contact.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Image as ImageIcon,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";

type TourItineraryItem = { day: string; title: string; description: string };
type TourFaq = { question: string; answer: string };

type TourDetails = {
  gallery: string[];
  overview: string;
  difficulty: string;
  highlights: string[];
  itinerary: TourItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  faqs: TourFaq[];
};

type PackageItem = {
  title: string;
  description: string;
  tourType: string;
  destination: string;
  duration: string;
  rating: number | string;
  reviews: number | string;
  price: number | string;
  priceUnit: string;
  image: string;
};

const TABS = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "itinerary", label: "Itinerary", icon: CalendarDays },
  { id: "inclusions", label: "Inclusions", icon: CheckCircle2 },
  { id: "exclusions", label: "Exclusions", icon: XCircle },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "faqs", label: "FAQs", icon: MessageSquare },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PackageDetailClient({
  packageItem,
  tour,
}: {
  packageItem: PackageItem;
  tour: TourDetails;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + tour.gallery.length) % tour.gallery.length,
    );
  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % tour.gallery.length,
    );

  // keyboard nav + scroll lock while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) showPrev();
    else if (delta < -50) showNext();
    touchStartX.current = null;
  };

  const visibleThumbs = tour.gallery.slice(0, 4);
  const extraCount = tour.gallery.length - visibleThumbs.length;

  return (
    <div className="grid gap-4 ">
      <div className="min-w-0 ">
        {/*  Title / price row  */}
        <div className="mb-0 grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] ">
          <div className="max-w-[600px]">
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              {packageItem.title}
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-white">
              {packageItem.description} {tour.overview}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-300 sm:grid-cols-4">
              <InfoItem
                icon={<MapPin />}
                label="Destination"
                value={packageItem.destination}
              />
              <InfoItem
                icon={<CalendarDays />}
                label="Duration"
                value={packageItem.duration}
              />
              <InfoItem
                icon={<Users />}
                label="Tour Type"
                value={packageItem.tourType}
              />
              <InfoItem
                icon={<Star />}
                label="Customer Rating"
                value={`${packageItem.rating} (${packageItem.reviews})`}
              />
            </div>
          </div>

          <aside className="rounded-xl md:relative sm:w-[400px] md:w-full md:right-0 md:top-8 sticky top-0 border-2 border-cyan-900 bg-[#001820] py-5 px-10 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
            <p className="text-sm text-slate-300">Starting From</p>
            <p className="mt-1 text-3xl font-bold text-amber-400">
              ${packageItem.price}
              <span className="ml-1 text-sm font-normal text-slate-300">
                {packageItem.priceUnit}
              </span>
            </p>
            <a
              href="/enquiry"
              className="mt-5 flex items-center justify-center gap-2 rounded bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <Benefit icon={<ShieldCheck />} text="Best Price Guarantee" />
              <Benefit
                icon={<CircleDollarSign />}
                text="Easy Booking Process"
              />
              <Benefit icon={<Phone />} text="24/7 Customer Support" />
            </div>
          </aside>
        </div>
        {/*  Gallery hero + thumbnails  */}
        <div className="mb-7 mt-10 md:mt-0 md:max-w-[840px] grid gap-5 md:grid-cols-[minmax(0,1fr)_140px]">
          <button
            type="button"
            onClick={() => openLightbox(activeImage)}
            className="group relative h-65 overflow-hidden rounded-lg border border-cyan-900/80 sm:h-97.5"
          >
            <Image
              src={tour.gallery[activeImage] ?? packageItem.image}
              alt={packageItem.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            <span className="absolute bottom-4 left-4 rounded bg-[#001820]/90 px-3 py-2 text-sm font-bold text-white">
              <span className="mr-2 text-amber-400">▧</span>
              {activeImage + 1} / {tour.gallery.length}
            </span>
          </button>

          <div className="grid grid-cols-4 gap-2 md:grid-cols-1">
            {visibleThumbs.map((image, index) => {
              const isLastSlot = index === visibleThumbs.length - 1;
              if (isLastSlot && extraCount > 0) {
                return (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setActiveTab("gallery")}
                    className="relative h-20 overflow-hidden rounded border-2 border-cyan-900 sm:h-22.5"
                  >
                    <Image
                      src={image}
                      alt={`${packageItem.title} view ${index + 1}`}
                      fill
                      className="object-cover opacity-50"
                      sizes="140px"
                    />
                    <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-xs font-bold text-white">
                      +{extraCount}
                      <span className="font-normal">More Photos</span>
                    </span>
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show photo ${index + 1}`}
                  className={`relative h-20 overflow-hidden rounded border-2 transition-colors sm:h-22.5 ${
                    index === activeImage
                      ? "border-amber-400"
                      : "border-cyan-900 hover:border-amber-400/60"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${packageItem.title} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <nav
          className="my-12 grid grid-cols-2 border-b border-cyan-900 sm:grid-cols-3 lg:grid-cols-6"
          aria-label="Tour detail sections"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className={`flex items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-bold transition-colors ${
                activeTab === id
                  ? "border-amber-400 bg-amber-400 text-slate-950"
                  : "border-transparent text-slate-300 hover:border-amber-400 hover:text-amber-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* ---------------- Tab panels (only the active one renders) ---------------- */}
        {activeTab === "overview" && (
          <div className="space-y-10  md:flex md:justify-between ">
            <div className="md:max-w-[780px]">
              <section id="overview" className="scroll-mt-8">
                <SectionHeading>Overview</SectionHeading>
                <p className="max-w-3xl leading-relaxed text-white">
                  {tour.overview} With experienced local hosts, comfortable
                  accommodation and a thoughtfully paced route, this package
                  makes it easy to enjoy the destination with confidence.
                </p> <br />
                <p className="max-w-3xl leading-relaxed text-white">
                  {tour.overview} With experienced local hosts, comfortable
                  accommodation and a thoughtfully paced route, this package
                  makes it easy to enjoy the destination with confidence.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <InfoCard
                    icon={<MapPin />}
                    label="Destination"
                    value={packageItem.destination}
                  />
                  <InfoCard
                    icon={<Clock3 />}
                    label="Duration"
                    value={packageItem.duration}
                  />
                  <InfoCard
                    icon={<Users />}
                    label="Tour Type"
                    value={packageItem.tourType}
                  />
                  <InfoCard
                    icon={<Star />}
                    label="Difficulty"
                    value={tour.difficulty}
                  />
                </div>
              </section>

              <section id="overview" className="scroll mt-8">
                <SectionHeading>Tour Highlights</SectionHeading>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {tour.highlights.map((highlight, index) => (
                    <InfoCard
                      key={highlight}
                      icon={
                        [
                          <Star key="star" />,
                          <CircleDollarSign key="circle" />,
                          <Users key="users" />,
                          <ShieldCheck key="shield" />,
                        ][index % 4]
                      }
                      label={highlight}
                      value="Included"
                    />
                  ))}
                </div>
              </section>
            </div>
            <div>
              <aside className="h-fit rounded-xl border-1  md:w-[340px] border-cyan-900 bg-[#001820] p-5 lg:sticky lg:top-24">
                <SectionHeading>Quick Enquiry</SectionHeading>
                <p className="mb-5 text-sm text-slate-400">
                  Get a free quote for this tour package.
                </p>
                <form className="space-y-1.5" action="/enquiry">
                  <FormField
                    icon={<User />}
                    name="name"
                    placeholder="Your Name"
                  />
                  <FormField
                    icon={<Mail />}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                  <FormField
                    icon={<Phone />}
                    name="phone"
                    placeholder="Your Phone"
                  />
                  <FormField icon={<CalendarDays />} name="date" type="date" />
                  <FormField
                    icon={<Users />}
                    name="travellers"
                    type="number"
                    min="1"
                    placeholder="Number of Travellers"
                  />
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-3.5 text-slate-500 [&>svg]:h-4 [&>svg]:w-4">
                      <MessageSquare />
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Your Message (Optional)"
                      className="w-full rounded  border-cyan-900 bg-[#011014] py-3 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300"
                  >
                    Send Enquiry <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5" /> Your information is safe with
                  us.
                </p>
              </aside>
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <section id="itinerary" className="scroll-mt-8">
            <SectionHeading>Detailed Itinerary</SectionHeading>
            <div className="space-y-3">
              {tour.itinerary.map((item, index) => (
                <div key={item.day} className="flex gap-3">
                  <div className="relative flex w-14 shrink-0 justify-center">
                    <span className="z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">
                      {item.day}
                    </span>
                    {index !== tour.itinerary.length - 1 && (
                      <span className="absolute top-11 bottom-[-12px] w-px bg-cyan-800" />
                    )}
                  </div>
                  <div className="flex-1 rounded-lg border border-cyan-900 bg-[#001820] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold">{item.title}</h3>
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "inclusions" && (
          <section
            id="inclusions"
            className="scroll-mt-8 rounded-xl border border-cyan-900 bg-[#001820] p-5"
          >
            <SectionHeading>Inclusions</SectionHeading>
            <ListItems items={tour.inclusions} positive />
          </section>
        )}

        {activeTab === "exclusions" && (
          <section
            id="exclusions"
            className="scroll-mt-8 rounded-xl border border-cyan-900 bg-[#001820] p-5"
          >
            <SectionHeading>Exclusions</SectionHeading>
            <ListItems items={tour.exclusions} />
          </section>
        )}

        {activeTab === "gallery" && (
          <section id="gallery" className="scroll-mt-8">
            <SectionHeading>Gallery</SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tour.gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-4/3 overflow-hidden rounded-lg"
                >
                  <Image
                    src={image}
                    alt={`${packageItem.title} gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {activeTab === "faqs" && (
          <section id="faqs" className="scroll-mt-8">
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div className="space-y-3">
              {tour.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-cyan-900 bg-[#001820] p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 rounded-full bg-[#001820]/90 p-2 text-white transition-colors hover:bg-amber-400 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#001820]/90 p-2 text-white transition-colors hover:bg-amber-400 hover:text-slate-950 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={tour.gallery[lightboxIndex]}
              alt={`${packageItem.title} gallery ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#001820]/90 p-2 text-white transition-colors hover:bg-amber-400 hover:text-slate-950 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded bg-[#001820]/90 px-3 py-1.5 text-sm font-bold text-white">
            {lightboxIndex + 1} / {tour.gallery.length}
          </span>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
      <span className="h-1 w-10 rounded-full bg-amber-400" />
      {children}
    </h2>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="flex min-w-0  gap-2">
      <span className="text-amber-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <span className="min-w-0">
        <strong className="block text-base text-white">{value}</strong>
        <small className="text-white text-sm">{label}</small>
      </span>
    </span>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg flex gap-2 border-2 border-cyan-900 bg-[#001820] p-3 ">
      <span className="mt-2 block w-fit text-amber-400 [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
      <div>
      <strong className="block font-semibold text-base text-white">{value}</strong>
      <small className="mt-0 font-semibold block text-sm text-white">{label}</small>
      </div>
    </div>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-amber-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      {text}
    </span>
  );
}

function ListItems({
  items,
  positive = false,
}: {
  items: string[];
  positive?: boolean;
}) {
  return (
    <ul className="space-y-3 text-sm text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className={positive ? "text-amber-400" : "text-orange-500"}>
            {positive ? (
              <Check className="mt-0.5 h-4 w-4" />
            ) : (
              <X className="mt-0.5 h-4 w-4" />
            )}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function FormField({
  icon,
  className = "",
  ...props
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <input
        {...props}
        className={`w-full rounded  border-cyan-900 bg-[#011014] py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400 ${className}`}
      />
    </div>
  );
}

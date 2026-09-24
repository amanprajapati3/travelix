"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  ZoomIn,
  Video,
  Clock,
} from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type TravelGalleryData } from "@/data";

const SLIDER_GAP = 16;

type VideoSource =
  | { kind: "iframe"; provider: string; embedUrl: string }
  | { kind: "file"; src: string };

/**
 * Normalizes any video URL (YouTube, Vimeo, direct file link, or a generic
 * embeddable URL) into something the player can render.
 */
function resolveVideoSource(rawUrl: string): VideoSource {
  const url = (rawUrl || "").trim().replace(/^h+ttps?:\/\//i, "https://");

  if (!url) return { kind: "file", src: rawUrl };

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { kind: "file", src: rawUrl };
  }

  const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
  const path = parsed.pathname;

  // youtu.be/<id>
  if (host === "youtu.be") {
    const id = path.split("/").filter(Boolean)[0];
    if (id) {
      return {
        kind: "iframe",
        provider: "youtube",
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      };
    }
  }

  // youtube.com/watch?v=<id> | /embed/<id> | /live/<id> | /shorts/<id> | /v/<id>
  if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    let id = parsed.searchParams.get("v") || "";
    if (!id) {
      const match = path.match(/\/(?:embed|live|shorts|v)\/([^/?#]+)/);
      if (match) id = match[1];
    }
    if (id) {
      return {
        kind: "iframe",
        provider: "youtube",
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      };
    }
  }

  // vimeo.com/<id>
  if (host.endsWith("vimeo.com")) {
    const match = path.match(/\/(\d+)/);
    if (match) {
      return {
        kind: "iframe",
        provider: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${match[1]}?autoplay=1`,
      };
    }
  }

  // dailymotion.com/video/<id>
  if (host.endsWith("dailymotion.com") || host.endsWith("dai.ly")) {
    const match = path.match(/(?:\/video\/|\/)([a-zA-Z0-9]+)/);
    if (match) {
      return {
        kind: "iframe",
        provider: "dailymotion",
        embedUrl: `https://www.dailymotion.com/embed/video/${match[1]}?autoplay=1`,
      };
    }
  }

  // Direct media files (local / remote)
  if (/\.(mp4|m4v|mov|webm|ogv|ogg|avi|mkv)(\?.*)?$/i.test(url)) {
    return { kind: "file", src: url };
  }

  // Fallback: treat as a generic embeddable URL
  return { kind: "iframe", provider: "embed", embedUrl: url };
}

function VideoPlayer({ src, title }: { src: string; title?: string }) {
  const source = resolveVideoSource(src);

  if (source.kind === "file") {
    return (
      <video
        key={source.src}
        src={source.src}
        controls
        autoPlay
        playsInline
        className="h-full w-full object-contain"
      />
    );
  }

  return (
    <iframe
      key={source.embedUrl}
      src={source.embedUrl}
      title={title || "Video player"}
      className="h-full w-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export default function Gallery() {
  const galleryData: TravelGalleryData = site.gallery;

  const imageSliderRef = useRef<HTMLDivElement>(null);
  const videoSliderRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeImageDot, setActiveImageDot] = useState(0);
  const [activeVideoDot, setActiveVideoDot] = useState(0);

  const images = galleryData?.imageSection?.images ?? [];
  const videos = galleryData?.videoSection?.videos ?? [];

  const INITIAL_VISIBLE_IMAGES = Math.ceil(images.length / 2);
  const INITIAL_VISIBLE_VIDEOS = Math.ceil(videos.length / 2);
  const IMAGE_LOAD_STEP = 4;

  const [visibleImageCount, setVisibleImageCount] = useState(
    INITIAL_VISIBLE_IMAGES,
  );
  const [visibleVideoCount, setVisibleVideoCount] = useState(
    INITIAL_VISIBLE_VIDEOS,
  );

  const displayedImages = images.slice(0, visibleImageCount);
  const displayedVideos = videos.slice(0, visibleVideoCount);

  const handleLoadMoreImages = () => {
    setVisibleImageCount((cur) =>
      Math.min(cur + IMAGE_LOAD_STEP, images.length),
    );
  };

  const handleLoadMoreVideos = () => {
    setVisibleVideoCount(videos.length);
  };

  const handleViewLessImages = () => {
    setVisibleImageCount(INITIAL_VISIBLE_IMAGES);
  };

  const handleViewLessVideos = () => {
    setVisibleVideoCount(INITIAL_VISIBLE_VIDEOS);
  };

  const showPrevImage = useCallback(() => {
    setLightboxIndex((cur) =>
      cur === null ? cur : (cur - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((cur) => (cur === null ? cur : (cur + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null && activeVideo === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setActiveVideo(null);
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, activeVideo, showNextImage, showPrevImage]);

  useEffect(() => {
    if (lightboxIndex !== null || activeVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, activeVideo]);

  const getSliderItemWidth = (slider: HTMLDivElement | null) => {
    const child = slider?.querySelector(":scope > *");
    return child ? child.clientWidth : (slider?.clientWidth ?? 0);
  };

  const handleImageScroll = useCallback(() => {
    const slider = imageSliderRef.current;
    if (!slider) return;
    const itemWidth = getSliderItemWidth(slider);
    if (!itemWidth) return;
    const index = Math.round(slider.scrollLeft / (itemWidth + SLIDER_GAP));
    setActiveImageDot(Math.min(Math.max(index, 0), displayedImages.length - 1));
  }, [displayedImages.length]);

  const handleVideoScroll = useCallback(() => {
    const slider = videoSliderRef.current;
    if (!slider) return;
    const itemWidth = getSliderItemWidth(slider);
    if (!itemWidth) return;
    const index = Math.round(slider.scrollLeft / (itemWidth + SLIDER_GAP));
    setActiveVideoDot(Math.min(Math.max(index, 0), displayedVideos.length - 1));
  }, [displayedVideos.length]);

  const scrollSliderTo = (
    slider: React.RefObject<HTMLDivElement | null>,
    index: number,
  ) => {
    const el = slider.current;
    if (!el) return;
    const itemWidth = getSliderItemWidth(el);
    el.scrollTo({
      left: index * (itemWidth + SLIDER_GAP),
      behavior: "smooth",
    });
  };

  if (!galleryData) return null;

  const { banner, imageSection, videoSection } = galleryData;

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden font-sans">
      {/* 1. REUSABLE TOP BANNER */}
      {banner && (
        <Banner
          title={banner.title}
          highlightedTitle={banner.highlightedTitle}
          backgroundImage={banner.backgroundImage}
          breadcrumbItems={banner.breadcrumbItems}
        />
      )}

      {/* 2. IMAGE GALLERY SECTION */}
      <section className="relative w-full pt-12 sm:pt-16 pb-4 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1400px] mx-auto">
        {/* HEADING (same style as partners page) */}
        <ScrollReveal
          className="relative z-10 mb-8 text-center max-w-3xl mx-auto"
          direction="up"
        >
          <p className="text-amber-400 font-bold text-md tracking-widest uppercase mb-0">
            {imageSection.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-1">
            <span className="text-white">{imageSection.title.normal}</span>{" "}
            <span className="text-amber-300">
              {imageSection.title.highlighted}
            </span>
          </h2>
          <div className="mx-auto bg-amber-300 w-[90px] h-1 my-2"></div>
          <p className="text-white text-md leading-relaxed max-w-2xl mx-auto">
            {imageSection.subtitle}
          </p>
        </ScrollReveal>

        {/* IMAGE GRID / MOBILE SLIDER */}
        <div
          ref={imageSliderRef}
          onScroll={handleImageScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none"
        >
          {displayedImages.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative w-full sm:w-auto shrink-0 snap-start overflow-hidden rounded-xl bg-[#071116] border border-white/5 hover:border-amber-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              aria-label={`View ${img.alt}`}
            >
              <ScrollReveal
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                direction="up"
                index={index}
                staggerChildren={0.05}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-12 w-12 rounded-full bg-amber-400 text-[#011014] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>

                {/* Caption on hover */}
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-semibold text-white">
                      {img.caption}
                    </p>
                  </div>
                )}
              </ScrollReveal>
            </button>
          ))}
        </div>

        {/* PAGINATION DOTS (mobile only) */}
        <div className="sm:hidden flex justify-center gap-2 mt-6">
          {displayedImages.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => scrollSliderTo(imageSliderRef, index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeImageDot
                  ? "w-8 bg-amber-400"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* LOAD MORE / VIEW LESS IMAGES */}
        {images.length > INITIAL_VISIBLE_IMAGES && (
          <div className="mt-8 hidden sm:flex justify-center">
            {visibleImageCount < images.length ? (
              <button
                type="button"
                onClick={handleLoadMoreImages}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold text-[#011014] shadow-xl transition-all duration-300 hover:bg-[#eab308] focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span className="tracking-wider">Load More</span>
                <div className="flex h-9 w-9  items-center justify-center rounded-full bg-[#011014] text-[#facc15] transition-transform duration-300 group-hover:translate-y-1">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleViewLessImages}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold text-[#011014] shadow-xl transition-all duration-300 hover:bg-[#eab308] focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span className="tracking-wider">View Less</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#011014] text-[#facc15] transition-transform duration-300 group-hover:-translate-y-1">
                  <ChevronUp className="h-4 w-4" />
                </div>
              </button>
            )}
          </div>
        )}
      </section>

      {/* 3. VIDEO GALLERY SECTION */}
      <section className="relative w-full pt-10 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1400px] mx-auto border-t border-white/5 mt-8">
        {/* HEADING */}
        <ScrollReveal
          className="relative z-10 mb-8 text-center max-w-3xl mx-auto"
          direction="up"
        >
          <p className="text-amber-400 font-bold text-md tracking-widest uppercase mb-0">
            {videoSection.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-1">
            <span className="text-white">{videoSection.title.normal}</span>{" "}
            <span className="text-amber-300">
              {videoSection.title.highlighted}
            </span>
          </h2>
          <div className="mx-auto bg-amber-300 w-[90px] h-1 my-2"></div>
          <p className="text-white text-md leading-relaxed max-w-2xl mx-auto">
            {videoSection.subtitle}
          </p>
        </ScrollReveal>

        {/* VIDEO GRID / MOBILE SLIDER */}
        <div
          ref={videoSliderRef}
          onScroll={handleVideoScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none"
        >
          {displayedVideos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveVideo(index)}
              className="group relative w-full sm:w-auto shrink-0 snap-start overflow-hidden rounded-xl bg-[#071116] border border-white/5 hover:border-amber-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              aria-label={`Play ${video.title || `video ${index + 1}`}`}
            >
              <ScrollReveal
                className="relative aspect-video w-full overflow-hidden rounded-xl"
                direction="up"
                index={index}
                staggerChildren={0.05}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title || `Video ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14  rounded-full backdrop-blur-xl text-amber-300 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-current" />
                  </div>
                </div>

                {/* Video label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-white truncate">
                    <Video className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    {video.title || `Video ${index + 1}`}
                  </span>
                  {video.duration && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/50 rounded-full px-2 py-0.5 shrink-0">
                      <Clock className="h-3 w-3 text-amber-400" />
                      {video.duration}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            </button>
          ))}
        </div>

        {/* PAGINATION DOTS (mobile only) */}
        <div className="sm:hidden flex justify-center gap-2 mt-6">
          {displayedVideos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => scrollSliderTo(videoSliderRef, index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeVideoDot
                  ? "w-8 bg-amber-400"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* LOAD MORE / VIEW LESS VIDEOS */}
        {videos.length > INITIAL_VISIBLE_VIDEOS && (
          <div className="mt-8 hidden sm:flex justify-center">
            {visibleVideoCount < videos.length ? (
              <button
                type="button"
                onClick={handleLoadMoreVideos}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold text-[#011014] shadow-xl transition-all duration-300 hover:bg-[#eab308] focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span className="tracking-wider">Load More</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#011014] text-[#facc15] transition-transform duration-300 group-hover:translate-y-1">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleViewLessVideos}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold text-[#011014] shadow-xl transition-all duration-300 hover:bg-[#eab308] focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span className="tracking-wider">View Less</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#011014] text-[#facc15] transition-transform duration-300 group-hover:-translate-y-1">
                  <ChevronUp className="h-4 w-4" />
                </div>
              </button>
            )}
          </div>
        )}
      </section>

      {/* 4. IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#011014] flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
            className="absolute left-2 sm:left-5 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#011014] flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[92vw] sm:max-w-[85vw] max-h-[85vh] w-auto overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh]">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={1600}
                height={1200}
                sizes="(min-width: 640px) 85vw, 92vw"
                className="w-auto max-w-[92vw] sm:max-w-[85vw] h-auto max-h-[75vh] object-contain"
              />
            </div>
            {images[lightboxIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-lg font-semibold text-white">
                  {images[lightboxIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            className="absolute right-2 sm:right-5 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#011014] flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80 bg-white/10 rounded-full px-4 py-1.5">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* 5. VIDEO MODAL */}
      {activeVideo !== null && videos[activeVideo] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#011014] flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="w-full max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <VideoPlayer
                src={videos[activeVideo].videoSrc}
                title={videos[activeVideo].title}
              />
            </div>
            <p className="mt-3 text-center text-lg font-semibold text-white">
              {videos[activeVideo].title}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

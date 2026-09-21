"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Heart,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import Banner from "../../shared/Banner";
import CtaBanner from "../../shared/CtaBanner";
import ScrollReveal from "../../shared/ScrollReveal";
import { getPackageFilters, site, type TravelPackageItem, type TravelPackagesData } from "@/data";

const pageSize = 6;
const packagesData: TravelPackagesData = site.packages;
const filterOptions = getPackageFilters();

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

// Collapsible Filter Section Component with smooth transition
function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-cyan-900/60 pt-4">
      <button
        type="button"
        onClick={onToggle}
        className="mb-3 flex cursor-pointer w-full items-center justify-between text-base font-bold text-white focus:outline-none"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden pb-1">{children}</div>
      </div>
    </fieldset>
  );
}

export default function Package() {
  const [query, setQuery] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Accordion state for each filter section
  const [isDestinationOpen, setIsDestinationOpen] = useState(true);
  const [isTourTypesOpen, setIsTourTypesOpen] = useState(true);
  const [isDurationsOpen, setIsDurationsOpen] = useState(true);

  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = packagesData.packages.filter((pkg) => {
      const searchable =
        `${pkg.title} ${pkg.location} ${pkg.destination} ${pkg.tourType}`.toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!selectedDestinations.length ||
          selectedDestinations.includes(pkg.destination)) &&
        (!selectedTypes.length || selectedTypes.includes(pkg.tourType)) &&
        (!selectedDurations.length ||
          selectedDurations.includes(pkg.durationGroup))
      );
    });

    return [...result].sort((first, second) => {
      if (sortBy === "Price: Low to High")
        return Number(first.price) - Number(second.price);
      if (sortBy === "Price: High to Low")
        return Number(second.price) - Number(first.price);
      if (sortBy === "Rating")
        return Number(second.rating) - Number(first.rating);
      return (
        Number(second.rating) - Number(first.rating) ||
        second.reviews - first.reviews
      );
    });
  }, [query, selectedDestinations, selectedTypes, selectedDurations, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / pageSize));
  const visiblePackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const rangeStart = filteredPackages.length
    ? (currentPage - 1) * pageSize + 1
    : 0;
  const rangeEnd = Math.min(currentPage * pageSize, filteredPackages.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedDestinations, selectedTypes, selectedDurations, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setSelectedDestinations([]);
    setSelectedTypes([]);
    setSelectedDurations([]);
    setSortBy("Popularity");
  };

  const renderCard = (pkg: TravelPackageItem, index: number = 0) => {
    const isFavorite = favorites.includes(pkg.id);
    return (
      <ScrollReveal
        key={pkg.id}
        className={`group overflow-hidden rounded-xl border border-cyan-900/70 bg-[#001820] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 ${layout === "list" ? "sm:flex" : ""}`}
        direction="up"
        index={index}
        staggerChildren={0.06}
      >
        <div
          className={`relative overflow-hidden ${layout === "list" ? "sm:w-[38%]" : "h-[180px] sm:h-[190px]"}`}
        >
          <Link href={`/package/${pkg.slug}`} aria-label={`View ${pkg.title}`}>
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              sizes={
                layout === "list"
                  ? "(max-width: 640px) 100vw, 38vw"
                  : "(max-width: 640px) 100vw, 33vw"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <span className="absolute bottom-3 left-3 rounded bg-emerald-600 px-2 py-1 text-sm font-bold text-white shadow-lg">
            ${pkg.price}
            {pkg.priceUnit}
          </span>
          <button
            type="button"
            onClick={() =>
              setFavorites((current) =>
                isFavorite
                  ? current.filter((id) => id !== pkg.id)
                  : [...current, pkg.id],
              )
            }
            aria-label={`${isFavorite ? "Remove" : "Add"} ${pkg.title} ${isFavorite ? "from" : "to"} favorites`}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors ${isFavorite ? "text-rose-500" : "text-slate-800 hover:text-rose-500"}`}
          >
            <Heart
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-3.5">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-400" />
              {pkg.location}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-amber-400" />
              {pkg.duration}
            </span>
          </div>
          <Link
            href={`/package/${pkg.slug}`}
            className="line-clamp-1 text-lg font-bold text-white transition-colors hover:text-amber-400"
          >
            {pkg.title}
          </Link>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {pkg.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <span className="flex items-center gap-1 text-sm text-amber-300">
              <Star className="h-3 w-3 fill-amber-300" /> {pkg.rating}{" "}
              <span className="text-slate-500">({pkg.reviews} reviews)</span>
            </span>
            <Link
              href={`/package/${pkg.slug}`}
              className="rounded bg-amber-400 px-3 py-1.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
            >
              Book Now <ChevronRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    );
  };

  const renderPagination = () => (
    <nav
      className="flex items-center justify-center gap-1.5 pt-5"
      aria-label="Tour pagination"
    >
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded border border-cyan-900 text-slate-300 transition-colors hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`h-8 min-w-8 rounded border px-2 text-sm font-bold transition-colors ${currentPage === page ? "border-amber-400 bg-amber-400 text-slate-950" : "border-cyan-900 text-slate-300 hover:border-amber-400"}`}
            aria-label={`Page ${page}`}
          >
            {String(page).padStart(2, "0")}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded border border-cyan-900 text-slate-300 transition-colors hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      {packagesData.banner && <Banner {...packagesData.banner} />}
      <section className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-5 flex flex-col gap-4 lg:hidden">
          <div className="flex items-center gap-2 text-base font-bold">
            <SlidersHorizontal className="h-4 w-4 text-amber-400" /> Filter
            tours
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <select
              value={selectedDestinations[0] ?? ""}
              onChange={(event) =>
                setSelectedDestinations(
                  event.target.value ? [event.target.value] : [],
                )
              }
              className="rounded border border-cyan-900 bg-[#001820] px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
            >
              <option value="">All destinations</option>
              {filterOptions.destinations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={selectedTypes[0] ?? ""}
              onChange={(event) =>
                setSelectedTypes(event.target.value ? [event.target.value] : [])
              }
              className="rounded border border-cyan-900 bg-[#001820] px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
            >
              <option value="">All tour types</option>
              {filterOptions.tourTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={selectedDurations[0] ?? ""}
              onChange={(event) =>
                setSelectedDurations(
                  event.target.value ? [event.target.value] : [],
                )
              }
              className="rounded border border-cyan-900 bg-[#001820] px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
            >
              <option value="">All durations</option>
              {filterOptions.durations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[30%_minmax(0,70%)] xl:grid-cols-[25%_minmax(0,70%)]">
          <ScrollReveal className="hidden self-start rounded-lg border-2 border-cyan-900/80 bg-[#001820] p-3.5 lg:block" direction="left">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">Search Tour</h2>
            </div>
            <label className="mb-5 flex items-center rounded border-2 border-cyan-900 bg-[#011014] px-2.5 py-2">
              <Search className="mr-2 h-4.5 w-4.5 text-amber-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search destination, tour..."
                className="min-w-0 bg-transparent text-sm text-white outline-none"
              />
            </label>

            {/* Destination Section */}
            <FilterSection
              title="Destination"
              isOpen={isDestinationOpen}
              onToggle={() => setIsDestinationOpen(!isDestinationOpen)}
            >
              <div className="space-y-2.5">
                {filterOptions.destinations.map((option) => {
                  const count = packagesData.packages.filter(
                    (pkg) => pkg.destination === option,
                  ).length;
                  return (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(option)}
                        onChange={() =>
                          setSelectedDestinations(
                            toggleValue(selectedDestinations, option),
                          )
                        }
                        className="h-4 w-4 accent-amber-400"
                      />
                      <span className="flex-1">{option}</span>
                      <span className="text-slate-500">{count}</span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            {/* Tour Types Section */}
            <div className="mt-5">
              <FilterSection
                title="Tour Types"
                isOpen={isTourTypesOpen}
                onToggle={() => setIsTourTypesOpen(!isTourTypesOpen)}
              >
                <div className="space-y-2.5">
                  {filterOptions.tourTypes.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(option)}
                        onChange={() =>
                          setSelectedTypes(toggleValue(selectedTypes, option))
                        }
                        className="h-4 w-4 accent-amber-400"
                      />
                      <span className="flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Durations Section */}
            <div className="mt-5">
              <FilterSection
                title="Durations"
                isOpen={isDurationsOpen}
                onToggle={() => setIsDurationsOpen(!isDurationsOpen)}
              >
                <div className="space-y-2.5">
                  {filterOptions.durations.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(option)}
                        onChange={() =>
                          setSelectedDurations(
                            toggleValue(selectedDurations, option),
                          )
                        }
                        className="h-4 w-4 accent-amber-400"
                      />
                      <span className="flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 w-full rounded bg-amber-400 px-3 py-2 text-sm font-bold text-slate-950 hover:bg-amber-300"
            >
              Clear Filters
            </button>
          </ScrollReveal>
          <div className="min-w-0">
            <ScrollReveal className="mb-3 flex flex-col gap-3 rounded-lg border border-cyan-900/70 bg-[#001820] p-3 sm:flex-row sm:items-center sm:justify-between" direction="up">
              <span className="text-sm text-slate-300">
                Showing{" "}
                <strong className="text-white">
                  {rangeStart}-{rangeEnd}
                </strong>{" "}
                of{" "}
                <strong className="text-white">
                  {filteredPackages.length}
                </strong>{" "}
                tours
              </span>
              <div className="flex items-center sm:gap-2">
                <label className="flex flex-1 items-center gap-2 text-sm text-slate-400 lg:hidden">
                  <Search className="h-3.5 w-3.5 text-amber-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search tours"
                    className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
                  />
                </label>
                <span className="hidden text-sm text-slate-400 sm:inline">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded hidden sm:block border border-cyan-900 bg-[#011014] px-2.5 py-2 text-sm text-white outline-none focus:border-amber-400"
                >
                  <option>Popularity</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => setLayout("grid")}
                    className={`rounded p-2 ${layout === "grid" ? "bg-amber-400 text-slate-950" : "text-slate-400"}`}
                    aria-label="Grid layout"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("list")}
                    className={`rounded p-2 ${layout === "list" ? "bg-amber-400 text-slate-950" : "text-slate-400"}`}
                    aria-label="List layout"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
            {visiblePackages.length ? (
              <div
                className={`grid gap-3.5 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
              >
                {visiblePackages.map((pkg, i) => renderCard(pkg, i))}
              </div>
            ) : (
              <div className="rounded-lg border border-cyan-900 bg-[#001820] px-5 py-16 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-amber-400" />
                <h2 className="font-bold">No tours found</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Try a different search or clear your filters.
                </p>
              </div>
            )}
            {renderPagination()}
          </div>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}

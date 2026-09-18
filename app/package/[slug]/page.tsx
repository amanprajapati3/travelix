import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import { getPackageBySlug, getPackageSlugs, site } from "@/data";

export function generateStaticParams() {
  return getPackageSlugs().map((pkg) => ({ slug: pkg.slug }));
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const packageItem = getPackageBySlug(slug);

  if (!packageItem) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title="Tour"
        highlightedTitle="Details"
        backgroundImage={site.packages.banner?.backgroundImage ?? "/travel/mountain.png"}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Tour Packages", href: "/package" },
          { label: packageItem.title },
        ]}
      />
      <section className="mx-auto grid max-w-[1100px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-16">
        <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-cyan-900/80">
          <Image src={packageItem.image} alt={packageItem.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">{packageItem.tourType}</p>
          <h1 className="text-3xl font-bold sm:text-4xl">{packageItem.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-amber-400" />{packageItem.location}</span><span className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-amber-400" />{packageItem.duration}</span><span className="flex items-center gap-1 text-amber-300"><Star className="h-4 w-4 fill-amber-300" />{packageItem.rating} ({packageItem.reviews} reviews)</span></div>
          <p className="mt-6 leading-relaxed text-slate-300">{packageItem.description}</p>
          <div className="mt-8 flex items-center gap-5"><span className="text-3xl font-bold text-amber-400">${packageItem.price}<small className="ml-1 text-sm font-normal text-slate-400">{packageItem.priceUnit}</small></span><Link href="/enquiry" className="rounded bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300">Enquire Now</Link></div>
          <Link href="/package" className="mt-8 inline-flex items-center gap-1 text-sm text-slate-300 hover:text-amber-400"><ChevronLeft className="h-4 w-4" /> Back to all packages</Link>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import {
  getPackageBySlug,
  getPackageSlugs,
  getTourDetailsBySlug,
  site,
} from "@/data";
import PackageDetailClient from "@/app/components/layout/package/PackageDetailClient";

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
  const tour = getTourDetailsBySlug(slug);
  if (!packageItem || !tour) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title="Package"
        highlightedTitle="Detail"
        backgroundImage={
          site.packages.banner?.backgroundImage ?? "/travel/Travel/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg"
        }
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Tour Packages", href: "/package" },
          { label: packageItem.title },
        ]}
      />
      <section className="mx-auto max-w-[1250px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <PackageDetailClient packageItem={packageItem} tour={tour} />

        <Link
          href="/package"
          className="mt-10 inline-flex items-center gap-1 text-sm text-slate-300 hover:text-amber-400"
        >
          <ChevronLeft className="h-4 w-4" /> Back to all packages
        </Link>
      </section>
    </main>
  );
}
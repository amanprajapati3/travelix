import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import CtaBanner from "../../components/shared/CtaBanner";
import DestinationDetail from "../../components/layout/destination/DestinationDetail";
import { getDestinationBySlug, getDestinationSlugs } from "@/data";

export function generateStaticParams() {
  return getDestinationSlugs().map((destination) => ({
    slug: destination.slug.replace(/^\/destination\//, ""),
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title={destination.name}
        backgroundImage={destination.image}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destination" },
          { label: destination.name },
        ]}
      />
      <DestinationDetail destination={destination} />
      <CtaBanner />
    </main>
  );
}
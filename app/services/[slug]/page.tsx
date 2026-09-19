import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import ServiceDetail from "../../components/layout/service/ServiceDetail";
import { getServiceById, getServiceIds, site } from "@/data";

export function generateStaticParams() {
  return getServiceIds().map((service) => ({ slug: service.id }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title="Our"
        highlightedTitle="Services"
        backgroundImage={site.services.banner?.backgroundImage ?? ""}
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Our Services", href: "/service" }, { label: service.badge }]}
      />
      <ServiceDetail service={service} />
    </main>
  );
}
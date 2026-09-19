import Banner from "../components/shared/Banner";
import CtaBanner from "../components/shared/CtaBanner";
import Sitemap from "../components/layout/sitemap/Sitemap";
import { site } from "@/data";

export default function SitemapPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title={site.sitemap.banner.title}
        highlightedTitle={site.sitemap.banner.highlightedTitle}
        backgroundImage={site.sitemap.banner.backgroundImage}
        breadcrumbItems={site.sitemap.banner.breadcrumbItems}
      />
      <Sitemap />
      <CtaBanner />
    </main>
  );
}
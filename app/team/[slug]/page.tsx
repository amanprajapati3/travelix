import { notFound } from "next/navigation";
import Banner from "../../components/shared/Banner";
import TeamDetail from "../../components/layout/team/TeamDetail";
import { getTeamMemberBySlug, getTeamMemberSlugs, site } from "@/data";
import CtaBanner from "@/app/components/shared/CtaBanner";
import Stats from "@/app/components/shared/Stats";

export function generateStaticParams() {
  return getTeamMemberSlugs().map((member) => ({ slug: member.slug }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      <Banner
        title="Team"
        highlightedTitle="Detail"
        backgroundImage={site.team.banner?.backgroundImage ?? ""}
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Our Team", href: "/team" }, { label: "Team Detail" }]}
      />
      <TeamDetail member={member} />
      <CtaBanner/>
      <Stats/>
    </main>
  );
}
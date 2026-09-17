import Image from "next/image";
import Link from "next/link";
import Banner from "../../shared/Banner";
import { site } from "@/data";
import type { TravelTeamData, TravelTeamMember } from "@/type/typeSection";

const teamData: TravelTeamData = site.team;

function TeamCard({ member }: { member: TravelTeamMember }) {
  return (
<article className="group text-center rounded-2xl border border-white/10 bg-[#101722] overflow-hidden">
  <Link
    href={member.button.href}
    className="relative block h-[280px] overflow-hidden"
    aria-label={`View ${member.name}'s profile`}
  >
    {/* Radial Glow Effect */}
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-amber-300 blur-3xl pointer-events-none" />

    {/* Profile Image (Requires transparent PNG background) */}
    <Image
      src={member.image}
      alt={member.name}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="relative z-10 object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
    />
  </Link>

  <div className="flex flex-col items-center justify-center">
    <h2 className="my-5 text-2xl font-semibold text-white">
      {member.name}
    </h2>
    <p className="mt-1 w-fit text-md text-white font-semibold border-amber-300 border-2 rounded-full py-2 px-5 my-3">
      {member.role}
    </p>
  </div>
</article>
  );
}

export default function Team() {
  if (!teamData) return null;

  return (
    <main className="min-h-screen overflow-hidden bg-[#011014] text-white">
      {teamData.banner && (
        <Banner
          title={teamData.banner.title}
          highlightedTitle={teamData.banner.highlightedTitle}
          backgroundImage={teamData.banner.backgroundImage}
          breadcrumbItems={teamData.banner.breadcrumbItems}
        />
      )}

      <section className="mx-auto max-w-[1300px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        {/* <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
            {teamData.badge}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {teamData.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            {teamData.desc}
          </p>
        </div> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamData.members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}

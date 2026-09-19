import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import type { TravelTeamMember } from "@/type/typeSection";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

export default function TeamDetail({ member }: { member: TravelTeamMember }) {
  return (
    <section className="mx-auto max-w-312.5 px-2 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid overflow-hidden rounded-xl border border-cyan-900 bg-[#061b20] lg:grid-cols-[minmax(300px,440px)_1fr]">
        <div className="relative min-h-90 overflow-hidden rounded-2xl sm:min-h-115">
          <div className="pointer-events-none absolute inset-3">
            <div className="absolute bottom-0 left-0 top-0 w-[7%] bg-amber-300/90" />

            <div
              className="absolute left-0 top-0 h-[9%] w-[35%] rounded-tl-lg bg-amber-300/90"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 20% 100%, 0% 100%)" }}
            />

            <div
              className="absolute bottom-0 left-0 h-[9%] w-[35%] rounded-bl-lg bg-amber-300/90"
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 20% 0%, 0% 0%)" }}
            />
          </div>

          <Image
            src={member.image2}
            alt={member.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 440px"
            className="z-10 rounded-xl object-cover p-5 sm:p-7"
          />
        </div>

        <div className="flex flex-col justify-center p-3 sm:p-10">
          <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-amber-300">
            Our Team
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">{member.name}</h1>
          <div className="mt-3 h-1 w-14 bg-amber-300" />
          <p className="mt-4 text-sm sm:text-base uppercase tracking-wide text-slate-300">
            {member.role}
          </p>
          <dl className="mt-4 grid gap-1 text-sm sm:text-lg sm:grid-cols-[90px_1fr]">
            <dt className="font-semibold text-white">Name:</dt>
            <dd className="text-white sm:ml-5">{member.name}</dd>
            <dt className="font-semibold text-white">Experience:</dt>
            <dd className="text-white sm:ml-5">{member.experience}</dd>
            <dt className="font-semibold text-white">Email:</dt>
            <dd className="break-all text-white sm:ml-5">{member.email}</dd>
            <dt className="font-semibold text-white">Telephone:</dt>
            <dd className="text-white sm:ml-5">{member.telephone}</dd>
            <dt className="font-semibold text-white">Fax:</dt>
            <dd className="text-white sm:ml-5">{member.fax}</dd>
          </dl>
          <div className="mt-7 flex gap-3">
            {member.social.map((social) => {
              const Icon =
                socialIcons[social.label as keyof typeof socialIcons] ?? MapPin;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 sm:w-12 sm:h-12 w-9 items-center justify-center rounded-lg border border-cyan-900 text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400"
                >
                  <Icon className="h-4 sm:w-6 sm:h-6 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-cyan-900 bg-[#061b20] p-3 sm:p-10">
        <h2 className="flex items-center gap-3 text-xl font-bold sm:text-2xl md:text-4xl">
          <span className="h-8 w-1 bg-amber-400" />
          Biography
        </h2>
        <p className="mt-5 max-w-5xl text-sm sm:text-lg leading-7 text-white">
          {member.bio}
        </p>
      </div>

      <Link
        href="/team"
        className="mt-8 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back to our team
      </Link>
    </section>
  );
}

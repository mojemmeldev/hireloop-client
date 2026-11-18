import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusinessIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  TrophyIcon,
  UserSearchIcon,
} from "lucide-react";

import globe from "@/assets/globe.png";

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  { icon: SearchIcon, value: "50K", label: "Active Jobs" },
  { icon: TrophyIcon, value: "12K", label: "Companies" },
  { icon: UserSearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
];

// Starfield: small SVG with scattered dots, tiled across the hero
const starsSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='white'><circle cx='22' cy='36' r='1.2' opacity='.7'/><circle cx='90' cy='110' r='1' opacity='.5'/><circle cx='160' cy='40' r='1.5' opacity='.9'/><circle cx='210' cy='180' r='1' opacity='.6'/><circle cx='300' cy='70' r='1.2' opacity='.8'/><circle cx='350' cy='220' r='1' opacity='.4'/><circle cx='60' cy='260' r='1.1' opacity='.5'/><circle cx='140' cy='300' r='1.3' opacity='.7'/><circle cx='250' cy='330' r='1' opacity='.5'/><circle cx='330' cy='150' r='1.4' opacity='.8'/><circle cx='380' cy='30' r='1' opacity='.6'/><circle cx='30' cy='170' r='1' opacity='.5'/><circle cx='120' cy='220' r='1.2' opacity='.6'/><circle cx='280' cy='270' r='1.2' opacity='.5'/><circle cx='200' cy='120' r='1' opacity='.4'/><circle cx='370' cy='330' r='1.1' opacity='.6'/><circle cx='70' cy='380' r='1' opacity='.4'/><circle cx='180' cy='370' r='1.2' opacity='.5'/><circle cx='240' cy='20' r='1' opacity='.6'/><circle cx='330' cy='390' r='1' opacity='.5'/></svg>`;
const starsUrl = `url("data:image/svg+xml,${encodeURIComponent(starsSvg)}")`;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#010103]">
      {/* Globe horizon at the bottom (from src/assets/globe.png) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[440px] max-w-[1920px] sm:h-[520px]"
      >
        <Image
          src={globe}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 45%" }}
        />
        {/* Fade the image's sky into the black page, keep horizon glow + globe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #010103 0%, rgba(1,1,3,0.95) 18%, rgba(1,1,3,0.35) 42%, rgba(1,1,3,0) 58%)",
          }}
        />
        {/* Vivid purple halo on the horizon rim (design's #5C53FE) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 50% 32%, rgba(108,92,255,0.45) 0%, rgba(92,83,254,0.22) 40%, rgba(92,83,254,0) 70%)",
          }}
        />
      </div>
      {/* Starfield across the whole hero */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: starsUrl, backgroundSize: "520px 520px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-28 sm:px-6 sm:pt-28">
        {/* Announcement badge */}
        <div className="flex justify-center">
          <div className="relative flex items-center">
            {/* side lines */}
            <div
              aria-hidden
              className="absolute top-1/2 -left-24 hidden h-px w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#5C53FE]/60 to-[#5C53FE]/10 sm:block"
            />
            <div
              aria-hidden
              className="absolute top-1/2 -right-24 hidden h-px w-24 -translate-y-1/2 bg-gradient-to-l from-transparent via-[#5C53FE]/60 to-[#5C53FE]/10 sm:block"
            />
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-gradient-to-b from-[#1E1E22] to-[#101012] py-2 pr-5 pl-3 shadow-lg shadow-black/50">
              <BriefcaseBusinessIcon className="size-5 fill-orange-500 text-orange-500" />
              <span className="font-mono text-base font-bold text-white">
                50,000+
              </span>
              <span className="font-mono text-base tracking-wider text-white/50 uppercase">
                new jobs this month
              </span>
            </div>
          </div>
        </div>

        {/* Title + subtitle */}
        <h1 className="mx-auto mt-8 max-w-4xl text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[56px] md:leading-[1.1]">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-white/70 sm:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#131315] p-2 sm:h-16 sm:flex-row sm:items-center"
        >
          <label className="flex flex-1 items-center gap-3 px-3 text-white/80">
            <SearchIcon className="size-5 shrink-0" />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              className="h-12 w-full bg-transparent text-base text-white outline-none placeholder:text-white/70 sm:h-full"
            />
          </label>
          <div className="hidden h-7 w-px bg-white/15 sm:block" />
          <label className="flex flex-1 items-center gap-3 px-3 text-white/80">
            <MapPinIcon className="size-5 shrink-0" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="h-12 w-full bg-transparent text-base text-white outline-none placeholder:text-white/70 sm:h-full"
            />
          </label>
          <button
            type="submit"
            aria-label="Search"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5C53FE] text-white transition-colors hover:bg-[#4B43F0]"
          >
            <SearchIcon className="size-5" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-base text-white/60">Trending Position</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/5 bg-[#1A1A1B] px-4 py-1.5 text-sm text-[#EDEDEF] transition-colors hover:bg-[#2A2A2B]"
            >
              {position}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold text-white sm:text-4xl md:text-[40px] md:leading-[1.15]">
            Assisting over 15,000 job seekers find their dream positions.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-[254px] flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <stat.icon className="size-6 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-semibold text-white sm:text-[56px] sm:leading-[1.1]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-lg text-white/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

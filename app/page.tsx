"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Globe,
  HomeIcon,
  MailIcon,
  UserRound,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { usePortfolio } from "@/context/portfolio-data";
import PillNav from "@/components/PillNav";
import type { PillNavItem } from "@/components/PillNav";
import DecryptedText from "@/components/DecryptedText";
import ProfileCard from "@/components/ProfileCard";

const navLinks: PillNavItem[] = [
  { href: "#home", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: UserRound },
  { href: "#projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "#contact", label: "Contact", icon: MailIcon },
];

const contactIconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  email: MailIcon,
  website: Globe,
};

const heroPhrases = [
  "Pelajar",
  "Full Stack Developer",
  "Designer",
  "Gamer",
];

export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const {
    projects,
    stacks,
    contacts,
    skillsDescription,
    stackDescription,
    profilePhoto,
    navbarIcon,
    location,
    instagramHandle,
    instagramLink,
    profileStatus,
    instagramPhoto,
    projectSectionTitles,
  } = usePortfolio();

  const soloProjects = projects.filter((project) =>
    project.category.toLowerCase().includes("solo"),
  );
  const teamProjects = projects.filter((project) =>
    project.category.toLowerCase().includes("team"),
  );
  const highlightedProjectIds = new Set([
    ...soloProjects.map((project) => project.id),
    ...teamProjects.map((project) => project.id),
  ]);
  const otherProjects = projects.filter((project) => !highlightedProjectIds.has(project.id));
  const projectGroups = [
    { key: "solo", title: projectSectionTitles.solo, items: soloProjects },
    { key: "team", title: projectSectionTitles.team, items: teamProjects },
    { key: "other", title: "Kolaborasi Lainnya", items: otherProjects },
  ].filter((group) => group.items.length > 0);

  const handleContactClick = useCallback(() => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const instagramContact = contacts.find((contact) => contact.icon === "instagram");
  const resolvedInstagramHandle = instagramHandle?.trim() || instagramContact?.value || "strxdale";
  const resolvedInstagramHref = instagramLink?.trim() || instagramContact?.href || "https://instagram.com/strxdale";
  const resolvedProfileStatus = profileStatus || instagramContact?.label || "Available for freelance";
  const resolvedInstagramPhoto = instagramPhoto || profilePhoto;
  const resolvedSkillsDescription =
    skillsDescription?.trim() ||
    "Design System, Interaction Design, Full Stack Dev, System Architecture";
  const resolvedStackDescription =
    stackDescription?.trim() || "React · Next.js · Tailwind · Livewire · Laravel";
  const resolvedLocation = location?.trim() || "Bengkulu, Indonesia (UTC+7)";
  const formattedTime =
    currentTime?.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }) ?? "--:--:--";

  useEffect(() => {
    const phraseInterval = window.setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 5000);

    return () => window.clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[580px] bg-[radial-gradient(circle_at_top,_rgba(98,81,255,0.35),_transparent_55%)]" />

      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur">
        <div className="relative mx-auto flex w-full max-w-5xl justify-center px-4 py-5 sm:px-6">
          <PillNav
            logo={navbarIcon}
            logoAlt="Gibran Avatar"
            logoHref="/admin"
            items={navLinks}
            activeHref="#home"
            baseColor="#071c35e6"
            pillColor="rgba(142, 124, 124, 0.12)"
            hoveredPillTextColor="#ffffffff"
            pillTextColor="#eceef0a3"
          />
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-100 shadow-[0_10px_35px_rgba(8,47,73,0.35)] sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{formattedTime} WIB</span>
          </div>
        </div>
        <div className="px-4 pb-4 sm:hidden">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-200">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {formattedTime}
            </span>
            <span className="text-slate-400">WIB</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-16 sm:gap-32 sm:px-6 sm:py-24">
        <section
          id="home"
          className="grid items-center gap-10 sm:gap-12 md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-100 transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Available
            </div>
            <div className="space-y-3 px-5 pb-5 pt-4 transition-all duration-500 group-hover:px-6 sm:px-6 sm:pb-6 sm:pt-5">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                hi, i am
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Muhammad Gibran Dhiyaulhaq
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">
                  <span>Saya seorang</span>
                  <span
                    className="relative inline-flex min-h-[1.2em] items-center text-white"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <DecryptedText
                      key={`${currentPhraseIndex}-${heroPhrases[currentPhraseIndex]}`}
                      text={heroPhrases[currentPhraseIndex]}
                      sequential
                      speed={45}
                      revealDirection="start"
                      maxIterations={24}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
                      className="text-white"
                      encryptedClassName="text-blue-100/70"
                      animateOn="both"
                    />
                  </span>
                </div>
                <p className="text-base text-slate-300 sm:text-lg">
                  Memiliki ketertarikan kuat dalam mempelajari teknologi terbaru serta mengembangkan sistem yang bermanfaat dan dapat diterapkan dalam kehidupan sehari-hari.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#projects"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-blue-200"
              >
                Lihat Proyek
              </Link>
              <Link
                href="#about"
                className="rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
              >
                Profil Lengkap
              </Link>
            </div>
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition-all duration-500 hover:border-white/40 hover:-translate-y-0.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {resolvedLocation}
            </div>
          </div>

          <div className="flex justify-center">
            <ProfileCard
              avatarUrl={profilePhoto}
              name="Muhammad Gibran Dhiyaulhaq"
              title="Full Stack Developer"
              handle={resolvedInstagramHandle}
              status={resolvedProfileStatus}
              contactText="Hubungi Saya"
              onContactClick={handleContactClick}
              innerGradient="linear-gradient(145deg,#0f172a 0%,#3b82f6 100%)"
              behindGlowColor="rgba(59,130,246,0.6)"
              grainUrl="/grain.png"
              disableGlow
              contactHref={resolvedInstagramHref}
              miniAvatarUrl={resolvedInstagramPhoto}
              showDetails={false}
            />
          </div>
        </section>

        <section
          id="about"
          className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10"
        >
          <div className="flex flex-wrap gap-3">
            {stacks.map((tool, index) => {
              const hasIcon = Boolean(tool.icon);
              return (
                <div
                  key={tool.id ?? `${tool.name}-${index}`}
                  className="relative group"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-[22px] text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(8,47,73,0.45)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_25px_35px_rgba(8,47,73,0.45)] ${
                      hasIcon
                        ? "overflow-hidden border border-white/10 bg-slate-900/80 p-3"
                        : `bg-gradient-to-br ${tool.gradient}`
                    }`}
                    aria-label={tool.name}
                  >
                    {hasIcon ? (
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span>{tool.short}</span>
                    )}
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100 opacity-0 shadow-[0_8px_25px_rgba(15,23,42,0.45)] transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                    {tool.name}
                    <span className="absolute inset-x-0 -top-2 mx-auto h-2 w-2 -translate-y-[2px] rotate-45 rounded-sm bg-slate-900/95" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              About Me
            </h2>
            <p className="text-base text-slate-300 sm:text-lg">
              Saya adalah seorang siswa dari SMKN 1 Kota Bengkulu yang memiliki fokus utama pada pengembangan web dan mobile. Sejak awal belajar teknologi, saya tertarik dengan bagaimana sebuah aplikasi dapat memberikan solusi nyata bagi orang lain. Hal ini membuat saya suka mengeksplorasi teknologi baru, mencoba berbagai framework, serta membangun produk yang tidak hanya berfungsi tetapi juga bermanfaat.
            </p>
            <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-[0_12px_30px_rgba(8,47,73,0.35)]">
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Keahlian
                </span>
                <p className="mt-2">
                  {resolvedSkillsDescription}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-[0_12px_30px_rgba(8,47,73,0.35)]">
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Stack
                </span>
                <p className="mt-2">{resolvedStackDescription}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-[0_12px_30px_rgba(8,47,73,0.35)]">
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Lokasi
                </span>
                <p className="mt-2">{resolvedLocation}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-blue-200">
              project
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Beberapa proyek yang saya banggakan.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-400">
              Saya senang menggabungkan visual yang hidup, struktur kode rapi, dan
              kolaborasi lintas disiplin. Berikut beberapa studi kasus yang terus diperbarui lewat dashboard admin.
            </p>
          </div>

          <div className="space-y-16">
            {projectGroups.map((group, groupIndex) => (
              <div
                key={group.key}
                className="space-y-8 rounded-[38px] border border-white/5 bg-slate-950/40 p-6 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.6em] text-blue-200">
                      {group.key === "other" ? "kolaborasi" : "fokus utama"}
                    </p>
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    {group.items.length} project
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {group.items.map((project, index) => (
                    <article
                      key={project.id}
                      className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/40"
                      style={{ transitionDelay: `${(groupIndex + index) * 60}ms` }}
                    >
                      <div className="relative h-60 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          sizes="(min-width: 1024px) 40vw, 90vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                      </div>
                      <div className="flex flex-col gap-4 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.4em] text-blue-100">
                            {project.category}
                          </span>
                          {project.stack.length > 0 && (
                            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
                              {project.stack.slice(0, 2).join(" · ")}
                              {project.stack.length > 2 ? " +" + (project.stack.length - 2) : ""}
                            </span>
                          )}
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-2xl font-semibold text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-slate-300">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                            {project.stack.slice(0, 4).map((tool) => (
                              <span
                                key={`${project.id}-${tool}`}
                                className="rounded-full border border-white/10 px-3 py-1"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                            >
                              Lihat Project
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="rounded-[40px] border border-white/10 bg-slate-900/60 p-6 sm:p-10"
        >
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
              Contact
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ceritakan tantanganmu, mari kita bangun solusinya.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-100/80">
              Tersedia untuk kolaborasi remote maupun onsite. Saya senang
              berdiskusi tentang produk digital, eksperimen design system, dan
              arsitektur frontend modern.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((contact, index) => {
              const Icon = contactIconMap[contact.icon] ?? Globe;
              return (
                <Link
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  className="group relative flex h-full flex-col justify-between rounded-[26px] border border-white/10 bg-slate-950/40 p-5 text-white transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/5"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs text-slate-400">Visit</span>
                  </span>
                  <div className="space-y-1 pt-6 transition-all duration-500 group-hover:translate-y-1">
                    <p className="text-lg font-semibold">{contact.label}</p>
                    <p className="text-sm text-slate-300">{contact.value}</p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 text-lg text-slate-400"
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-white">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {resolvedLocation}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-400 sm:py-8 sm:text-sm">
        © {new Date().getFullYear()} Muhammad Gibran
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Code2,
  Globe,
  HomeIcon,
  MailIcon,
  Menu,
  UserRound,
  X,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { usePortfolio } from "@/context/portfolio-data";

const navLinks = [
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { projects, stacks, contacts, profilePhoto, location } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[580px] bg-[radial-gradient(circle_at_top,_rgba(98,81,255,0.35),_transparent_55%)]" />

      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
              <Code2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-wide text-white">
              Portofolio
            </span>
          </div>
          <div className="hidden flex-1 justify-center sm:flex">
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 p-1.5 text-xs font-semibold text-slate-300 shadow-[0_10px_35px_rgba(2,6,23,0.45)] sm:text-sm">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isPrimary = index === 0;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
                      isPrimary
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            href="#contact"
            className="hidden rounded-full border border-white/20 px-5 py-2 text-sm font-semibold tracking-wide text-white transition hover:border-white hover:bg-white/5 sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-white/15 p-2 text-white transition hover:bg-white/5 sm:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </nav>
        {menuOpen && (
          <div className="sm:hidden">
            <div className="mx-4 mt-2 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm font-semibold text-slate-200 shadow-[0_25px_60px_rgba(2,6,23,0.6)]">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/10"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="#contact"
                  className="mt-2 inline-flex items-center justify-center rounded-2xl border border-white/15 px-4 py-3 text-white transition hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Let&apos;s talk
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-16 sm:gap-32 sm:px-6 sm:py-24">
        <section
          id="home"
          className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.45)] sm:gap-12 sm:p-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col gap-8">
            <p className="inline-flex w-fit items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Available for freelance
            </p>
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Full Stack Developer
              </h1>
              <p className="text-base text-slate-300 sm:text-lg">
                Suka belajar hal baru di dunia teknologi dan mengembangkan sistem
                yang berguna untuk kehidupan sehari-hari.
              </p>
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
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
              >
                Profil Lengkap
              </Link>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {location}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-blue-400/10 to-transparent p-6 sm:p-8">
            <div className="absolute inset-x-6 top-6 rounded-3xl border border-white/15" />
            <Image
              src={profilePhoto}
              alt="Gibran profile illustration"
              width={320}
              height={320}
              className="relative w-48 max-w-full drop-shadow-[0_30px_60px_rgba(15,23,42,0.9)] sm:w-64"
              priority
            />
            <div className="mt-8 space-y-2 text-center">
              <p className="text-lg font-semibold tracking-wide">Muhammad Gibran Dhiyaulhaq</p>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Full Stack Developer
              </p>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10"
        >
          <div className="flex flex-wrap gap-3">
            {stacks.map((tool) => (
              <div
                key={tool.name}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(8,47,73,0.45)]`}
                aria-label={tool.name}
                title={tool.name}
              >
                {tool.short}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              About Me
            </h2>
            <p className="text-base text-slate-300 sm:text-lg">
              Saya adalah seorang siswa dari SMKN 1 Kota Bengkulu yang memiliki fokus utama pada pengembangan web dan mobile. Sejak awal belajar teknologi, saya tertarik dengan bagaimana sebuah aplikasi dapat memberikan solusi nyata bagi orang lain. Hal ini membuat saya suka mengeksplorasi teknologi baru, mencoba berbagai framework, serta membangun produk yang tidak hanya berfungsi tetapi juga bermanfaat.
            </p>
            <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Keahlian
                </span>
                Design System, Interaction Design, Frontend Dev, System
                Architecture
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Stack
                </span>
                React · Next.js · Tailwind · Node · Supabase
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Lokasi
                </span>
                Bandung, Indonesia (UTC+7)
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-blue-200">
              project
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Beberapa proyek yang saya banggakan.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-400">
              Saya senang menggabungkan visual yang hidup, struktur kode rapi, dan
              kolaborasi lintas disiplin. Berikut tiga studi kasus yang mewakili
              cara kerja dan cara berpikir saya.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-[32px] border border-white/10 bg-slate-900/40 p-6 shadow-[0_40px_120px_rgba(2,6,23,0.65)] transition hover:-translate-y-1 hover:border-white/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.5em] text-blue-200">
                  <span>{project.category}</span>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-[10px] font-semibold tracking-[0.4em] text-slate-200 transition hover:border-white hover:text-white"
                  >
                    Lihat Project
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
                <div className="relative mt-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="h-52 w-full object-cover sm:h-64"
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {project.stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
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
            {contacts.map((contact) => {
              const Icon = contactIconMap[contact.icon] ?? Globe;
              return (
                <Link
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  className="relative flex h-full flex-col justify-between rounded-[26px] border border-white/10 bg-slate-950/40 p-5 text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs text-slate-400">Visit</span>
                  </span>
                  <div className="space-y-1 pt-6">
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
              {location}
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

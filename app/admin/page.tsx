"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Github,
  Globe,
  ImageIcon,
  Instagram,
  Linkedin,
  Mail,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { usePortfolio, Project, StackIcon, ContactLink } from "@/context/portfolio-data";

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  website: Globe,
};

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "121208";

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function AdminDashboard() {
  const {
    profilePhoto,
    setProfilePhoto,
    navbarIcon,
    setNavbarIcon,
    location,
    setLocation,
    instagramHandle,
    setInstagramHandle,
    instagramLink,
    setInstagramLink,
    profileStatus,
    setProfileStatus,
    projectSectionTitles,
    setProjectSectionTitle,
    projects,
    upsertProject,
    deleteProject,
    stacks,
    upsertStack,
    deleteStack,
    contacts,
    upsertContact,
    deleteContact,
  } = usePortfolio();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingStack, setEditingStack] = useState<StackIcon | null>(null);
  const [editingContact, setEditingContact] = useState<ContactLink | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("admin-authenticated") === "true";
  });
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim() === ADMIN_PASS) {
      setIsAuthenticated(true);
      setAuthError("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("admin-authenticated", "true");
      }
    } else {
      setAuthError("Password salah, coba lagi.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("admin-authenticated");
    }
  };

  const resetProjectForm = () =>
    setEditingProject({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      category: "",
      stack: [],
      image: "",
      link: "",
    });

  const resetStackForm = () =>
    setEditingStack({
      id: crypto.randomUUID(),
      name: "",
      short: "",
      gradient: "",
      icon: "",
    });

  const resetContactForm = () =>
    setEditingContact({
      id: crypto.randomUUID(),
      label: "",
      value: "",
      href: "",
      icon: "instagram",
    });

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_90px_rgba(2,6,23,0.7)]">
          <div className="space-y-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-blue-200">
              Admin Access
            </p>
            <h1 className="text-2xl font-semibold text-white">
              Masuk ke Control Center
            </h1>
            <p className="text-sm text-slate-400">
              Masukkan password rahasia untuk mengedit portofolio.
            </p>
          </div>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password admin"
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
            />
            {authError && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(37,99,235,0.35)] transition hover:shadow-[0_25px_50px_rgba(37,99,235,0.45)]"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-blue-300">Dashboard</p>
            <h1 className="text-2xl font-semibold">Admin Control Center</h1>
            <p className="text-sm text-slate-400">
              Kelola konten portofolio kamu tanpa menyentuh kode.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Web
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-white/40"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        {/* Profile Section */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
                Profil
              </p>
              <h2 className="text-xl font-semibold text-white">Foto profil, icon navbar & lokasi</h2>
              <p className="text-sm text-slate-400">
                Perbarui gambar yang tampil di hero dan icon navbar beserta informasi lokasi.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                URL Foto Profil
              </label>
              <input
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                placeholder="https://images..."
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2">
              <ImageIcon className="h-5 w-5 text-blue-300" />
              <span
                className="text-sm text-slate-300"
                title={profilePhoto}
                style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {profilePhoto}
              </span>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await fileToDataUrl(file);
                    setProfilePhoto(url);
                  } catch (error) {
                    console.error("Failed to load image", error);
                  }
                }}
              />
              Upload Foto
            </label>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                URL Icon Navbar
              </label>
              <input
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                value={navbarIcon}
                onChange={(e) => setNavbarIcon(e.target.value)}
                placeholder="https://icon.png"
              />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await fileToDataUrl(file);
                      setNavbarIcon(url);
                    } catch (error) {
                      console.error("Failed to load navbar icon", error);
                    }
                  }}
                />
                Upload Icon
              </label>
            </div>
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Lokasi
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2">
                <Globe className="h-5 w-5 text-blue-300" />
                <input
                  className="bg-transparent text-sm focus:outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Section Titles */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
              Heading Project
            </p>
            <h2 className="text-xl font-semibold text-white">Judul kategori dari admin</h2>
            <p className="text-sm text-slate-400">
              Teks ini akan muncul di halaman utama untuk membedakan solo project dan team project.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Solo Project Title
              </span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                value={projectSectionTitles.solo}
                onChange={(event) => setProjectSectionTitle("solo", event.target.value)}
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Team Project Title
              </span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                value={projectSectionTitles.team}
                onChange={(event) => setProjectSectionTitle("team", event.target.value)}
              />
            </label>
          </div>
        </section>

        {/* Project Management */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
                Project
              </p>
              <h2 className="text-xl font-semibold text-white">Kelola project</h2>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40"
              onClick={resetProjectForm}
            >
              <Plus className="h-4 w-4" />
              Tambah Project
            </button>
          </div>

          {editingProject && (
            <form
              className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                upsertProject(editingProject);
                setEditingProject(null);
              }}
            >
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Judul"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Kategori"
                value={editingProject.category}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, category: e.target.value })
                }
                required
              />
              <textarea
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm md:col-span-2 focus:border-blue-400 focus:outline-none"
                placeholder="Deskripsi"
                value={editingProject.description}
                rows={3}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Stack (pisahkan koma)"
                value={editingProject.stack.join(", ")}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    stack: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Link"
                value={editingProject.link}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, link: e.target.value })
                }
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="URL Gambar"
                value={editingProject.image}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, image: e.target.value })
                }
              />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 hover:border-white/40">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    if (!editingProject) return;
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await fileToDataUrl(file);
                      setEditingProject({ ...editingProject, image: url });
                    } catch (error) {
                      console.error("Failed to read project image", error);
                    }
                  }}
                />
                Upload Gambar
              </label>
              <div className="flex gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-blue-400"
                >
                  <Save className="h-4 w-4" />
                  Simpan Project
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                      {project.category}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-full border border-white/10 p-2 text-slate-300 hover:border-white/40"
                      onClick={() => setEditingProject(project)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-full border border-white/10 p-2 text-red-300 hover:border-red-400"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  {project.stack.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 px-3 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack Icons */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
                Tech Stack Icons
              </p>
              <h2 className="text-xl font-semibold text-white">Kelola stack favorit</h2>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40"
              onClick={resetStackForm}
            >
              <Plus className="h-4 w-4" />
              Tambah Stack
            </button>
          </div>

          {editingStack && (
            <form
              className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault();
                upsertStack(editingStack);
                setEditingStack(null);
              }}
            >
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Nama"
                value={editingStack.name}
                onChange={(e) =>
                  setEditingStack({ ...editingStack, name: e.target.value })
                }
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Singkatan"
                value={editingStack.short}
                onChange={(e) =>
                  setEditingStack({ ...editingStack, short: e.target.value })
                }
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Tailwind gradient (contoh: from-cyan-400 to-blue-500)"
                value={editingStack.gradient}
                onChange={(e) =>
                  setEditingStack({ ...editingStack, gradient: e.target.value })
                }
              />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 hover:border-white/40 md:col-span-3">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    if (!editingStack) return;
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await fileToDataUrl(file);
                      setEditingStack({
                        ...editingStack,
                        icon: url,
                      });
                    } catch (error) {
                      console.error("Failed to load stack image", error);
                    }
                  }}
                />
                Upload Icon
              </label>
              <div className="flex gap-3 md:col-span-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-blue-400"
                >
                  <Save className="h-4 w-4" />
                  Simpan Stack
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStack(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            {stacks.map((stack) => {
              const hasIcon = Boolean(stack.icon);
              const bgClass = hasIcon
                ? "bg-slate-900/80 border border-white/10 p-1"
                : `bg-gradient-to-br ${stack.gradient}`;
              return (
                <div key={stack.id} className="relative group">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-semibold text-slate-900 shadow-lg ${bgClass}`}
                    title={stack.name}
                  >
                    {hasIcon ? (
                      <img
                        src={stack.icon}
                        alt={stack.name}
                        className="h-full w-full rounded-2xl object-contain bg-white/5 p-1"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-xs text-slate-900">
                        <span className="text-base">{stack.short}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteStack(stack.id)}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-red-200 opacity-0 shadow-lg transition-all duration-200 hover:border-red-400 hover:text-red-100 group-hover:opacity-100"
                    aria-label={`Hapus stack ${stack.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Manager */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
                Kontak
              </p>
              <h2 className="text-xl font-semibold text-white">Kelola kontak</h2>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40"
              onClick={resetContactForm}
            >
              <Plus className="h-4 w-4" />
              Tambah Kontak
            </button>
          </div>

          {editingContact && (
            <form
              className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-4"
              onSubmit={(e) => {
                e.preventDefault();
                upsertContact(editingContact);
                setEditingContact(null);
              }}
            >
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Label"
                value={editingContact.label}
                onChange={(e) =>
                  setEditingContact({ ...editingContact, label: e.target.value })
                }
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="Handle/Value"
                value={editingContact.value}
                onChange={(e) =>
                  setEditingContact({ ...editingContact, value: e.target.value })
                }
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                placeholder="URL"
                value={editingContact.href}
                onChange={(e) =>
                  setEditingContact({ ...editingContact, href: e.target.value })
                }
              />
              <select
                className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                value={editingContact.icon}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    icon: e.target.value as ContactLink["icon"],
                  })
                }
              >
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="email">Email</option>
                <option value="website">Website</option>
              </select>
              <div className="flex gap-3 md:col-span-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-blue-400"
                >
                  <Save className="h-4 w-4" />
                  Simpan Kontak
                </button>
                <button
                  type="button"
                  onClick={() => setEditingContact(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {contacts.map((contact) => {
              const Icon = iconMap[contact.icon];
              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{contact.label}</p>
                      <p className="text-xs text-slate-400">{contact.value}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-full border border-white/10 p-2 text-slate-300 hover:border-white/30"
                      onClick={() => setEditingContact(contact)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-full border border-white/10 p-2 text-red-300 hover:border-red-400"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

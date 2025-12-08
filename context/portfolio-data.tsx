"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  image: string;
  link: string;
};

export type StackIcon = {
  id: string;
  name: string;
  short: string;
  gradient: string;
};

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "instagram" | "linkedin" | "github" | "email" | "website";
};

export type PortfolioState = {
  profilePhoto: string;
  location: string;
  projects: Project[];
  stacks: StackIcon[];
  contacts: ContactLink[];
};

type PortfolioContextValue = PortfolioState & {
  setProfilePhoto: (url: string) => void;
  setLocation: (value: string) => void;
  upsertProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  upsertStack: (stack: StackIcon) => void;
  deleteStack: (id: string) => void;
  upsertContact: (contact: ContactLink) => void;
  deleteContact: (id: string) => void;
};

const defaultState: PortfolioState = {
  profilePhoto: "/profile.svg",
  location: "Bandung, Indonesia",
  projects: [
    {
      id: "aurora",
      title: "Aurora Finance Dashboard",
      description:
        "Redesigned dashboard multi-platform dengan analitik real-time untuk tim operasi finansial global.",
      category: "Team Project",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      image: "/projects/aurora.svg",
      link: "https://dribbble.com/shots/12345678",
    },
    {
      id: "atlas",
      title: "Atlas Travel App",
      description:
        "Aplikasi travel planner mobile-first dengan storytelling visual dan itinerary yang adaptif.",
      category: "Solo Project",
      stack: ["React Native", "Expo", "Figma"],
      image: "/projects/atlas.svg",
      link: "https://www.behance.net/gallery/1234567",
    },
    {
      id: "pulse",
      title: "Pulse Marketing Site",
      description:
        "Situs marketing SaaS dengan tipografi kontras tinggi dan micro interactions berbasis motion.",
      category: "Studio Collab",
      stack: ["Next.js", "Framer Motion", "Storybook"],
      image: "/projects/pulse.svg",
      link: "https://pulse.app",
    },
  ],
  stacks: [
    { id: "react", name: "React", short: "R", gradient: "from-cyan-400 to-blue-500" },
    { id: "next", name: "Next.js", short: "N", gradient: "from-slate-200 to-slate-400" },
    {
      id: "tailwind",
      name: "Tailwind",
      short: "T",
      gradient: "from-sky-400 to-indigo-500",
    },
    { id: "node", name: "Node.js", short: "Nd", gradient: "from-emerald-400 to-teal-500" },
    {
      id: "supabase",
      name: "Supabase",
      short: "S",
      gradient: "from-lime-300 to-emerald-500",
    },
  ],
  contacts: [
    {
      id: "ig",
      label: "Instagram",
      value: "@gibran.ui",
      href: "https://instagram.com/gibran.ui",
      icon: "instagram",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/gibran",
      href: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/gibrandev",
      href: "https://github.com",
      icon: "github",
    },
  ],
};

const STORAGE_KEY = "portfolio_data_v1";

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(() => {
    if (typeof window === "undefined") return defaultState;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      ...state,
      setProfilePhoto: (url) =>
        setState((prev) => ({
          ...prev,
          profilePhoto: url,
        })),
      setLocation: (value) =>
        setState((prev) => ({
          ...prev,
          location: value,
        })),
      upsertProject: (project) =>
        setState((prev) => {
          const exists = prev.projects.find((p) => p.id === project.id);
          if (exists) {
            return {
              ...prev,
              projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
            };
          }
          return { ...prev, projects: [...prev.projects, project] };
        }),
      deleteProject: (id) =>
        setState((prev) => ({
          ...prev,
          projects: prev.projects.filter((p) => p.id !== id),
        })),
      upsertStack: (stack) =>
        setState((prev) => {
          const exists = prev.stacks.find((s) => s.id === stack.id);
          if (exists) {
            return {
              ...prev,
              stacks: prev.stacks.map((s) => (s.id === stack.id ? stack : s)),
            };
          }
          return { ...prev, stacks: [...prev.stacks, stack] };
        }),
      deleteStack: (id) =>
        setState((prev) => ({
          ...prev,
          stacks: prev.stacks.filter((s) => s.id !== id),
        })),
      upsertContact: (contact) =>
        setState((prev) => {
          const exists = prev.contacts.find((c) => c.id === contact.id);
          if (exists) {
            return {
              ...prev,
              contacts: prev.contacts.map((c) => (c.id === contact.id ? contact : c)),
            };
          }
          return { ...prev, contacts: [...prev.contacts, contact] };
        }),
      deleteContact: (id) =>
        setState((prev) => ({
          ...prev,
          contacts: prev.contacts.filter((c) => c.id !== id),
        })),
    }),
    [state],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}

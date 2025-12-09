"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

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
  icon?: string;
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
  navbarIcon: string;
  location: string;
  projectSectionTitles: {
    solo: string;
    team: string;
  };
  instagramHandle: string;
  instagramLink: string;
  profileStatus: string;
  projects: Project[];
  stacks: StackIcon[];
  contacts: ContactLink[];
};

type PortfolioContextValue = PortfolioState & {
  isHydrated: boolean;
  setProfilePhoto: (url: string) => void;
  setNavbarIcon: (url: string) => void;
  setLocation: (value: string) => void;
  setInstagramHandle: (value: string) => void;
  setInstagramLink: (value: string) => void;
  setProfileStatus: (value: string) => void;
  setProjectSectionTitle: (key: keyof PortfolioState["projectSectionTitles"], value: string) => void;
  upsertProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  upsertStack: (stack: StackIcon) => void;
  deleteStack: (id: string) => void;
  upsertContact: (contact: ContactLink) => void;
  deleteContact: (id: string) => void;
};

const defaultState: PortfolioState = {
  profilePhoto: "/profile.svg",
  navbarIcon: "/profile.svg",
  location: "Bandung, Indonesia",
  projectSectionTitles: {
    solo: "Solo Project",
    team: "Team Project",
  },
  instagramHandle: "strxdale",
  instagramLink: "https://instagram.com/strxdale",
  profileStatus: "Available for freelance",
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
  const [state, setState] = useState<PortfolioState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<PortfolioState>;
        setState({
          ...defaultState,
          ...parsed,
          projects: parsed.projects ?? defaultState.projects,
          stacks: parsed.stacks ?? defaultState.stacks,
          contacts: parsed.contacts ?? defaultState.contacts,
          projectSectionTitles: parsed.projectSectionTitles ?? defaultState.projectSectionTitles,
          instagramHandle: parsed.instagramHandle ?? defaultState.instagramHandle,
          instagramLink: parsed.instagramLink ?? defaultState.instagramLink,
          profileStatus: parsed.profileStatus ?? defaultState.profileStatus,
        });
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, isHydrated]);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      ...state,
      isHydrated,
      setProfilePhoto: (url) =>
        setState((prev) => ({
          ...prev,
          profilePhoto: url,
        })),
      setNavbarIcon: (url) =>
        setState((prev) => ({
          ...prev,
          navbarIcon: url,
        })),
      setLocation: (value) =>
        setState((prev) => ({
          ...prev,
          location: value,
        })),
      setInstagramHandle: (value) =>
        setState((prev) => ({
          ...prev,
          instagramHandle: value,
        })),
      setInstagramLink: (value) =>
        setState((prev) => ({
          ...prev,
          instagramLink: value,
        })),
      setProfileStatus: (value) =>
        setState((prev) => ({
          ...prev,
          profileStatus: value,
        })),
      setProjectSectionTitle: (key, value) =>
        setState((prev) => ({
          ...prev,
          projectSectionTitles: {
            ...prev.projectSectionTitles,
            [key]: value,
          },
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

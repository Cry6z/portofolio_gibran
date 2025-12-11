"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolioState } from "@/lib/portfolio-defaults";
import type { ContactLink, PortfolioState, Project, StackIcon } from "@/lib/portfolio-types";

const STORAGE_KEY = "portfolio-state";

type PortfolioContextValue = PortfolioState & {
  isHydrated: boolean;
  setProfilePhoto: (url: string) => void;
  setNavbarIcon: (url: string) => void;
  setLocation: (value: string) => void;
  setInstagramHandle: (value: string) => void;
  setInstagramLink: (value: string) => void;
  setProfileStatus: (value: string) => void;
  setInstagramPhoto: (url: string) => void;
  setProjectSectionTitle: (key: keyof PortfolioState["projectSectionTitles"], value: string) => void;
  upsertProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  upsertStack: (stack: StackIcon) => Promise<void>;
  deleteStack: (id: string) => Promise<void>;
  upsertContact: (contact: ContactLink) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const mergeWithDefaults = (partial?: Partial<PortfolioState> | null): PortfolioState => {
  if (!partial) {
    return defaultPortfolioState;
  }

  return {
    ...defaultPortfolioState,
    ...partial,
    projectSectionTitles: {
      ...defaultPortfolioState.projectSectionTitles,
      ...(partial.projectSectionTitles ?? {}),
    },
    projects: partial.projects ?? defaultPortfolioState.projects,
    stacks: partial.stacks ?? defaultPortfolioState.stacks,
    contacts: partial.contacts ?? defaultPortfolioState.contacts,
  };
};

const persistState = (snapshot: PortfolioState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.error("Failed to persist portfolio data", error);
  }
};

const ensureId = (id?: string) => {
  if (id) return id;
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(defaultPortfolioState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadState = () => {
      if (typeof window === "undefined") {
        setIsHydrated(true);
        return;
      }

      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<PortfolioState>;
          const merged = mergeWithDefaults(parsed);
          setState(merged);
        } else {
          persistState(defaultPortfolioState);
          setState(defaultPortfolioState);
        }
      } catch (error) {
        console.error("Failed to read stored portfolio data", error);
        setState(defaultPortfolioState);
      } finally {
        setIsHydrated(true);
      }
    };

    loadState();
  }, []);

  const updateState = (updater: (prev: PortfolioState) => PortfolioState) => {
    setState((prev) => {
      const next = updater(prev);
      persistState(next);
      return next;
    });
  };

  const value = useMemo<PortfolioContextValue>(() => {
    return {
      ...state,
      isHydrated,
      setProfilePhoto: (url) =>
        updateState((prev) => ({
          ...prev,
          profilePhoto: url,
        })),
      setNavbarIcon: (url) =>
        updateState((prev) => ({
          ...prev,
          navbarIcon: url,
        })),
      setLocation: (value) =>
        updateState((prev) => ({
          ...prev,
          location: value,
        })),
      setInstagramHandle: (value) =>
        updateState((prev) => ({
          ...prev,
          instagramHandle: value,
        })),
      setInstagramLink: (value) =>
        updateState((prev) => ({
          ...prev,
          instagramLink: value,
        })),
      setProfileStatus: (value) =>
        updateState((prev) => ({
          ...prev,
          profileStatus: value,
        })),
      setInstagramPhoto: (url) =>
        updateState((prev) => ({
          ...prev,
          instagramPhoto: url,
        })),
      setProjectSectionTitle: (key, value) =>
        updateState((prev) => ({
          ...prev,
          projectSectionTitles: {
            ...prev.projectSectionTitles,
            [key]: value,
          },
        })),
      upsertProject: async (project) => {
        const projectWithId: Project = { ...project, id: ensureId(project.id) };
        updateState((prev) => {
          const exists = prev.projects.some((item) => item.id === projectWithId.id);
          const projects = exists
            ? prev.projects.map((item) => (item.id === projectWithId.id ? projectWithId : item))
            : [projectWithId, ...prev.projects];
          return { ...prev, projects };
        });
      },
      deleteProject: async (id) => {
        updateState((prev) => ({
          ...prev,
          projects: prev.projects.filter((projectItem) => projectItem.id !== id),
        }));
      },
      upsertStack: async (stack) => {
        const stackWithId: StackIcon = { ...stack, id: ensureId(stack.id) };
        updateState((prev) => {
          const exists = prev.stacks.some((item) => item.id === stackWithId.id);
          const stacks = exists
            ? prev.stacks.map((item) => (item.id === stackWithId.id ? stackWithId : item))
            : [...prev.stacks, stackWithId];
          return { ...prev, stacks };
        });
      },
      deleteStack: async (id) => {
        updateState((prev) => ({
          ...prev,
          stacks: prev.stacks.filter((stack) => stack.id !== id),
        }));
      },
      upsertContact: async (contact) => {
        const contactWithId: ContactLink = { ...contact, id: ensureId(contact.id) };
        updateState((prev) => {
          const exists = prev.contacts.some((item) => item.id === contactWithId.id);
          const contacts = exists
            ? prev.contacts.map((item) => (item.id === contactWithId.id ? contactWithId : item))
            : [...prev.contacts, contactWithId];
          return { ...prev, contacts };
        });
      },
      deleteContact: async (id) => {
        updateState((prev) => ({
          ...prev,
          contacts: prev.contacts.filter((contact) => contact.id !== id),
        }));
      },
    };
  }, [state, isHydrated]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}

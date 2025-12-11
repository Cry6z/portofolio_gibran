import { PortfolioState } from "@/lib/portfolio-types";

export const defaultPortfolioState: PortfolioState = {
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
  instagramPhoto: "/profile.svg",
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
      highlight: true,
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
      highlight: true,
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
      highlight: true,
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

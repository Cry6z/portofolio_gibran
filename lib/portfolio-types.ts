export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  image: string;
  link: string;
  highlight?: boolean;
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
  skillsDescription: string;
  stackDescription: string;
  projectSectionTitles: {
    solo: string;
    team: string;
  };
  instagramHandle: string;
  instagramLink: string;
  profileStatus: string;
  instagramPhoto: string;
  projects: Project[];
  stacks: StackIcon[];
  contacts: ContactLink[];
};

export type JourneyItem = {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  icon?: string;
};

export const journey: JourneyItem[] = [
  {
    id: "j01",
    index: "01",
    title: "START",
    subtitle: "Programming fundamentals",
    icon: "ph-rocket-launch",
  },
  {
    id: "j02",
    index: "02",
    title: "LEARN",
    subtitle: "Languages & technologies",
    icon: "ph-code",
  },
  {
    id: "j03",
    index: "03",
    title: "BUILD",
    subtitle: "Real projects",
    icon: "ph-folder",
  },
  {
    id: "j04",
    index: "04",
    title: "FULL-STACK",
    subtitle: "Frontend + Backend + Database",
    icon: "ph-stack",
  },
  {
    id: "j05",
    index: "05",
    title: "ENGINEER",
    subtitle: "Architecture, APIs, real-time systems",
    icon: "ph-tree-structure",
  },
  {
    id: "j06",
    index: "06",
    title: "CLOUD",
    subtitle: "Azure, Docker & CI/CD",
    icon: "ph-cloud",
  },
  {
    id: "j07",
    index: "07",
    title: "SOFTWARE ENGINEERING",
    subtitle: "NSBM — BSc (Hons) Software Engineering",
    icon: "ph-graduation-cap",
  },
  {
    id: "j08",
    index: "08",
    title: "NOW",
    subtitle: "Building real-world software",
    icon: "ph-laptop",
  },
  {
    id: "j09",
    index: "09",
    title: "GROWING",
    subtitle: "Continuous improvement",
    icon: "ph-chart-line-up",
  },
  {
    id: "j10",
    index: "10",
    title: "NEXT",
    subtitle: "Growing into a stronger software engineer",
    icon: "ph-target",
  },
];

export default journey;
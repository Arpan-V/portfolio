export type ProjectShowcase = {
  id: number;
  title: string;
  duration: string;
  rating: string;
  image: string;
};

export const projectShowcase: ProjectShowcase[] = [
  {
    id: 1,
    title: "Neural Dashboard",
    duration: "6 weeks",
    rating: "4.9/5",
    image: "/images/projects/project-1.jpg",
  },
  {
    id: 2,
    title: "Cloud Orchestrator",
    duration: "9 weeks",
    rating: "4.8/5",
    image: "/images/projects/project-2.jpg",
  },
  {
    id: 3,
    title: "API Gateway",
    duration: "4 weeks",
    rating: "4.9/5",
    image: "/images/projects/project-3.jpg",
  },
  {
    id: 4,
    title: "ML Pipeline",
    duration: "7 weeks",
    rating: "4.7/5",
    image: "/images/projects/project-4.jpg",
  },
];

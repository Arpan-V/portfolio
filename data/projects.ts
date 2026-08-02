import type { StaticImageData } from "next/image";

import project1 from "@/public/images/projects/project-12.jpg";
import project2 from "@/public/images/projects/project-2.jpg";
import project3 from "@/public/images/projects/project-3.jpg";


export type Project = {
  id: number;
  title: string;
  category?: string;
  description: string;
  technologies: string[];
  image: StaticImageData;
  imageAlt: string;
  span: 1 | 2;
  /** Internal route (e.g. "/projects/lens") or external URL. Optional. */
  href?: string;
  /** Label for the card's call-to-action. Defaults to "View project". */
  linkLabel?: string;
};

export const projects: Project[] = [
  
  {
  id: 2,
  title: "LINK_PARSER_API",
  description:
    "Spring Boot API that parses web pages and extracts SEO and content metadata including page titles, meta descriptions, H1 tags, image alt text, and approximate word count.",
  technologies: ["JAVA", "SPRING_BOOT", "JSOUP"],
  image: project2,
  imageAlt: "Link Parser API project preview",
  span: 1,
  href: "/projects/lens",
},

{
  id: 3,
  title: "JAVA_HANGMAN",
  description:
    "A console-based Hangman game built with Java, featuring random word selection, file-based word loading, letter guessing, win and loss detection, and progressive hangman artwork.",
  technologies: ["JAVA", "FILE_IO"],
  image: project3,
  imageAlt: "Java Hangman game project preview",
  span: 1,
  href: "/projects/hangman-game",
},

{
  id: 1,
  title: "SHOPSMART",
  description:
    "Full-stack e-commerce application with a React and Vite frontend and a production-style Spring Boot backend featuring JWT authentication, Google OAuth, role-based access, PostgreSQL, optimized APIs, and Docker.",
  technologies: [
    "REACT",
    "VITE",
    "JAVA",
    "SPRING_BOOT",
    "POSTGRESQL",
    "JWT",
    "DOCKER",
  ],
  image: project1,
  imageAlt: "ShopSmart full-stack e-commerce application preview",
  span: 2,
  href: "https://av-shopsmart.vercel.app/",
},

  // {
  //   id: 4,
//    category: "Backend_API",
  //   title: "GRAPH_SCHEMA_VIZ",
  //   description:
  //     "Interactive schema visualizer for GraphQL and Neo4j. Handles schemas with 500+ nodes without UI lag.",
  //   technologies: ["REACT", "D3.JS", "NEO4J"],
  //   image: project4,
  //   imageAlt: "GRAPH_SCHEMA_VIZ project preview",
  //   span: 2,
  // },
];

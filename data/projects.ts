import type { StaticImageData } from "next/image";

import project1 from "@/public/images/projects/project-12.jpg";
import project2 from "@/public/images/projects/project-2.jpg";
import project3 from "@/public/images/projects/project-3.jpg";
import project4 from "@/public/images/projects/project-4.jpg";

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
    id: 1,
    title: "NEURAL_STREAM V4",
    description:
      "Real-time processing engine for high-frequency trading data, utilizing Kafka and specialized Go routines for 2ms latency.",
    technologies: ["GO_1.21", "APACHE_KAFKA", "KUBERNETES", "PROMETHEUS"],
    image: project1,
    imageAlt: "NEURAL_STREAM V4 project preview",
    span: 2,
    
  },
  {
    id: 2,
    title: "SENTINEL_AUTH",
    category: "SaaS_Product",
    description:
      "Zero-trust authentication provider built as a sidecar proxy for microservices. Integrated with AWS KMS.",
    technologies: ["RUST", "AWS_SDK"],
    image: project2,
    imageAlt: "SENTINEL_AUTH project preview",
    span: 1,
    href: "/projects/lens",
  },
  {
    id: 3,
    title: "PY_FLOW_GEN",
    category: "Open_Source",
    description:
      "A minimalist Python library for generating DAG-based workflows with native typing and async support.",
    technologies: ["PYTHON_3.11", "PYPI"],
    image: project1,
    imageAlt: "PY_FLOW_GEN project preview",
    span: 1,
  },
  {
    id: 4,
    title: "GRAPH_SCHEMA_VIZ",
    description:
      "Interactive schema visualizer for GraphQL and Neo4j. Handles schemas with 500+ nodes without UI lag.",
    technologies: ["REACT", "D3.JS", "NEO4J"],
    image: project4,
    imageAlt: "GRAPH_SCHEMA_VIZ project preview",
    span: 2,
  },
];

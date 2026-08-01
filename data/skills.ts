import type { ComponentType, SVGProps } from "react";

import {
  JavaIcon,
  CIcon,
  CppIcon,
  PythonIcon,
  JavaScriptIcon,
  HtmlIcon,
  CssIcon,
  SpringIcon,
  SpringBootIcon,
  SpringSecurityIcon,
  ReactIcon,
  GithubActionsIcon,
  GitIcon,
  GithubIcon,
  LinuxIcon,
  CodespacesIcon,
} from "./skills-icons";

export type Skill = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
};

export const languages: Skill[] = [
  { label: "Java", Icon: JavaIcon, color: "#E76F00" },
  { label: "C", Icon: CIcon, color: "#A8B9CC" },
  { label: "C++", Icon: CppIcon, color: "#00599C" },
  { label: "Python", Icon: PythonIcon, color: "#3776AB" },
  { label: "JavaScript", Icon: JavaScriptIcon, color: "#F7DF1E" },
  { label: "HTML5", Icon: HtmlIcon, color: "#E34F26" },
  { label: "CSS3", Icon: CssIcon, color: "#1572B6" },
];

export const frameworks: Skill[] = [
  {
    label: "Spring Boot",
    Icon: SpringBootIcon,
    color: "#6DB33F",
  },
  {
    label: "Spring Data JPA",
    Icon: SpringIcon,
    color: "#6DB33F",
  },
  {
    label: "Spring Security",
    Icon: SpringSecurityIcon,
    color: "#6DB33F",
  },
  {
    label: "React",
    Icon: ReactIcon,
    color: "#61DAFB",
  },
];

export const environment: Skill[] = [
  {
    label: "Linux",
    Icon: LinuxIcon,
    color: "#FCC624",
  },
  {
    label: "GitHub Codespaces",
    Icon: CodespacesIcon,
    color: "#FFFFFF",
  },
];

export const devops: Skill[] = [
  {
    label: "GitHub Actions",
    Icon: GithubActionsIcon,
    color: "#2088FF",
  },
  {
    label: "Git",
    Icon: GitIcon,
    color: "#F05032",
  },
  {
    label: "GitHub",
    Icon: GithubIcon,
    color: "#FFFFFF",
  },
];
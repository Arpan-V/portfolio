export type AboutStat = {
  value: string;
  label: string;
};

export type AboutInfo = {
  label: string;
  value: string;
};

export const aboutStats: AboutStat[] = [
  {
  value: "3+",
  label: "Years building",
},
{
  value: "∞",
  label: "Things to learn",
},
{
  value: "15+",
  label: "Technologies",
},
];

export const aboutStack: string[] = [
  "Java",
  "Spring Boot",
  "Kafka",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "React",
  "Vite",
  "Next.js",
  "GitHub"
];

export const aboutInfo: AboutInfo[] = [
  {
  label: "Building",
  value: "Full-stack applications & APIs",
},
{
  label: "Mindset",
  value: "Simple solutions, clean code, clear contracts",
},
// {
//   label: "Location",
//   value: "India",
// },
{
  label: "Stack",
  value: "Java, Spring Boot & Next.js/Vite",
},
];

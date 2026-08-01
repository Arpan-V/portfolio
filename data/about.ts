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
    value: "5+",
    label: "Years building",
  },
  {
    value: "40+",
    label: "Systems shipped",
  },
  {
    value: "12",
    label: "Teams collaborated",
  },
];

export const aboutStack: string[] = [
  "Java",
  "Spring Boot",
  "Kafka",
  "PostgreSQL",
  "AWS",
  "Kubernetes",
  "Redis",
  "GraphQL",
];

export const aboutInfo: AboutInfo[] = [
  {
    label: "Focus",
    value: "Distributed backends & platform work",
  },
  {
    label: "Approach",
    value: "Small commits, clear contracts, few surprises",
  },
  {
    label: "Based in",
    value: "Bengaluru, India",
  },
];

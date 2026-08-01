export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "Arpan Verma",
    jobTitle: "Software Engineer",

    description:
      "Software Engineer focused on building scalable, reliable backend systems and modern web applications.",

    // Add your domain later:
    // url: "https://yourdomain.com",

    // Add your professional profiles later:
     sameAs: [
       "https://github.com/arpan-v",
       "www.linkedin.com/in/arpan99",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
}
import type { Metadata } from "next";
import { Gate } from "@/components/gate/Gate";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.intro,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: ["Music Producer", "Data Analyst"],
    description: site.intro,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Gate />
    </>
  );
}

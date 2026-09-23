import { site } from '@/data/site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    additionalType: 'https://schema.org/EventPlanner',
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.address.addressLocality,
      addressRegion: site.contact.address.addressRegion,
      addressCountry: site.contact.address.addressCountry,
    },
    areaServed: 'Abuja, Nigeria',
    sameAs: [site.socials.instagram].filter((url) => !url.startsWith('{{')),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  };
}

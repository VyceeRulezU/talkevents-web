import { site } from '@/data/site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    additionalType: 'https://schema.org/EventPlanner',
    name: site.name,
    url: site.url,
    description: site.description,
    logo: new URL('/icon-512.png', site.url).toString(),
    image: new URL('/og-default.jpg', site.url).toString(),
    telephone: site.contact.phoneHref.replace('tel:', ''),
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.streetAddress,
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

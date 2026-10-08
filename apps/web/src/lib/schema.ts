import { founder, premierChilling, site } from '@/data/site';

const absolute = (path: string) => new URL(path, site.url).toString();
/** Stable identifiers so the Person and the Organisation point at each other. */
const organizationId = `${site.url}/#organization`;
const founderId = `${absolute(founder.path)}#${founder.anchor}`;
const premierChillingUrl = absolute(premierChilling.path);
const premierChillingId = `${premierChillingUrl}#organization`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': organizationId,
    additionalType: 'https://schema.org/EventPlanner',
    name: site.name,
    url: site.url,
    description: site.description,
    logo: new URL('/icon-512.png', site.url).toString(),
    founder: { '@type': 'Person', '@id': founderId, name: founder.name, jobTitle: founder.jobTitle, url: founderId },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 7 },
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

/** Profile of the founder, for the About page (name searches, knowledge panels). */
export function founderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absolute(founder.path),
    name: `${founder.name}, ${founder.jobTitle} of ${site.name}`,
    mainEntity: {
      '@type': 'Person',
      '@id': founderId,
      name: founder.name,
      givenName: founder.givenName,
      familyName: founder.familyName,
      jobTitle: founder.jobTitle,
      description: founder.description,
      image: absolute(founder.image),
      url: founderId,
      sameAs: founder.socials.map((social) => social.href),
      worksFor: [
        { '@type': 'Organization', '@id': organizationId, name: site.name, url: site.url },
        { '@type': 'Organization', '@id': premierChillingId, name: premierChilling.name, url: premierChillingUrl },
      ],
      knowsAbout: ['Event planning', 'Event coordination', 'Wedding planning', 'Corporate events'],
      workLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.contact.address.addressLocality,
          addressCountry: site.contact.address.addressCountry,
        },
      },
    },
  };
}

/** Premier Chilling Services, for its own page (brand-name searches). */
export function premierChillingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': premierChillingId,
    name: premierChilling.name,
    alternateName: 'Premier Chilling',
    slogan: premierChilling.slogan,
    description: premierChilling.description,
    url: premierChillingUrl,
    logo: absolute(premierChilling.logo),
    founder: { '@type': 'Person', '@id': founderId, name: founder.name },
    areaServed: 'Abuja, Nigeria',
    telephone: site.contact.phoneHref.replace('tel:', ''),
    email: site.contact.email,
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Event cooling services',
          description: 'Ice, chillers and cold storage for events, set up and managed on the day.',
          url: `${premierChillingUrl}#cooling`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Event drinks services',
          description: 'Drinks planning, supply points and service for events.',
          url: `${premierChillingUrl}#drinks`,
        },
      },
    ],
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

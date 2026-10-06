// Single source of truth for brand facts (NAP), navigation and socials.
// Anything not yet confirmed by the client is a tracked placeholder —
// see docs/open-questions.md before replacing.

export const site = {
  name: 'Talk Events',
  tagline: 'Your plan, perfectly executed',
  legalName: '{{PLACEHOLDER: legal name}}',
  url: 'https://talkevents.ng',
  description:
    'Talk Events plans and coordinates weddings, corporate events and celebrations in Abuja, so your day runs exactly as planned.',
  locale: 'en-NG',
  // Brand blue (--color-brand-primary) for browser chrome; meta tags can't read CSS tokens.
  themeColor: '#1A3870',
  currency: 'NGN',

  contact: {
    phone: '+234 817 747 7761',
    phoneHref: 'tel:+2348177477761',
    // Digits only, country code first: the format wa.me links need.
    whatsapp: '2348177477761',
    email: 'contact@talkevents.ng',
    address: {
      streetAddress: 'No. 14 Nike Lake Street, Maitama',
      addressLocality: 'Abuja',
      addressRegion: 'FCT',
      addressCountry: 'NG',
    },
    hours: '{{PLACEHOLDER: opening hours}}',
  },

  socials: {
    instagram: 'https://www.instagram.com/_talkevents',
    facebook: '{{PLACEHOLDER: Facebook URL}}',
    tiktok: '{{PLACEHOLDER: TikTok URL}}',
  },
} as const;

// The founder, as search engines should know her. One source for the About
// page copy, the Person structured data and the organisation's `founder`.
export const founder = {
  name: 'Pauline Okoye',
  givenName: 'Pauline',
  familyName: 'Okoye',
  jobTitle: 'CEO and Founder',
  image: '/images/team/pauline-okoye.webp',
  /** Where her profile lives on this site. */
  path: '/about',
  anchor: 'founder',
  /** Her own public profiles (tracking parameters removed). */
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pauline-okoye-9a936b93/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/paulineokoye_', icon: 'instagram' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@pauline_okoye08', icon: 'tiktok' },
  ],
  description:
    'Pauline Okoye is the CEO and Founder of Talk Events, an event planning and coordination company in Abuja, Nigeria, and the CEO of Premier Chilling Services. She has more than 12 years of experience in the events industry.',
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact Us', href: '/contact' },
];

// Kept off the primary nav but still linked from the footer so journal
// pages stay crawlable and internally linked (seo.md).
export const footerNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Book now', href: '/book' },
];

// Candidate services per PRD §10 FR-S3 — [CONFIRM] with client before launch.
export const serviceNav: NavLink[] = [
  { label: 'Wedding planning', href: '/services#weddings' },
  { label: 'Corporate events', href: '/services#corporate-events' },
  { label: 'Birthdays & milestones', href: '/services#celebrations' },
  { label: 'Cooling services', href: '/services#cooling' },
  { label: 'Drinks services', href: '/services#drinks' },
  { label: 'Ushering services', href: '/services#ushering' },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.contact.address.streetAddress}, ${site.contact.address.addressLocality}, Nigeria`,
)}`;

export const primaryCta: NavLink = { label: 'Book now', href: '/book' };
export const whatsappCtaLabel = 'Chat on WhatsApp';

export function whatsappHref(prefill?: string): string {
  const number = site.contact.whatsapp.startsWith('{{') ? '' : site.contact.whatsapp;
  const text = prefill ?? `Hi Talk Events, I'd like to plan an event.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

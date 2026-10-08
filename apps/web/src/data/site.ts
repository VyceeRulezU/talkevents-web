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

// Supabase project that stores enquiries. Both values are PUBLIC by design:
// the publishable key ships in every visitor's browser and can only do what
// the database rules allow (add an enquiry; never read one). The secret key
// must never appear in this repo.
export const supabase = {
  url: 'https://mwbzjqvnustgphxwlqyt.supabase.co',
  publishableKey: 'sb_publishable_j5p9FjiQxccNAic54Y91TA_0sNRW2Oi',
} as const;

// Photos, partner logos and other media are served from the R2 bucket, not
// from this site's own files. Upload with `node scripts/upload-media.mjs`.
export const mediaUrl = 'https://media.talkevents.ng';

/** Full address of a file in the media bucket: media('/images/hero.webp'). */
export function media(path: string): string {
  return `${mediaUrl}/${path.replace(/^\//, '')}`;
}

// The founder, as search engines should know her. One source for the About
// page copy, the Person structured data and the organisation's `founder`.
export const founder = {
  name: 'Pauline Okoye',
  givenName: 'Pauline',
  familyName: 'Okoye',
  jobTitle: 'CEO and Founder',
  image: media('/images/team/pauline-okoye.webp'),
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

// Sister company run by the founder. It has its own page on this site, which
// is where a search for it should land; the cooling and drinks sections of the
// services page link through to it.
export const premierChilling = {
  name: 'Premier Chilling Services',
  slogan: 'Perfectly chilled, every time',
  logo: media('/images/partners/premier-chilling-services.png'),
  path: '/premier-chilling',
  description:
    'Premier Chilling Services provides cooling and drinks services for events in Abuja, Nigeria: ice, chillers, cold storage and drinks service. It is led by Pauline Okoye and works alongside Talk Events.',
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
  { label: 'Premier Chilling', href: '/premier-chilling' },
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

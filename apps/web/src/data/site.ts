// Single source of truth for brand facts (NAP), navigation and socials.
// Anything not yet confirmed by the client is a tracked placeholder —
// see docs/open-questions.md before replacing.

export const site = {
  name: 'Talk Events',
  tagline: 'Your plan, perfectly executed',
  legalName: '{{PLACEHOLDER: legal name}}',
  url: 'https://talkevents.example',
  description:
    'Talk Events plans and coordinates weddings, corporate events and celebrations in Abuja, so your day runs exactly as planned.',
  locale: 'en-NG',
  currency: 'NGN',

  contact: {
    phone: '{{PLACEHOLDER: phone number}}',
    whatsapp: '{{PLACEHOLDER: WhatsApp number, e.g. 2348000000000}}',
    email: '{{PLACEHOLDER: email address}}',
    address: {
      streetAddress: '{{PLACEHOLDER: street address}}',
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

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

export const primaryCta: NavLink = { label: 'Book now', href: '/book' };
export const whatsappCtaLabel = 'Chat on WhatsApp';

export function whatsappHref(prefill?: string): string {
  const number = site.contact.whatsapp.startsWith('{{') ? '' : site.contact.whatsapp;
  const text = prefill ?? `Hi Talk Events, I'd like to plan an event.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

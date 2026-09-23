import { site } from '@/data/site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export function canonicalUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function absoluteImage(path: string): string {
  return new URL(path, site.url).toString();
}

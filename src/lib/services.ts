import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

// Service pages for one language, in display order, with their public URL.
export async function getServices(lang: Lang) {
  const entries = await getCollection(lang === 'el' ? 'services' : 'servicesEn');
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({ entry, href: lang === 'el' ? `/${entry.id}/` : `/en/${entry.id}/` }));
}

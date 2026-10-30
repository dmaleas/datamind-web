import site from '../data/site.json';
import type { Lang } from '../i18n';

// Structured data (schema.org JSON-LD) that helps Google show Datamind in local results and maps.
export function organization(lang: Lang) {
  const en = lang === 'en';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    email: site.email,
    telephone: site.phoneIntl,
    foundingDate: String(site.foundingYear),
    hasCredential: site.certifications.map((c) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: c })),
    sameAs: [site.facebook],
    department: site.locations.map((l, i) => ({
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#location-${i + 1}`,
      name: en ? l.nameEn : l.name,
      description: en ? 'Data recovery services' : 'Υπηρεσίες ανάκτησης δεδομένων',
      url: site.url,
      telephone: l.phones.map((ph) => ph.intl),
      email: site.email,
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: en ? l.streetEn : l.street,
        addressLocality: en ? l.cityEn : l.city,
        postalCode: l.postalCode,
        addressCountry: 'GR',
      },
      openingHours: l.openingHours,
      areaServed: { '@type': 'Country', name: en ? 'Greece' : 'Ελλάδα' },
    })),
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.url, site.url).href,
    })),
  };
}

export function service(name: string, description: string, url: string, lang: Lang = 'el') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Data recovery',
    url: new URL(url, site.url).href,
    provider: { '@id': `${site.url}/#organization` },
    inLanguage: lang === 'el' ? 'el-GR' : 'en',
    areaServed: { '@type': 'Country', name: lang === 'el' ? 'Ελλάδα' : 'Greece' },
  };
}

export function blogPosting(p: { title: string; description: string; date: Date; image?: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date.toISOString(),
    image: p.image ? new URL(p.image, site.url).href : undefined,
    url: new URL(p.url, site.url).href,
    inLanguage: 'el-GR',
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  };
}

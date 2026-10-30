export type Lang = 'el' | 'en';

// Greek URL <-> English URL, used for the language switch and hreflang tags.
export const alternates: Record<string, string> = {
  '/': '/en/',
  '/anaktisi-dedomenwn-datamind/': '/en/the-company-datamind/',
  '/diadikasia/': '/en/diadikasia_anaktisis/',
  '/pricetable/': '/en/pricetable/',
  '/epikoinwnia/': '/en/contact/',
  '/sklhroi-diskoi/': '/en/hard-disk-data-recovery/',
  '/ssd_disk/': '/en/ssd-data-recovery/',
  '/raid/': '/en/data-recovery-raid/',
  '/ananktisi-dedomenvn-apo-ransomwares/': '/en/ransomware-data-recovery/',
  '/ananktisi-dedomenvn-apo-virtual_machines/': '/en/virtual-machine-data-recovery/',
  '/ananktisi-dedomenvn-apo-tapes/': '/en/tape-data-recovery/',
  '/ananktisi-dedomenvn-apo-usb_sticks/': '/en/usb-flash-data-recovery/',
  '/ananktisi-dedomenvn-apo-sd_cards/': '/en/sd-card-data-recovery/',
  '/anaktisi-dedwmenwn-apo-cctv/': '/en/cctv-data-recovery/',
};

export function alternateOf(path: string): { el?: string; en?: string } {
  const p = path.endsWith('/') ? path : path + '/';
  if (alternates[p]) return { el: p, en: alternates[p] };
  const gr = Object.entries(alternates).find(([, en]) => en === p);
  if (gr) return { el: gr[0], en: p };
  return {};
}

export const ui = {
  el: {
    home: 'Αρχική',
    company: 'Η εταιρία',
    services: 'Υπηρεσίες',
    process: 'Διαδικασία',
    pricing: 'Κόστος',
    blog: 'Ιστολόγιο',
    contact: 'Επικοινωνία',
    phoneLabel: 'Τηλεφωνική επικοινωνία',
    processCta: 'Η διαδικασία ανάκτησης',
    readMore: 'Περισσότερα',
    menu: 'Μενού',
    pricingHeading: 'Κόστος υπηρεσιών',
    vat: '+ ΦΠΑ',
    freeShipping: 'Δωρεάν μεταφορά',
    freeDiagnosis: 'Δωρεάν διάγνωση',
    noDataNoCharge: 'Η χρέωση πραγματοποιείται αποκλειστικά εφόσον ολοκληρωθεί με επιτυχία η ανάκτηση των δεδομένων σας.',
    ctaHeading: 'Επικοινωνήστε με την ομάδα μας',
    ctaText: 'Οι μηχανικοί μας είναι στη διάθεσή σας για την αξιολόγηση της περίπτωσής σας και την παροχή άμεσης τεχνικής καθοδήγησης.',
    emailUs: 'Αποστολή email',
    hours: 'Ωράριο',
    phone: 'Τηλέφωνο',
    directions: 'Χάρτης',
    latestPosts: 'Πρόσφατα άρθρα',
    backToBlog: 'Όλα τα άρθρα',
    otherServices: 'Λοιπές υπηρεσίες',
    sideHeading: 'Δωρεάν διάγνωση',
    sidePoints: [
      'Διάγνωση εντός 1–2 εργάσιμων ημερών',
      'Δωρεάν παραλαβή μέσω courier',
      'Γραπτή προσφορά πριν από κάθε εργασία',
      'Χρέωση μόνο σε περίπτωση επιτυχίας',
    ],
    footerAbout: 'Εξειδικευμένες υπηρεσίες ανάκτησης δεδομένων για ιδιώτες, επιχειρήσεις και φορείς από το 2010. Έδρα: Επιστημονικό Πάρκο Πατρών.',
    otherLang: 'English',
    skip: 'Μετάβαση στο περιεχόμενο',
  },
  en: {
    home: 'Home',
    company: 'The company',
    services: 'Services',
    process: 'Process',
    pricing: 'Pricing',
    blog: 'Blog',
    contact: 'Contact',
    phoneLabel: 'Call',
    processCta: 'Our recovery process',
    readMore: 'Learn more',
    menu: 'Menu',
    pricingHeading: 'Pricing',
    vat: '+ VAT',
    freeShipping: 'Free shipping',
    freeDiagnosis: 'Free diagnosis',
    noDataNoCharge: 'Charges apply only when your data has been successfully recovered.',
    ctaHeading: 'Contact our team',
    ctaText: 'Our engineers are available to assess your case and provide immediate technical guidance.',
    emailUs: 'Send an email',
    hours: 'Business hours',
    phone: 'Telephone',
    directions: 'Map',
    latestPosts: 'Latest articles',
    backToBlog: 'All articles',
    otherServices: 'Other services',
    sideHeading: 'Free diagnosis',
    sidePoints: [
      'Diagnosis within 1–2 business days',
      'Free courier collection',
      'Written quotation before any work',
      'No data, no charge',
    ],
    footerAbout: 'Specialised data recovery services for individuals, businesses and public organisations since 2010. Headquarters: Patras Science Park, Greece.',
    otherLang: 'Ελληνικά',
    skip: 'Skip to content',
  },
} as const;

export function nav(lang: Lang) {
  const t = ui[lang];
  return lang === 'el'
    ? [
        { label: t.company, href: '/anaktisi-dedomenwn-datamind/' },
        { label: t.services, href: '/#services', services: true },
        { label: t.process, href: '/diadikasia/' },
        { label: t.pricing, href: '/pricetable/' },
        { label: t.blog, href: '/blog-anakthsh-dedomenwn/' },
        { label: t.contact, href: '/epikoinwnia/' },
      ]
    : [
        { label: t.company, href: '/en/the-company-datamind/' },
        { label: t.services, href: '/en/#services', services: true },
        { label: t.process, href: '/en/diadikasia_anaktisis/' },
        { label: t.pricing, href: '/en/pricetable/' },
        { label: t.contact, href: '/en/contact/' },
      ];
}

export type Lang = 'el' | 'en';

// Greek URL <-> English URL, used for the language switch and hreflang tags.
export const alternates: Record<string, string> = {
  '/': '/en/',
  '/anaktisi-dedomenwn-datamind/': '/en/the-company-datamind/',
  '/diadikasia/': '/en/diadikasia_anaktisis/',
  '/pricetable/': '/en/pricetable/',
  '/epikoinwnia/': '/en/contact/',
  '/raid/': '/en/data-recovery-raid/',
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
    allServices: 'Όλες οι υπηρεσίες',
    process: 'Διαδικασία',
    pricing: 'Κόστος',
    blog: 'Ιστολόγιο',
    contact: 'Επικοινωνία',
    call: 'Καλέστε',
    readMore: 'Περισσότερα',
    menu: 'Μενού',
    pricingHeading: 'Κόστος υπηρεσιών',
    freeShipping: 'Δωρεάν μεταφορά',
    freeDiagnosis: 'Δωρεάν διάγνωση',
    noDataNoCharge: 'Στη Datamind χρεώνουμε μόνο όταν ανακτηθούν τα δεδομένα σας.',
    ctaHeading: 'Επικοινωνήστε για άμεση τεχνική υποστήριξη',
    ctaText: 'Κάθε μέρα ένας εκπρόσωπός μας είναι έτοιμος να σας εξυπηρετήσει. Περιγράψτε μας το πρόβλημα και μάθετε αμέσως πώς μπορούμε να βοηθήσουμε.',
    emailUs: 'Στείλτε email',
    hours: 'Ωράριο',
    directions: 'Οδηγίες χάρτη',
    latestPosts: 'Πρόσφατα άρθρα',
    backToBlog: 'Όλα τα άρθρα',
    relatedService: 'Σχετική υπηρεσία',
    footerAbout: 'Ανάκτηση δεδομένων για ιδιώτες και επιχειρήσεις από το 2010. Έδρα στο Επιστημονικό Πάρκο Πατρών.',
    langName: 'Ελληνικά',
    otherLang: 'English',
    notFound: 'Η σελίδα δεν βρέθηκε',
  },
  en: {
    home: 'Home',
    company: 'The company',
    services: 'Services',
    allServices: 'All services',
    process: 'Process',
    pricing: 'Pricing',
    blog: 'Blog',
    contact: 'Contact',
    call: 'Call',
    readMore: 'Read more',
    menu: 'Menu',
    pricingHeading: 'Pricing',
    freeShipping: 'Free shipping',
    freeDiagnosis: 'Free diagnosis',
    noDataNoCharge: 'No data, no charge: you only pay if we recover your data.',
    ctaHeading: 'Contact us for immediate help',
    ctaText: 'An engineer is available every day. Tell us what happened and find out right away how we can help.',
    emailUs: 'Email us',
    hours: 'Hours',
    directions: 'Directions',
    latestPosts: 'Latest posts',
    backToBlog: 'All posts',
    relatedService: 'Related service',
    footerAbout: 'Data recovery for individuals and businesses since 2010. Based at the Patras Science Park, Greece.',
    langName: 'English',
    otherLang: 'Ελληνικά',
    notFound: 'Page not found',
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

// English names for the service cards on /en/. Only RAID has an English page so far;
// the rest link to the Greek page until an English version is written.
export const servicesEn: Record<string, { title: string; text: string; href?: string }> = {
  'sklhroi-diskoi': { title: 'Hard disks', text: 'Mechanical, electronic and logical failures, every make.' },
  ssd_disk: { title: 'SSD disks', text: 'Controller, firmware and NAND failures on SATA, M.2 and NVMe.' },
  raid: { title: 'RAID / NAS', text: 'Arrays and servers rebuilt without the original controller.', href: '/en/data-recovery-raid/' },
  'ananktisi-dedomenvn-apo-ransomwares': { title: 'Ransomware', text: 'Encrypted files recovered without paying the ransom.' },
  'ananktisi-dedomenvn-apo-virtual_machines': { title: 'Virtual machines', text: 'VMware, Hyper-V, XEN and Oracle VM, VMFS and vmdk files.' },
  'ananktisi-dedomenvn-apo-tapes': { title: 'Tapes', text: 'LTO, DLT, DAT, AIT and legacy formats without the original drive.' },
  'ananktisi-dedomenvn-apo-usb_sticks': { title: 'USB flash disks', text: 'Sticks that ask for a format, are not recognised or are broken.' },
  'ananktisi-dedomenvn-apo-sd_cards': { title: 'SD / microSD', text: 'Photos and videos from cards that are no longer recognised.' },
  'anaktisi-dedwmenwn-apo-cctv': { title: 'CCTV', text: 'Footage from DVR/NVR recorders after format, flood or fire.' },
};

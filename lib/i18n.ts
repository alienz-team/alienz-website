// Locale plumbing shared by server and client code. The chosen locale lives in
// a cookie (so the server renders the right language and direction on the
// first byte) and is mirrored to localStorage by the switcher.

import { about, brand, contact, hero, method, nav, pillars, projectCategories, type Pillar } from "./content";

export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_COOKIE = "lang";

export const isLocale = (v: unknown): v is Locale => v === "ar" || v === "en";
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

type Translated = { title: string; description: string };

const pillarEn: Record<string, Partial<Pillar>> = {
  software: {
    title: "Software Engineering",
    blurb: "Sites, apps and dashboards built to grow with your business: clean code, fast on every screen, deployed on cloud infrastructure.",
    metric: { value: "4.2B", label: "monthly requests our cloud stack can absorb" },
    gauge: { pct: 99.9, label: "Server uptime" },
  },
  ai: {
    title: "AI Solutions",
    blurb: "Smart assistants that understand your company's data, and agents that team up to handle repetitive work for you.",
    points: ["Arabic chat assistant on your site or WhatsApp", "Workflow automation across your tools", "Language models wired to your company data"],
    gauge: { pct: 87, label: "Tasks automated" },
  },
  brand: { title: "UI/UX & Brand Identity", blurb: "Easy-to-use interfaces, and an identity that introduces your brand from logo to print." },
  motion: { title: "Motion Graphics", blurb: "Short animated videos that explain your idea or promote your product." },
  photo: { title: "Photo & Video Editing", blurb: "Product and event shoots, then editing and grading ready to publish." },
  audio: { title: "Audio Recording", blurb: "Voice-over and ad recording at studio quality." },
  marketing: {
    title: "Marketing Services",
    blurb: "Reach your exact target audience with well-planned, effective targeting.",
    points: ["Marketing consulting & solutions", "Building and growing marketing plans", "Content writing and management", "Ad campaigns on search engines and social media"],
    metric: { value: "360°", label: "presence on every platform" },
  },
};

const ar = {
  locale: "ar" as Locale,
  brand: { tagline: brand.tagline, logoAlt: brand.logoAlt },
  nav: nav.map((n): { href: string; label: string } => ({ ...n })),
  hero: { ...hero, stats: { services: "خدمات متاحة", works: "أعمال منشورة", clock: "التوقيت في طرابلس" } },
  heroAlt: "فضائيون بسماعات رأس يبرمجون على شاشات هولوغرافية وسط مطر من الشيفرات الخضراء",
  pillars: pillars as Pillar[],
  categories: Object.fromEntries(projectCategories.map((c) => [c.id, c.label])) as Record<string, string>,
  method: { title: method.title, intro: method.intro, steps: method.steps, stack: method.stack, toolsTitle: "أدوات نعمل بها" },
  about: { lead: about.lead, team: about.paragraphs[1], reassurance: about.reassurance },
  location: contact.location,
  socials: Object.fromEntries(contact.socials.map((s) => [s.icon, s.label])) as Record<string, string>,
  services: {
    heading: "كل ما يحتاجه مشروعك الرقمي، من فريق واحد",
    consult: "اطلب استشارة",
  },
  work: {
    heading: "من أعمالنا",
    published: "أعمال منشورة",
    intro: "حملات وتصاميم نفذناها لعملائنا ولعلامتنا. اختر عملاً لتراه كاملاً.",
    filterLabel: "تصفية الأعمال حسب النوع",
    all: "الكل",
    details: "عرض التفاصيل",
    similar: "اطلب عملاً مشابهاً",
    close: "إغلاق",
    of: "من",
    prev: "العمل السابق",
    next: "العمل التالي",
  },
  contactSection: {
    heading: "احكِ لنا عن مشروعك",
    whatsapp: "راسلنا على واتساب",
    whatsappSub: "أسرع طريقة للوصول إلينا",
    whatsappText: "مرحباً ALIENZ TEAM، أريد استشارة بخصوص مشروع.",
    socialsLabel: "حساباتنا على مواقع التواصل",
    honeypot: "اترك هذا الحقل فارغاً",
    name: "الاسم",
    replyTo: "البريد أو الهاتف",
    service: "الخدمة",
    notSure: "لست متأكداً بعد",
    areas: "المجالات",
    specific: "خدمات محددة",
    message: "صف مشروعك",
    placeholder: "مثلاً: أحتاج متجراً إلكترونياً لمحلي في طرابلس…",
    sending: "جارٍ الإرسال…",
    submit: "أرسل طلب الاستشارة",
    hint: "تصلنا رسالتك مباشرة ونرد عليك على البريد أو الهاتف.",
  },
  header: {
    home: "الصفحة الرئيسية",
    mainNav: "القائمة الرئيسية",
    mobileNav: "قائمة الجوال",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    cta: contact.cta,
  },
  footer: { links: "روابط التذييل", rights: "حقوق النشر © {year} جميع الحقوق محفوظة." },
  controls: {
    switchTo: "English",
    switchToShort: "EN",
    switchLabel: "Switch to English",
    themeDark: "التبديل إلى الوضع الداكن",
    themeLight: "التبديل إلى الوضع الفاتح",
    install: "تثبيت التطبيق",
    installTitle: "تثبيت ALIENZ TECH",
    iosSteps: [
      "اضغط زر المشاركة في شريط Safari.",
      "اختر «إضافة إلى الشاشة الرئيسية».",
      "اضغط «إضافة» ليظهر التطبيق بين تطبيقاتك.",
    ],
    otherSteps: [
      "افتح قائمة المتصفح (⋮ أو ⋯).",
      "اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».",
    ],
    gotIt: "حسناً",
  },
  skip: "تخطَّ إلى المحتوى",
  /** English copies of DB rows, keyed by service slug / project image. */
  serviceText: {} as Record<string, Translated>,
  projectText: {} as Record<string, { title: string; alt: string }>,
};

export type Dict = typeof ar;

const en: Dict = {
  locale: "en",
  brand: { tagline: "The art of code and design", logoAlt: "ALIENZ TEAM logo: an alien head with headphones inside a green bulb" },
  nav: [
    { href: "#top", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "How we work" },
    { href: "#contact", label: "Contact" },
  ],
  hero: {
    badge: "A tech team from Tripoli, Libya",
    lead: "We build software and AI systems, and design identities and campaigns that reach your audience.",
    primary: "Start your project",
    secondary: "Browse our work",
    coords: hero.coords,
    stats: { services: "Services", works: "Published works", clock: "Time in Tripoli" },
  },
  heroAlt: "Aliens in headsets coding on holographic screens in a rain of green code",
  pillars: pillars.map((p) => ({ ...p, ...pillarEn[p.id] })),
  categories: {
    software: "Software",
    brand: "Brand identity",
    social: "Social ads",
    strategy: "Strategy & targeting",
    campaigns: "Campaigns",
  },
  method: {
    title: "How we work",
    intro: "Even if you're not sure what you're looking for, or your ideas are still taking shape, reach out — we'll get you there.",
    steps: [
      { title: "We understand your idea", body: "A short session to pin down the goal, audience and budget — even if the idea isn't clear yet." },
      { title: "We plan and design", body: "A sitemap or campaign plan plus prototypes you can see and comment on before we build." },
      { title: "We build and test", body: "Short delivery cycles with a staging version so you can follow progress as it happens." },
      { title: "We launch and follow up", body: "Go-live, measured results, and post-launch support for any change you need." },
    ],
    stack: [
      { group: "Engineering", tools: method.stack[0].tools },
      { group: "AI", tools: method.stack[1].tools },
      { group: "Design & production", tools: method.stack[2].tools },
      { group: "Marketing", tools: method.stack[3].tools },
    ],
    toolsTitle: "Tools we use",
  },
  about: {
    lead: "A crew of young professionals brought together by a love of craft",
    team: "We have the tools and the skilled hands to deliver projects with top performance, fast.",
    reassurance: "Even if you're not sure what you're looking for, or you're torn between ideas, don't hesitate to reach out — we'll make sure you get there.",
  },
  location: "Tripoli, Libya",
  socials: { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" },
  services: { heading: "Everything your digital project needs, from one team", consult: "Book a consultation" },
  work: {
    heading: "Our work",
    published: "published works",
    intro: "Campaigns and designs we made for clients and for our own brand. Pick one to see it in full.",
    filterLabel: "Filter work by type",
    all: "All",
    details: "View details",
    similar: "Request something similar",
    close: "Close",
    of: "of",
    prev: "Previous work",
    next: "Next work",
  },
  contactSection: {
    heading: "Tell us about your project",
    whatsapp: "Message us on WhatsApp",
    whatsappSub: "The fastest way to reach us",
    whatsappText: "Hi ALIENZ TEAM, I'd like a consultation about a project.",
    socialsLabel: "Our social accounts",
    honeypot: "Leave this field empty",
    name: "Name",
    replyTo: "Email or phone",
    service: "Service",
    notSure: "Not sure yet",
    areas: "Areas",
    specific: "Specific services",
    message: "Describe your project",
    placeholder: "e.g. I need an online store for my shop in Tripoli…",
    sending: "Sending…",
    submit: "Send consultation request",
    hint: "Your message reaches us directly and we reply by email or phone.",
  },
  header: {
    home: "home page",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Contact us",
  },
  footer: { links: "Footer links", rights: "Copyright © {year} All rights reserved." },
  controls: {
    switchTo: "العربية",
    switchToShort: "ع",
    switchLabel: "التبديل إلى العربية",
    themeDark: "Switch to dark mode",
    themeLight: "Switch to light mode",
    install: "Install app",
    installTitle: "Install ALIENZ TECH",
    iosSteps: [
      "Tap the Share button in Safari's toolbar.",
      "Choose “Add to Home Screen”.",
      "Tap “Add” and the app joins your home screen.",
    ],
    otherSteps: ["Open your browser menu (⋮ or ⋯).", "Choose “Install app” or “Add to Home screen”."],
    gotIt: "Got it",
  },
  skip: "Skip to content",
  serviceText: {
    web: { title: "Website design & development", description: "Company sites, stores and dashboards, designed and built to run fast on every screen." },
    mobile: { title: "Mobile app design & development", description: "Android and iOS apps, from interface design to store release." },
    identity: { title: "Brand identity & print design", description: "A logo, colours and type that introduce your brand, plus every print-ready asset you need." },
    motion: { title: "Motion graphics & promo video", description: "Short animated videos that explain your idea or promote your product on screens and social media." },
    photo: { title: "Professional photography & editing", description: "Product, event and interview shoots, then editing and grading until it's ready to publish." },
    audio: { title: "Professional audio recording", description: "Voice-over and ad recording at studio quality, with processing and mixing." },
    ai: { title: "AI solutions", description: "Smart assistants that understand your company's data, and agents that team up to handle repetitive work for you." },
    marketing: { title: "Marketing services", description: "Reach your exact target audience with well-planned targeting and campaigns across search and social." },
  },
  projectText: {
    "/media/album-1.webp": { title: "Space marketing", alt: "The space marketing tool: get your message to anyone on the planet" },
    "/media/album-2.webp": { title: "Digital marketing services", alt: "We offer digital marketing services" },
    "/media/album-3.webp": { title: "Reaching your audience", alt: "Full, precise reach to your target audience with well-planned targeting" },
    "/media/album-4.webp": { title: "Your ad on every platform", alt: "Show your ad across every social channel and site" },
    "/media/album-5.webp": { title: "Marketing services bundle", alt: "Our services: marketing consulting, marketing plans, content writing and ad campaigns" },
    "/media/album-6.webp": { title: "Order our services", alt: "To order: alienz.tech, Facebook Alienz Team and Instagram alienz_ly" },
    "/media/album-7.webp": { title: "ALIENZ TECH website", alt: "Design and build of the ALIENZ TECH website: a cyberpunk interface with aliens coding on holographic screens" },
  },
};

const dictionaries: Record<Locale, Dict> = { ar, en };
export const getDictionary = (l: Locale): Dict => dictionaries[l];


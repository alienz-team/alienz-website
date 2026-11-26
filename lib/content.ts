// All copy and contact details come from the original site
// (https://63e4ff66d95e5.site123.me/). Tatweel stretching was removed and
// obvious spelling slips corrected (e.g. تنفيد → تنفيذ, ادا → إذا).
// Service descriptions are new: the original only listed titles.

export const brand = {
  name: "ALIENZ TEAM",
  /** Wordmark shown in the header. */
  mark: "ALIENZ TECH",
  tagline: "فنون البرمجة والتصميم",
  logoAlt: "شعار ALIENZ TEAM: رأس فضائي بسماعات داخل مصباح أخضر",
};

export const nav = [
  { href: "#top", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#work", label: "الأعمال" },
  { href: "#process", label: "كيف نعمل" },
  { href: "#contact", label: "تواصل معنا" },
] as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "تصميم وبرمجة المواقع الإلكترونية",
    description:
      "مواقع تعريفية ومتاجر ولوحات تحكم، نصممها ونبرمجها لتعمل بسرعة على كل الشاشات.",
    image: "/media/cyber/software.svg",
  },
  {
    id: "mobile",
    title: "تصميم وبرمجة تطبيقات الموبايل",
    description:
      "تطبيقات لأندرويد وiOS، من رسم الواجهات وحتى النشر على المتاجر.",
    image: "/media/cyber/software.svg",
  },
  {
    id: "identity",
    title: "تصميم الهوية البصرية والمطبوعات",
    description:
      "شعار وألوان وخطوط تعرّف بعلامتك، مع كل ما تحتاجه من مطبوعات جاهزة للطباعة.",
    image: "/media/cyber/brand.svg",
  },
  {
    id: "motion",
    title: "تصميم الموشن جرافيك والفيديو الدعائي",
    description:
      "فيديوهات قصيرة متحركة تشرح فكرتك أو تروّج لمنتجك على الشاشات ومواقع التواصل.",
    image: "/media/cyber/motion.svg",
  },
  {
    id: "photo",
    title: "التصوير والمونتاج الاحترافي",
    description:
      "تصوير منتجات وفعاليات ومقابلات، ثم مونتاج وتلوين حتى تصبح المادة جاهزة للنشر.",
    image: "/media/cyber/photo.svg",
  },
  {
    id: "audio",
    title: "التسجيل الصوتي الاحترافي",
    description:
      "تعليق صوتي وتسجيل إعلانات بجودة استوديو، مع المعالجة والمكساج.",
    image: "/media/cyber/audio.svg",
  },
  {
    id: "ai",
    title: "حلول الذكاء الاصطناعي",
    description:
      "مساعدون أذكياء يفهمون بيانات شركتك، ووكلاء يتعاونون لإنجاز المهام المتكررة بدلاً من فريقك.",
    image: "/media/cyber/ai.svg",
  },
  {
    id: "marketing",
    title: "خدمات التسويق",
    description:
      "الوصول الكامل للفئة المستهدفة بكل دقة، بخطط استهداف مدروسة وحملات على محركات البحث ووسائل التواصل.",
    image: "/media/cyber/marketing.svg",
  },
];

export const marketing = {
  intro: "الوصول الكامل للفئة المستهدفة بكل دقة، بخطط استهداف مدروسة وفعّالة.",
  offerings: [
    "الاستشارات والحلول التسويقية",
    "إنشاء وتطوير خطط التسويق",
    "كتابة المحتوى وإدارته",
    "الحملات الإعلانية على محركات البحث ووسائل التواصل الاجتماعي",
  ],
  album: [
    { title: "التسويق الفضائي", src: "/media/album-1.webp", w: 880, h: 560, alt: "أداة التسويق الفضائي: لإيصال رسالتك لكل من تريد فوق الكوكب" },
    { title: "خدمات التسويق الإلكتروني", src: "/media/album-2.webp", w: 1600, h: 900, alt: "نقدم لكم خدمات التسويق الإلكتروني" },
    { title: "الوصول للفئة المستهدفة", src: "/media/album-3.webp", w: 1600, h: 900, alt: "الوصول الكامل للفئة المستهدفة بكل دقة: خطط استهداف مدروسة وفعالة" },
    { title: "إعلانك على كل المنصات", src: "/media/album-4.webp", w: 1600, h: 900, alt: "اعرض إعلانك في كافة قناة ومواقع التواصل الاجتماعي" },
    { title: "باقة الخدمات التسويقية", src: "/media/album-5.webp", w: 1600, h: 900, alt: "خدماتنا: الاستشارات التسويقية، خطط التسويق، كتابة المحتوى، والحملات الإعلانية" },
    { title: "اطلب خدماتنا", src: "/media/album-6.webp", w: 1600, h: 900, alt: "لطلب خدماتنا: alienz.tech وفيسبوك Alienz Team وإنستغرام alienz_ly" },
    { title: "موقع ALIENZ TECH", src: "/media/album-7.webp", w: 1600, h: 893, alt: "تصميم وبرمجة موقع ALIENZ TECH: واجهة سايبربانك بفضائيين يبرمجون على شاشات هولوغرافية" },
  ],
};

export const about = {
  lead: "مجموعة من الشباب المحترف جمعنا حب الفن والعمل",
  paragraphs: [
    "نعمل في مجالات التقنية والحلول الرقمية ومجال الدعاية والإعلان.",
    "نملك الأدوات والأيادي الاحترافية التي تمكننا من تنفيذ المشاريع بأفضل أداء وأسرع وقت.",
  ],
  reassurance:
    "حتى إذا لم تعرف ما الذي تبحث عنه أو أنك حائر في أفكارك، لا تتردد بالتواصل معنا ونحن نضمن لك الوصول بإذن الله.",
};

export const contact = {
  location: "طرابلس، ليبيا",
  phoneDisplay: "+218-0915671934",
  phoneHref: "tel:+218915671934",
  email: "alienzteam7@gmail.com",
  cta: "اتصل بنا",
  socials: [
    { label: "فيسبوك", href: "https://www.facebook.com/alien5team", icon: "facebook" },
    { label: "إنستغرام", href: "https://www.instagram.com/alienz_ly/", icon: "instagram" },
    { label: "لينكدإن", href: "https://www.linkedin.com/in/alienz-team-21ab75236", icon: "linkedin" },
  ] as const,
};

export const hero = {
  badge: "فريق تقني من طرابلس، ليبيا",
  lead: "نبني البرمجيات وأنظمة الذكاء الاصطناعي، ونصمم هويات وحملات تصل لجمهورك.",
  primary: "ابدأ مشروعك",
  secondary: "تصفح أعمالنا",
  // Tripoli, Libya.
  coords: "32.8872° N  13.1913° E",
};

/** The seven service cards of the bento grid. `slugs` pull the matching
 *  services from the database into each card; a single-service card shows
 *  that service's (admin-editable) description as its blurb. */
export type Pillar = {
  id: string;
  title: string;
  en: string;
  blurb: string;
  slugs: string[];
  /** Neon HUD visual at the top of the card (static SVG). */
  image: string;
  points?: readonly string[];
  /** Services added later in /admin with no card of their own land here. */
  catchAll?: boolean;
  /** Rolling odometer readout. Showcase figures: replace with real numbers. */
  metric?: { value: string; label: string };
  /** Radial gauge, 0-100. */
  gauge?: { pct: number; label: string };
};

export const pillars: Pillar[] = [
  {
    id: "software",
    title: "هندسة البرمجيات",
    en: "Software Engineering",
    blurb:
      "مواقع وتطبيقات ولوحات تحكم مبنية لتكبر مع عملك: كود نظيف، أداء سريع على كل الشاشات، ونشر على بنية سحابية.",
    slugs: ["web", "mobile"],
    image: "/media/cyber/software.svg",
    metric: { value: "4.2B", label: "طلب شهرياً تتحمّله البنية السحابية" },
    gauge: { pct: 99.9, label: "جاهزية الخوادم" },
  },
  {
    id: "ai",
    title: "حلول الذكاء الاصطناعي",
    en: "AI Solutions",
    blurb:
      "مساعدون أذكياء يفهمون بيانات شركتك، ووكلاء يتعاونون لإنجاز المهام المتكررة بدلاً من فريقك.",
    slugs: ["ai"],
    image: "/media/cyber/ai.svg",
    points: [
      "مساعد محادثة بالعربية على موقعك أو واتساب",
      "أتمتة سير العمل بين أدواتك",
      "ربط النماذج اللغوية ببيانات شركتك",
    ],
    gauge: { pct: 87, label: "مهام مؤتمتة" },
  },
  {
    id: "brand",
    title: "الهوية وتجربة المستخدم",
    en: "UI/UX & Brand Identity",
    blurb: "واجهات سهلة الاستخدام، وهوية تعرّف بعلامتك من الشعار إلى المطبوعات.",
    slugs: ["identity"],
    image: "/media/cyber/brand.svg",
  },
  {
    id: "motion",
    title: "الموشن جرافيك والفيديو",
    en: "Motion Graphics",
    blurb: "فيديوهات قصيرة متحركة تشرح فكرتك أو تروّج لمنتجك.",
    slugs: ["motion"],
    image: "/media/cyber/motion.svg",
  },
  {
    id: "photo",
    title: "التصوير والمونتاج",
    en: "Photo & Video Editing",
    blurb: "تصوير منتجات وفعاليات، ثم مونتاج وتلوين جاهز للنشر.",
    slugs: ["photo"],
    image: "/media/cyber/photo.svg",
  },
  {
    id: "audio",
    title: "التسجيل الصوتي",
    en: "Audio Recording",
    blurb: "تعليق صوتي وتسجيل إعلانات بجودة استوديو.",
    slugs: ["audio"],
    image: "/media/cyber/audio.svg",
    catchAll: true,
  },
  {
    id: "marketing",
    title: "خدمات التسويق",
    en: "Marketing Services",
    blurb: marketing.intro,
    slugs: ["marketing"],
    image: "/media/cyber/marketing.svg",
    points: marketing.offerings,
    metric: { value: "360°", label: "حضور على كل المنصات" },
  },
];

/** Portfolio categories, matched against a project's title and alt text so
 *  admins can steer the filter by wording alone (no schema change). First
 *  match wins; anything unmatched falls into "campaigns". */
export const projectCategories = [
  { id: "software", label: "برمجيات", match: /موقع|تطبيق|برمج|متجر|لوحة تحكم/ },
  { id: "brand", label: "هوية بصرية", match: /هوية|شعار|مطبوع|موشن|فيديو|تصوير/ },
  { id: "social", label: "إعلانات التواصل", match: /التواصل|فيسبوك|إنستغرام|سوشيال|إعلانك/ },
  { id: "strategy", label: "استراتيجية واستهداف", match: /استهداف|استشار|خطط|خطة/ },
  { id: "campaigns", label: "حملات تسويقية", match: /./ },
] as const;

export const method = {
  title: "كيف نعمل",
  intro: about.reassurance,
  steps: [
    {
      title: "نفهم فكرتك",
      body: "جلسة قصيرة نحدد فيها الهدف والجمهور والميزانية، حتى لو كانت الفكرة غير واضحة بعد.",
    },
    {
      title: "نخطط ونصمم",
      body: "خريطة للموقع أو الحملة ونماذج أولية تراها وتعلّق عليها قبل أن نبدأ التنفيذ.",
    },
    {
      title: "نبني ونختبر",
      body: "تنفيذ على مراحل قصيرة مع نسخة تجريبية تتابع فيها التقدم أولاً بأول.",
    },
    {
      title: "نطلق ونتابع",
      body: "نشر وقياس للنتائج، ودعم بعد الإطلاق لأي تعديل تحتاجه.",
    },
  ],
  stack: [
    { group: "البرمجة", tools: ["Next.js", "React", "TypeScript", "Node.js", "Flutter", "PostgreSQL", "Cloudflare"] },
    { group: "الذكاء الاصطناعي", tools: ["Claude", "OpenAI", "n8n", "RAG"] },
    { group: "التصميم والإنتاج", tools: ["Figma", "Illustrator", "After Effects", "Premiere Pro"] },
    { group: "التسويق", tools: ["Meta Ads", "Google Ads", "Analytics"] },
  ],
};

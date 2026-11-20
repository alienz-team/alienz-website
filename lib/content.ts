// All copy and contact details come from the original site
// (https://63e4ff66d95e5.site123.me/). Tatweel stretching was removed and
// obvious spelling slips corrected (e.g. تنفيد → تنفيذ, ادا → إذا).
// Service descriptions are new: the original only listed titles.

export const brand = {
  name: "ALIENZ TEAM",
  tagline: "فنون البرمجة والتصميم",
  heroCta: "انطلق معنا",
  logoAlt: "شعار ALIENZ TEAM: رأس فضائي بسماعات داخل مصباح أخضر",
};

export const nav = [
  { href: "#top", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#marketing", label: "خدمات التسويق والإعلان" },
  { href: "#about", label: "حول" },
  { href: "#contact", label: "الاتصال" },
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
    image: "/media/svc-web.webp",
  },
  {
    id: "mobile",
    title: "تصميم وبرمجة تطبيقات الموبايل",
    description:
      "تطبيقات لأندرويد وiOS، من رسم الواجهات وحتى النشر على المتاجر.",
    image: "/media/svc-mobile.webp",
  },
  {
    id: "identity",
    title: "تصميم الهوية البصرية والمطبوعات",
    description:
      "شعار وألوان وخطوط تعرّف بعلامتك، مع كل ما تحتاجه من مطبوعات جاهزة للطباعة.",
    image: "/media/svc-identity.webp",
  },
  {
    id: "motion",
    title: "تصميم الموشن جرافيك والفيديو الدعائي",
    description:
      "فيديوهات قصيرة متحركة تشرح فكرتك أو تروّج لمنتجك على الشاشات ومواقع التواصل.",
    image: "/media/svc-motion.webp",
  },
  {
    id: "photo",
    title: "التصوير والمونتاج الاحترافي",
    description:
      "تصوير منتجات وفعاليات ومقابلات، ثم مونتاج وتلوين حتى تصبح المادة جاهزة للنشر.",
    image: "/media/svc-photo.webp",
  },
  {
    id: "audio",
    title: "التسجيل الصوتي الاحترافي",
    description:
      "تعليق صوتي وتسجيل إعلانات بجودة استوديو، مع المعالجة والمكساج.",
    image: "/media/svc-audio.webp",
  },
];

export const marketing = {
  title: "خدمات التسويق والإعلان",
  intro: "الوصول الكامل للفئة المستهدفة بكل دقة، بخطط استهداف مدروسة وفعّالة.",
  offerings: [
    "الاستشارات والحلول التسويقية",
    "إنشاء وتطوير خطط التسويق",
    "كتابة المحتوى وإدارته",
    "الحملات الإعلانية على محركات البحث ووسائل التواصل الاجتماعي",
  ],
  album: [
    { src: "/media/album-1.webp", w: 880, h: 560, alt: "أداة التسويق الفضائي: لإيصال رسالتك لكل من تريد فوق الكوكب" },
    { src: "/media/album-2.webp", w: 1600, h: 900, alt: "نقدم لكم خدمات التسويق الإلكتروني" },
    { src: "/media/album-3.webp", w: 1600, h: 900, alt: "الوصول الكامل للفئة المستهدفة بكل دقة: خطط استهداف مدروسة وفعالة" },
    { src: "/media/album-4.webp", w: 1600, h: 900, alt: "اعرض إعلانك في كافة قناة ومواقع التواصل الاجتماعي" },
    { src: "/media/album-5.webp", w: 1600, h: 900, alt: "خدماتنا: الاستشارات التسويقية، خطط التسويق، كتابة المحتوى، والحملات الإعلانية" },
    { src: "/media/album-6.webp", w: 1600, h: 900, alt: "لطلب خدماتنا: alienz.tech وفيسبوك Alienz Team وإنستغرام alienz_ly" },
  ],
};

export const about = {
  title: "حول",
  lead: "مجموعة من الشباب المحترف جمعنا حب الفن والعمل",
  paragraphs: [
    "نعمل في مجالات التقنية والحلول الرقمية ومجال الدعاية والإعلان.",
    "نملك الأدوات والأيادي الاحترافية التي تمكننا من تنفيذ المشاريع بأفضل أداء وأسرع وقت.",
  ],
  reassurance:
    "حتى إذا لم تعرف ما الذي تبحث عنه أو أنك حائر في أفكارك، لا تتردد بالتواصل معنا ونحن نضمن لك الوصول بإذن الله.",
  images: [
    { src: "/media/about-1.webp", w: 720, h: 404, alt: "شعار ALIENZ TEAM مع عبارة هجين البرمجة والتصميم" },
    { src: "/media/about-2.webp", w: 720, h: 405, alt: "شعار ALIENZ TEAM على خلفية سوداء" },
    { src: "/media/about-3.webp", w: 740, h: 531, alt: "مساحة عمل بشاشات أمام جدار بصورة مجرّة" },
  ],
};

export const contact = {
  title: "الاتصال",
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

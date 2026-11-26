import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Points "forward" in the reading direction: left in Arabic, right in English. */
export function ArrowLeft({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} {...props} className={`ltr:-scale-x-100 ${className}`}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ArrowRight({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} {...props} className={`ltr:-scale-x-100 ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" {...props}>
      <path d="M12 2c.6 4.9 2.9 7.4 8 8-5.1.6-7.4 3.1-8 8-.6-4.9-2.9-7.4-8-8 5.1-.6 7.4-3.1 8-8Z" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" {...props}>
      <path d="M6.9 8.8H4V20h2.9V8.8ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.6c0-3-1.6-5-4.2-5-1.4 0-2.4.8-2.8 1.5V8.8h-2.8V20h2.9v-5.6c0-1.5.6-2.6 2-2.6 1.3 0 2 .9 2 2.6V20H20v-6.4Z" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg {...base} strokeWidth={0} fill="currentColor" {...props}>
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.2a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.8 7.8 0 1 1 12 19.7Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3Z" />
    </svg>
  );
}

export function Hex(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4l8-4.6Z" />
    </svg>
  );
}

export function Expand(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

/** ALIENZ mark: alien head in a headset, drawn in neon #00FF66. */
export function AlienHead(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" width={40} height={40} fill="none" aria-hidden color="#00FF66" {...props}>
      <path
        d="M24 5c9.5 0 15 6.4 14.4 14.6-.6 8.6-7.2 18-14.4 22.4C16.8 37.6 10.2 28.2 9.6 19.6 9 11.4 14.5 5 24 5Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M13.5 22.5c2.6-.4 6 .6 7.6 3.6-2.8 1.1-6.5.2-7.6-3.6Z" fill="currentColor" />
      <path d="M34.5 22.5c-2.6-.4-6 .6-7.6 3.6 2.8 1.1 6.5.2 7.6-3.6Z" fill="currentColor" />
      <path d="M7.5 21c0-11 7.4-17.5 16.5-17.5S40.5 10 40.5 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4.5" y="18.5" width="5" height="9" rx="2.5" style={{ fill: "var(--color-space)" }} stroke="currentColor" strokeWidth="1.6" />
      <rect x="38.5" y="18.5" width="5" height="9" rx="2.5" style={{ fill: "var(--color-space)" }} stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 27.5c0 6 4 9.5 10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="18" cy="37.6" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.4A8.5 8.5 0 1 1 9.6 3.5a7 7 0 0 0 10.9 10.9Z" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

export function Share(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 15V3M8 7l4-4 4 4M6 11H5v10h14V11h-1" />
    </svg>
  );
}

export const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

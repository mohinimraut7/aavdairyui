import { FaCow } from "react-icons/fa6";

// Decorative farm landscape for the footer (pure SVG — no extra image request).
export default function FarmSilhouette({ className = "" }) {
  return (
    <div className={`pointer-events-none relative h-24 w-full max-w-[320px] text-white/20 ${className}`} aria-hidden>
      <svg viewBox="0 0 320 96" className="absolute inset-0 h-full w-full" fill="currentColor">
        <path d="M0 96 C60 70 110 72 160 80 C210 88 260 70 320 64 V96 Z" />
        <g transform="translate(250 18)">
          <rect x="17" y="34" width="6" height="30" />
          <circle cx="20" cy="26" r="16" />
          <circle cx="8" cy="34" r="10" />
          <circle cx="32" cy="34" r="10" />
        </g>
        <g transform="translate(212 40) scale(0.7)">
          <rect x="17" y="34" width="6" height="30" />
          <circle cx="20" cy="26" r="16" />
        </g>
      </svg>
      <FaCow className="absolute bottom-5 left-10 h-9 w-9" />
      <FaCow className="absolute bottom-4 left-24 h-7 w-7 -scale-x-100" />
      <FaCow className="absolute bottom-6 left-40 h-8 w-8" />
    </div>
  );
}

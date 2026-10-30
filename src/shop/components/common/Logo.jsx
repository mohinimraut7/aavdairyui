import { Link } from "react-router-dom";
import { SITE } from "../../config/site";

export default function Logo({ light = false, compact = false }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label={`${SITE.name} — home`}>
      <img
        src={SITE.logo}
        alt=""
        width="72"
        height="61"
        className={`${compact ? "h-12 w-auto" : "h-12 w-auto sm:h-[74px] xl:h-[80px]"} object-contain`}
      />
      <span className="leading-tight">
        <span
          className={`block font-display text-[12.5px] font-extrabold tracking-tight uppercase min-[400px]:text-[14px] sm:text-lg xl:text-[20px] ${
            light ? "text-white" : "text-farm-800"
          }`}
        >
          AAV Desi Cattle
          <br />
          Breeding Dairy Farm
        </span>
        {!compact && (
          <span className={`mt-1 hidden text-xs sm:block ${light ? "text-white/80" : "text-leaf"}`}>
            {SITE.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}

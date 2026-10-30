import { useEffect } from "react";
import { SITE } from "../config/site";

export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.shortName}` : `${SITE.name} | Farm-fresh Dairy`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}

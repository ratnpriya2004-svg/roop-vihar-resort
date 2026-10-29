import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar URL me hash (#rooms, #contact) hai, toh us section par scroll karein
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Thoda delay taaki page render ho jaye
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
    }
    
    // Agar hash nahi hai, toh page ke top par jayein
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
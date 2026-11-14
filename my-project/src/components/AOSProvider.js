
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let timer;

    // تأخير تشغيل AOS حتى انتهاء React من Hydration
    timer = setTimeout(() => {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
        mirror: false,
        disable: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches,
      });

      AOS.refreshHard();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return children;
}

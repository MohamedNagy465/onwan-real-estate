
"use client";

import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

function AOSInitializer({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [pathname]);

  return children;
}

export default function AOSProvider({ children }) {
  return (
    <Suspense fallback={children}>
      <AOSInitializer>{children}</AOSInitializer>
    </Suspense>
  );
}

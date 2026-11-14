"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { name: "الرئيسية", href: "/", key: "home" },
  { name: "العقارات", href: "/#properties", key: "properties" },
  { name: "المفضلة", href: "/favorites", key: "favorites" },
  { name: "من نحن", href: "/about", key: "about" },
  { name: "تواصل معنا", href: "/contact", key: "contact" },
];

function HeartIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 10.5 9-7 9 7" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    </span>
  );
}

function FavoritesBadge({ count, className = "" }) {
  if (!count) return null;

  return (
    <span
      className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center gap-0.5 rounded-full bg-rose-50 px-1.5 text-xs font-bold text-rose-600 ${className}`}
    >
      <HeartIcon className="h-3 w-3" />
      {count}
    </span>
  );
}

function NavbarContent() {
  const { favoriteIds, isLoaded } = useFavorites();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inProperties, setInProperties] = useState(false);

  const favoritesCount = isLoaded ? favoriteIds.length : 0;

  // Scroll state: shrink the bar and highlight the section we are in
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);

      if (pathname !== "/") {
        setInProperties(false);
        return;
      }

      const section = document.getElementById("properties");
      if (!section) {
        setInProperties(false);
        return;
      }

      const rect = section.getBoundingClientRect();
      const line = window.innerHeight * 0.4;
      setInProperties(rect.top <= line && rect.bottom > line);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close the mobile menu when the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function isActive(href) {
    if (href === "/") return pathname === "/" && !inProperties;
    if (href === "/#properties") return pathname === "/" && inProperties;
    return pathname === href;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled
          ? "border-slate-200 shadow-md"
          : "border-transparent shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-200 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <LogoIcon />

          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  active
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-blue-700"
                }`}
              >
                {link.name}

                {link.key === "favorites" && (
                  <FavoritesBadge count={favoritesCount} />
                )}

                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-blue-700 transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Action */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            اطلب استشارة
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}

          {!menuOpen && favoritesCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -end-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-rose-500"
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-6 py-5 shadow-lg lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  {link.name}

                  {link.key === "favorites" && (
                    <FavoritesBadge count={favoritesCount} />
                  )}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-slate-100 pt-4">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                اطلب استشارة
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Shown while the pathname is not available yet (same height as the real bar)
function NavbarFallback() {
  return (
    <nav className="sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon />

          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            {SITE.name}
          </span>
        </Link>
      </div>
    </nav>
  );
}

// usePathname needs a Suspense boundary so Next.js can prerender the page
export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}

import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import properties from "@/data/properties";
import { SITE, phoneLink } from "@/lib/site";

const LEGAL_LINKS = [];

const linkClass =
  "rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );

    default:
      return null;
  }
}

const SOCIAL_ICONS = {
  "فيسبوك": FaFacebookF,
  "إنستجرام": FaInstagram,
  "إكس": FaXTwitter,
  "سناب شات": FaSnapchat,
  "تيك توك": FaTiktok,
  "لينكدإن": FaLinkedinIn,
};

export default function Footer() {
  const propertyTypes = [
    ...new Set(properties.map((property) => property.type)),
  ].slice(0, 5);

  const socialLinks = SITE.social.filter((item) => item.href);
  const tel = phoneLink();

  return (
    <footer className="mt-auto overflow-x-clip bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* معلومات الشركة */}
          <div data-aos="fade-up" data-aos-delay="0">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
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

              <span className="text-xl font-extrabold tracking-tight">
                {SITE.name}
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              {SITE.description}
            </p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item, index) => {
                  const SocialIcon = SOCIAL_ICONS[item.name];

                  if (!SocialIcon) return null;

                  return (
                    <li
                      key={item.name}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                      >
                        <SocialIcon size={19} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* روابط سريعة */}
          <nav
            aria-label="روابط سريعة"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h3 className="mb-5 text-base font-semibold text-white">
              روابط سريعة
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/#properties", label: "العقارات" },
                { href: "/favorites", label: "المفضلة" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((link, index) => (
                <li
                  key={link.href}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* أنواع العقارات */}
          <nav
            aria-label="أنواع العقارات"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="mb-5 text-base font-semibold text-white">
              أنواع العقارات
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {propertyTypes.map((type, index) => (
                <li
                  key={type}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <Link
                    href={`/?type=${encodeURIComponent(type)}#properties`}
                    className={linkClass}
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* معلومات التواصل */}
          <div data-aos="fade-up" data-aos-delay="450">
            <h3 className="mb-5 text-base font-semibold text-white">
              تواصل معنا
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {SITE.address && (
                <li className="flex items-center gap-3">
                  <Icon
                    name="pin"
                    className="h-5 w-5 shrink-0 text-slate-500"
                  />
                  <span>{SITE.address}</span>
                </li>
              )}

              {SITE.email && (
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className={`flex items-center gap-3 ${linkClass}`}
                  >
                    <Icon
                      name="mail"
                      className="h-5 w-5 shrink-0 text-slate-500"
                    />
                    <span dir="ltr">{SITE.email}</span>
                  </a>
                </li>
              )}

              {tel && (
                <li>
                  <a
                    href={tel}
                    className={`flex items-center gap-3 ${linkClass}`}
                  >
                    <Icon
                      name="phone"
                      className="h-5 w-5 shrink-0 text-slate-500"
                    />
                    <span dir="ltr">{SITE.phone}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* الحقوق */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-center sm:flex-row sm:text-start"
        >
          <div className="space-y-1 text-sm text-slate-500">
            <p>
              &copy; 2026 {SITE.name}. جميع الحقوق محفوظة.
            </p>

            {SITE.falLicense && (
              <p>رخصة فال رقم: {SITE.falLicense}</p>
            )}
          </div>

          {LEGAL_LINKS.length > 0 && (
            <div className="flex gap-6 text-sm text-slate-500">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

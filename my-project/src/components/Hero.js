
import Link from "next/link";

import { SITE, whatsappLink } from "@/lib/site";

export default function Hero() {
  const whatsappHref = whatsappLink(
    "مرحبًا، أرغب في الاستفسار عن العقارات المعروضة."
  );

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920')",
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/80 to-slate-950/30"
      />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-2xl">

          {/* Badge */}
          <span
            data-aos="fade-down"
            data-aos-duration="800"
            className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300"
          >
            تسويق عقاري في المملكة العربية السعودية
          </span>

          {/* Heading */}
          <h1
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1000"
            className="mt-6 text-4xl font-bold leading-snug text-white sm:text-5xl lg:text-6xl lg:leading-snug"
          >
            اعثر على المكان الذي
            <span className="block text-blue-400">
              تفخر أن تسمّيه بيتك.
            </span>
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            className="mt-6 max-w-xl text-base leading-9 text-slate-300 sm:text-lg sm:leading-9"
          >
            نعرض لك عقارات مختارة بتفاصيل واضحة، ونرافقك من أول استفسار حتى
            إتمام الصفقة، لتصل إلى العقار الذي يناسب أسلوب حياتك.
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="450"
            data-aos-duration="1000"
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/#properties"
              className="rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              تصفّح العقارات
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              اطلب استشارة
            </Link>

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-emerald-400/40 px-7 py-3.5 font-semibold text-emerald-300 transition hover:bg-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                واتساب
              </a>
            )}
          </div>

          {/* FAL License */}
          {SITE.falLicense && (
            <p
              data-aos="fade-up"
              data-aos-delay="600"
              className="mt-10 text-sm text-slate-400"
            >
              {SITE.name} &middot; رخصة فال رقم {SITE.falLicense}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

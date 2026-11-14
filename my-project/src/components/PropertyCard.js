
import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "./FavoriteButton";
import { formatPrice } from "@/lib/site";

function FeatureIcon({ name }) {
  const common = {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    className: "mx-auto h-6 w-6 text-blue-700",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "bed") {
    return (
      <svg {...common}>
        <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 14h18M3 18v2M21 18v2M7 9V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
      </svg>
    );
  }

  if (name === "bath") {
    return (
      <svg {...common}>
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
        <path d="M6 12V6a2 2 0 0 1 2-2h1M7 19l-1 2M17 19l1 2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h6M9 3v6" />
    </svg>
  );
}

export default function PropertyCard({ property }) {
  const features = [
    { icon: "bed", value: property.bedrooms, label: "غرف النوم" },
    { icon: "bath", value: property.bathrooms, label: "دورات المياه" },
    { icon: "area", value: property.area, label: "المساحة (م²)" },
  ];

  return (
    <article
      data-aos="fade-up"
      data-aos-duration="800"
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* صورة العقار */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {/* طبقة التدرج */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
        />

        {/* نوع العقار */}
        <span className="absolute start-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
          {property.type}
        </span>

        {/* زر المفضلة */}
        <div className="absolute end-4 top-4">
          <FavoriteButton propertyId={property.id} />
        </div>

        {/* الموقع */}
        <div className="absolute bottom-4 start-4 flex items-center gap-1.5 text-sm font-medium text-white">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <span>{property.location}</span>
        </div>
      </div>

      {/* معلومات العقار */}
      <div className="p-5">
        <h2 className="truncate text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">
          {property.title}
        </h2>

        {/* السعر */}
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-500">السعر</p>

          <p className="mt-1 text-2xl font-extrabold text-blue-700">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* مواصفات العقار */}
        <dl className="grid grid-cols-3 gap-2">
          {features.map((feature) => (
            <div
              key={feature.label}
              className={`text-center ${
                feature.icon === "bath" ? "border-x border-slate-100" : ""
              }`}
            >
              <FeatureIcon name={feature.icon} />

              <dd className="mt-2 text-sm font-bold text-slate-800">
                {feature.value}
              </dd>

              <dt className="text-xs text-slate-500">
                {feature.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* زر تفاصيل العقار */}
        <Link
          href={`/properties/${property.id}`}
          aria-label={`عرض تفاصيل ${property.title}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          عرض تفاصيل العقار

          <span
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          >
            ←
          </span>
        </Link>
      </div>
    </article>
  );
}

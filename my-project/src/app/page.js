
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyCard from "@/components/PropertyCard";
import PopularLocations from "@/components/PopularLocations";
import properties from "@/data/properties";
import { whatsappLink } from "@/lib/site";

const PAGE_SIZE = 6;
const ALL = "all";

// Placeholder text: replace it with your company's real services
const SERVICES = [
  {
    icon: "home",
    title: "تسويق عقارك",
    description:
      "نعرض عقارك بصور واضحة ووصف دقيق، ونصل به إلى المشترين والمستأجرين المهتمين.",
  },
  {
    icon: "search",
    title: "نجد لك العقار المناسب",
    description:
      "أخبرنا بميزانيتك والحي الذي تفضله، ونرشّح لك العقارات التي تناسب احتياجك.",
  },
  {
    icon: "chat",
    title: "مرافقة حتى الإفراغ",
    description:
      "نبقى معك من المعاينة الأولى حتى إتمام الإجراءات، ونجيب عن أسئلتك في كل مرحلة.",
  },
];

// Arabic plural forms for the number of properties
function propertiesLabel(count) {
  if (count === 0) return "لا توجد عقارات";
  if (count === 1) return "عقار واحد";
  if (count === 2) return "عقاران";
  if (count <= 10) return `${count} عقارات`;
  return `${count} عقارًا`;
}

function ServiceIcon({ name }) {
  const common = {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg {...common}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [type, setType] = useState(ALL);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Footer links open the page with ?type=... so the filter follows the URL
  const urlType = searchParams.get("type");

  useEffect(() => {
    if (urlType) setType(urlType);
  }, [urlType]);

  // Start again from the first properties whenever a filter changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [search, type, minPrice, maxPrice, sort]);

  // Property types and numbers come from the listings data
  const types = useMemo(
    () => [...new Set(properties.map((property) => property.type))],
    []
  );

  const stats = [
    { value: properties.length, label: "عقار معروض" },
    {
      value: new Set(properties.map((property) => property.location)).size,
      label: "موقع",
    },
    { value: types.length, label: "نوع عقار" },
  ];

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    const result = properties.filter((property) => {
      const matchesLocation = property.location.toLowerCase().includes(query);
      const matchesType = type === ALL || property.type === type;
      const matchesMin = min === null || property.price >= min;
      const matchesMax = max === null || property.price <= max;

      return matchesLocation && matchesType && matchesMin && matchesMax;
    });

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, type, minPrice, maxPrice, sort]);

  const shown = filtered.slice(0, visible);

  function resetFilters() {
    setSearch("");
    setType(ALL);
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
  }

  function handleLocationSelect(location) {
    setSearch(location);

    document.getElementById("properties")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  const whatsappHref = whatsappLink(
    "مرحبًا، أرغب في الاستفسار عن العقارات المعروضة."
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <div data-aos="fade-down">
        <Hero />
      </div>

      {/* Numbers */}
      <section className="border-b border-slate-200 bg-white">
        <dl className="mx-auto grid max-w-5xl divide-y divide-slate-100 px-6 sm:grid-cols-3 sm:divide-x sm:divide-x-reverse sm:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="px-6 py-8 text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <dd className="text-3xl font-extrabold text-slate-900">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm text-slate-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured properties */}
      <div data-aos="fade-up">
        <FeaturedProperties />
      </div>

      {/* What we do */}
      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div
            className="mx-auto mb-12 max-w-2xl text-center"
            data-aos="fade-up"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              خدماتنا
            </h2>
            <p className="mt-3 text-slate-600">
              كل ما تحتاجه لتسويق عقارك أو إيجاد العقار المناسب لك.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <ServiceIcon name={service.icon} />
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 leading-8 text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our properties */}
      <section
        id="properties"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6"
      >
        <div className="mb-8 max-w-2xl" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            عقاراتنا
          </h2>
          <p className="mt-2 text-slate-600">
            تصفّح العقارات المعروضة حسب الموقع أو نوع العقار أو السعر.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <SearchBar
            search={search}
            setSearch={setSearch}
            type={type}
            setType={setType}
            types={types}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
            onReset={resetFilters}
          />
        </div>

        <p
          className="mb-6 mt-8 text-sm font-medium text-slate-500"
          aria-live="polite"
          data-aos="fade-up"
        >
          {propertiesLabel(filtered.length)}
        </p>

        {shown.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((property, index) => (
                <div
                  key={property.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {filtered.length > shown.length && (
              <div
                className="mt-10 flex flex-col items-center gap-2"
                data-aos="fade-up"
              >
                <button
                  type="button"
                  onClick={() => setVisible((count) => count + PAGE_SIZE)}
                  className="rounded-lg border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-800 shadow-sm transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  عرض المزيد من العقارات
                </button>
                <p className="text-sm text-slate-500">
                  عرض {shown.length} من {filtered.length}
                </p>
              </div>
            )}
          </>
        ) : (
          <div
            className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
            data-aos="zoom-in"
          >
            <h3 className="text-xl font-bold text-slate-900">
              لا توجد عقارات مطابقة لبحثك
            </h3>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              جرّب موقعًا آخر أو غيّر نوع العقار أو نطاق السعر.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              إعادة ضبط البحث
            </button>
          </div>
        )}
      </section>

      {/* Popular locations */}
      <div data-aos="fade-up">
        <PopularLocations onSelectLocation={handleLocationSelect} />
      </div>

      {/* Call to action */}
      <section className="px-6 py-20">
        <div
          className="mx-auto max-w-5xl rounded-2xl bg-slate-950 px-6 py-14 text-center"
          data-aos="zoom-in-up"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            لست متأكدًا من العقار المناسب لك؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-8 text-slate-300">
            أخبرنا بما تبحث عنه وسيتواصل معك فريقنا في أقرب وقت.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              اطلب استشارة
            </Link>

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-100 transition hover:border-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                تواصل عبر واتساب
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// useSearchParams needs a Suspense boundary in the App Router
export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

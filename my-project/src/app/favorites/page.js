  "use client";

  import { useMemo, useState } from "react";
  import Link from "next/link";

  import { useFavorites } from "@/context/FavoritesContext";
  import PropertyCard from "@/components/PropertyCard";
  import PropertySkeleton from "@/components/PropertySkeleton";
  import properties from "@/data/properties";
  import { formatPrice, whatsappLink } from "@/lib/site";

  const SORT_OPTIONS = [
    { value: "default", label: "الترتيب الافتراضي" },
    { value: "low-high", label: "السعر: من الأقل إلى الأعلى" },
    { value: "high-low", label: "السعر: من الأعلى إلى الأقل" },
  ];

  // Arabic plural forms for the number of properties
  function propertiesLabel(count) {
    if (count === 1) return "عقار واحد";
    if (count === 2) return "عقاران";
    if (count <= 10) return `${count} عقارات`;
    return `${count} عقارًا`;
  }

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

  export default function FavoritesPage() {
    const { favoriteIds, isLoaded } = useFavorites();
    const [sort, setSort] = useState("default");

    // Get only favorite properties, then sort them
    const favoriteProperties = useMemo(() => {
      const result = properties.filter((property) =>
        favoriteIds.includes(property.id)
      );

      if (sort === "low-high") {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === "high-low") {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    }, [favoriteIds, sort]);

    const prices = favoriteProperties.map((property) => property.price);
    const lowest = prices.length ? Math.min(...prices) : 0;
    const highest = prices.length ? Math.max(...prices) : 0;

    // Opens WhatsApp with the saved properties listed in the message
    function shareOnWhatsApp() {
      const origin = window.location.origin;

      const lines = favoriteProperties.map(
        (property) =>
          `- ${property.title} (${property.location}): ${origin}/properties/${property.id}`
      );

      const href = whatsappLink(
        `مرحبًا، أرغب في الاستفسار عن هذه العقارات:\n${lines.join("\n")}`
      );

      if (href) window.open(href, "_blank", "noopener,noreferrer");
    }

    const canShare = Boolean(whatsappLink("test"));

    // Loading state
    if (!isLoaded) {
      return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
          <section className="mx-auto max-w-7xl" aria-busy="true">
            <div className="mb-10 space-y-3">
              <div className="h-9 w-64 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          </section>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
        <section className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <HeartIcon className="h-6 w-6" />
                </span>
                عقاراتي المفضلة
              </h1>

              <p className="mt-3 text-slate-600" aria-live="polite">
                {favoriteProperties.length === 0
                  ? "لم تحفظ أي عقار حتى الآن."
                  : `لديك ${propertiesLabel(favoriteProperties.length)} محفوظ${
                      favoriteProperties.length === 1 ? "" : "ة"
                    }.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {favoriteProperties.length > 1 && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="favorites-sort"
                    className="text-sm font-medium text-slate-600"
                  >
                    ترتيب حسب
                  </label>

                  <select
                    id="favorites-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {canShare && favoriteProperties.length > 0 && (
                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  أرسل قائمتي عبر واتساب
                </button>
              )}
            </div>
          </div>

          {/* Price summary */}
          {favoriteProperties.length > 1 && (
            <dl className="mb-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-500">العقارات المحفوظة</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900">
                  {favoriteProperties.length}
                </dd>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-500">أقل سعر</dt>
                <dd className="mt-1 text-2xl font-bold text-emerald-700">
                  {formatPrice(lowest)}
                </dd>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-500">أعلى سعر</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900">
                  {formatPrice(highest)}
                </dd>
              </div>
            </dl>
          )}

          {/* Property cards */}
          {favoriteProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <HeartIcon className="h-8 w-8" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                لا توجد عقارات مفضلة بعد
              </h2>

              <p className="mx-auto mt-2 max-w-md leading-8 text-slate-600">
                اضغط على القلب في أي عقار لحفظه هنا، لتعود إليه في أي وقت.
              </p>

              <Link
                href="/#properties"
                className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                تصفّح العقارات
              </Link>
            </div>
          )}
        </section>
      </main>
    );
  }
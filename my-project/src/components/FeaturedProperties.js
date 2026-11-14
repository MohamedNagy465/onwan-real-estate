import Link from "next/link";

import PropertyCard from "@/components/PropertyCard";
import properties from "@/data/properties";

// Show at most this many featured properties on the home page
const MAX_FEATURED = 3;

export default function FeaturedProperties() {
  const featuredProperties = properties
    .filter((property) => property.featured)
    .slice(0, MAX_FEATURED);

  // Nothing to feature: hide the whole section instead of showing an empty message
  if (featuredProperties.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-title"
      className="bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-title"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              عقارات مميزة
            </h2>

            <p className="mt-3 max-w-xl leading-8 text-slate-600">
              مجموعة مختارة بعناية من أفضل العقارات المعروضة لدينا.
            </p>
          </div>

          <Link
            href="/#properties"
            className="inline-flex items-center gap-2 rounded-lg font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            عرض كل العقارات
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        {/* Property cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";

import properties from "@/data/properties";

// `search` is the text matched against property.location in your data,
// so it must appear in the location of the properties you want to find.
// The images are placeholders: replace them with real photos (e.g. /public/locations/riyadh.jpg).
const locations = [
  {
    name: "الرياض",
    search: "الرياض",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800",
    description: "شقق وفلل عصرية في قلب العاصمة.",
  },
  {
    name: "جدة",
    search: "جدة",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    description: "عقارات قريبة من البحر وأسلوب حياة ساحلي.",
  },
  {
    name: "الدمام",
    search: "الدمام",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    description: "بيوت واسعة وأحياء هادئة للعائلات.",
  },
];

// Arabic plural forms for the number of properties
function propertiesLabel(count) {
  if (count === 1) return "عقار واحد";
  if (count === 2) return "عقاران";
  if (count <= 10) return `${count} عقارات`;
  return `${count} عقارًا`;
}

function countFor(search) {
  const query = search.toLowerCase();

  return properties.filter((property) =>
    property.location.toLowerCase().includes(query)
  ).length;
}

export default function PopularLocations({ onSelectLocation }) {
  return (
    <section
      aria-labelledby="locations-title"
      className="bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-10">
          <h2
            id="locations-title"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            أشهر المواقع
          </h2>

          <p className="mt-3 max-w-xl leading-8 text-slate-600">
            تصفّح العقارات في أكثر المدن طلبًا في المملكة.
          </p>
        </div>

        {/* Location cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => {
            const count = countFor(location.search);

            return (
              <button
                key={location.name}
                type="button"
                onClick={() => onSelectLocation(location.search)}
                aria-label={`عرض العقارات في ${location.name}`}
                className="group relative h-80 overflow-hidden rounded-2xl text-start shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <Image
                  src={location.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                {/* Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />

                {/* Location information */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  {count > 0 && (
                    <p className="text-sm font-medium text-blue-200">
                      {propertiesLabel(count)}
                    </p>
                  )}

                  <h3 className="mt-2 text-2xl font-bold">{location.name}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {location.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    تصفّح العقارات
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-x-2 motion-reduce:transition-none"
                    >
                      ←
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
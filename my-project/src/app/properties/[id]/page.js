
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import properties from "@/data/properties";
import { formatPrice } from "@/lib/site";

export default async function PropertyDetails(props) {
  const params = await Promise.resolve(props?.params);
  const id = params?.id;

  if (!id) {
    notFound();
  }

  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  if (!property) {
    notFound();
  }

  const features = [
    {
      label: "غرف النوم",
      value: property.bedrooms ?? "غير محدد",
    },
    {
      label: "دورات المياه",
      value: property.bathrooms ?? "غير محدد",
    },
    {
      label: "المساحة",
      value: property.area
        ? `${property.area} م²`
        : "غير محددة",
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link
          href="/#properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <span>→</span>
          العودة إلى العقارات
        </Link>

        <div className="mb-8 mt-8">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {property.type}
          </span>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            {property.title}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-slate-500">
            <span>📍</span>
            {property.location}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Property Image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-slate-200 md:min-h-[500px]">
            {property.image ? (
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center text-slate-500">
                لا توجد صورة متاحة
              </div>
            )}
          </div>

          {/* Property Information */}
          <div className="flex flex-col">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                السعر
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-700">
                {formatPrice(property.price)}
              </p>

              <div className="my-6 border-t border-slate-100" />

              <h2 className="mb-5 text-xl font-bold">
                تفاصيل العقار
              </h2>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <dt className="text-sm text-slate-500">
                      {feature.label}
                    </dt>

                    <dd className="mt-2 text-lg font-bold">
                      {feature.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">
                  وصف العقار
                </h2>

                <p className="leading-8 text-slate-600">
                  {property.description ||
                    "لا يوجد وصف متاح لهذا العقار حاليًا."}
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-8 block rounded-xl bg-blue-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-800"
              >
                تواصل معنا بخصوص العقار
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

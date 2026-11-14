
import Link from "next/link";

import properties from "@/data/properties";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata = {
  title: `من نحن | ${SITE.name}`,
  description: `تعرّف على ${SITE.name} وكيف نساعدك في تسويق العقارات وإيجاد العقار المناسب في المملكة العربية السعودية.`,
};

function Icon({ name }) {
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-1 h-5 w-5 shrink-0 text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: "home",
    title: "تسويق احترافي",
    description:
      "نعرض كل عقار بصور واضحة ومعلومات دقيقة، ليصل إلى الشريحة المناسبة من المشترين والمستأجرين.",
  },
  {
    icon: "search",
    title: "ترشيح يناسب احتياجك",
    description:
      "نستمع إلى ميزانيتك وتفضيلاتك، ثم نرشّح لك العقارات التي تستحق المعاينة فقط.",
  },
  {
    icon: "chat",
    title: "تواصل مباشر وواضح",
    description:
      "تتحدث مع فريقنا مباشرة، ونجيب عن أسئلتك بوضوح في كل مرحلة.",
  },
];

const STEPS = [
  {
    title: "تواصل معنا",
    description: "أخبرنا بما تبحث عنه: الموقع، النوع، والميزانية.",
  },
  {
    title: "نرشّح لك",
    description: "نختار لك عقارات مناسبة ونرتّب لك المعاينة.",
  },
  {
    title: "نرافقك حتى الإتمام",
    description: "نكون معك في الخطوات التالية حتى إتمام الصفقة.",
  },
];

const HIGHLIGHTS = [
  "تصفّح العقارات حسب الموقع ونوع العقار",
  "احفظ العقارات التي أعجبتك في المفضلة",
  "تفاصيل واضحة لكل عقار: المساحة والغرف والسعر",
  "تواصل مباشر مع فريقنا عبر واتساب أو الهاتف",
];

export default function AboutPage() {
  const stats = [
    { value: properties.length, label: "عقار معروض" },
    {
      value: new Set(properties.map((property) => property.location)).size,
      label: "موقع",
    },
    {
      value: new Set(properties.map((property) => property.type)).size,
      label: "نوع عقار",
    },
  ];

  const whatsappHref = whatsappLink(
    "مرحبًا، أرغب في الاستفسار عن خدماتكم."
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero Section */}
      <section
        data-aos="fade-down"
        data-aos-duration="1000"
        className="bg-slate-950 px-6 py-24 text-center sm:py-28"
      >
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className="mx-auto max-w-3xl text-4xl font-extrabold leading-snug tracking-tight text-white md:text-5xl"
        >
          نساعدك على إيجاد عقار تفخر بالعودة إليه.
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="350"
          className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-300"
        >
          {SITE.name} شركة تسويق عقاري في المملكة العربية السعودية، نجمع بين
          عقارات موثوقة وتجربة بحث بسيطة، لتصل إلى قرارك بوقت أقل وثقة أكبر.
        </p>

        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/#properties"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-500"
          >
            تصفّح العقارات
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:-translate-y-1 hover:border-slate-400 hover:text-white"
          >
            اطلب استشارة
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-aos="zoom-in"
        data-aos-duration="900"
        className="mx-auto -mt-10 max-w-4xl px-6"
      >
        <dl className="grid divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-md sm:grid-cols-3 sm:divide-x sm:divide-x-reverse sm:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="px-6 py-6 text-center transition hover:bg-blue-50"
            >
              <dd className="text-3xl font-extrabold text-slate-900">
                {stat.value}
              </dd>

              <dt className="mt-1 text-sm text-slate-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Our Story Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">

        <div
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            نجعل رحلة العقار أبسط
          </h2>

          <p className="mt-6 max-w-prose leading-9 text-slate-600">
            نؤمن أن اختيار العقار قرار كبير، ويستحق معلومات واضحة وشريكًا
            يتحدث بصدق. لذلك نركّز على عرض العقارات بدقة، وتنظيمها بطريقة
            تسهّل عليك المقارنة والاختيار.
          </p>

          <p className="mt-4 max-w-prose leading-9 text-slate-600">
            سواء كنت تبحث عن بيت لعائلتك، أو تريد تسويق عقارك، فريقنا معك من
            أول استفسار حتى إتمام الصفقة.
          </p>

          <Link
            href="/#properties"
            className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-800"
          >
            تصفّح العقارات
          </Link>
        </div>

        <div
          data-aos="fade-right"
          data-aos-delay="200"
          className="rounded-2xl border border-blue-100 bg-blue-50 p-8 transition-shadow duration-300 hover:shadow-xl sm:p-10"
        >
          <h3 className="text-xl font-bold text-slate-900">
            ماذا تجد في موقعنا
          </h3>

          <ul className="mt-6 space-y-4">
            {HIGHLIGHTS.map((item, index) => (
              <li
                key={item}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex gap-3 leading-8 text-slate-700"
              >
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div
            data-aos="fade-up"
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              لماذا {SITE.name}؟
            </h2>

            <p className="mt-3 text-slate-600">
              كل ما تحتاجه لتجربة عقارية أوضح وأسهل.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <Icon name={feature.icon} />
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-8 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2
          data-aos="fade-up"
          className="text-center text-3xl font-bold tracking-tight text-slate-900"
        >
          كيف نعمل
        </h2>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="flex gap-4 transition-transform duration-300 hover:-translate-y-2 md:flex-col"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-700 text-lg font-bold text-blue-700">
                {index + 1}
              </span>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-1 leading-8 text-slate-600">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Call To Action Section */}
      <section
        data-aos="zoom-in-up"
        data-aos-duration="1000"
        className="px-6 pb-20"
      >
        <div className="mx-auto max-w-5xl rounded-2xl bg-slate-950 px-6 py-14 text-center">

          <h2
            data-aos="fade-up"
            className="text-3xl font-bold tracking-tight text-white"
          >
            جاهز لخطوتك العقارية القادمة؟
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="mx-auto mt-3 max-w-xl leading-8 text-slate-300"
          >
            تواصل معنا اليوم ونساعدك في إيجاد العقار المناسب أو تسويق عقارك.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-500"
            >
              اطلب استشارة
            </Link>

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-100 transition hover:-translate-y-1 hover:border-slate-400 hover:text-white"
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


"use client";

import { SITE } from "@/lib/site";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

export default function SearchBar({
  search,
  setSearch,
  type,
  setType,
  types = [],
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  onReset,
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Search input */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
        <label htmlFor="sb-location" className={labelClass}>
          الموقع
        </label>

        <input
          id="sb-location"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث بالمدينة أو الحي..."
          className={inputClass}
        />
      </div>

      {/* Filters */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div data-aos="fade-up" data-aos-delay="150">
          <label htmlFor="sb-type" className={labelClass}>
            نوع العقار
          </label>

          <select
            id="sb-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className={inputClass}
          >
            <option value="all">كل الأنواع</option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div data-aos="fade-up" data-aos-delay="250">
          <label htmlFor="sb-min" className={labelClass}>
            أقل سعر ({SITE.currency})
          </label>

          <input
            id="sb-min"
            type="number"
            inputMode="numeric"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="أقل سعر"
            className={inputClass}
          />
        </div>

        <div data-aos="fade-up" data-aos-delay="350">
          <label htmlFor="sb-max" className={labelClass}>
            أعلى سعر ({SITE.currency})
          </label>

          <input
            id="sb-max"
            type="number"
            inputMode="numeric"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="أعلى سعر"
            className={inputClass}
          />
        </div>

        <div data-aos="fade-up" data-aos-delay="450">
          <label htmlFor="sb-sort" className={labelClass}>
            ترتيب حسب
          </label>

          <select
            id="sb-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={inputClass}
          >
            <option value="default">الافتراضي</option>
            <option value="low-high">السعر: من الأقل إلى الأعلى</option>
            <option value="high-low">السعر: من الأعلى إلى الأقل</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="mt-6 flex justify-end border-t border-slate-100 pt-5"
      >
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          إعادة ضبط البحث
        </button>
      </div>
    </div>
  );
}

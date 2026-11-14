"use client";

import { useEffect, useRef } from "react";

import { formatPrice } from "@/lib/site";

// Arabic labels for the fields we know. Any other field falls back to its key.
const LABELS = {
  type: "النوع",
  location: "الموقع",
  price: "السعر",
  bedrooms: "غرف النوم",
  bathrooms: "دورات المياه",
  area: "المساحة (م²)",
};

// Fields that don't make sense as comparison rows (the title is the column header)
const HIDDEN_KEYS = new Set([
  "id",
  "title",
  "image",
  "images",
  "img",
  "thumbnail",
  "description",
  "featured",
]);

function isScalar(value) {
  return ["string", "number", "boolean"].includes(typeof value);
}

function formatValue(key, value) {
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (key === "price" && typeof value === "number") return formatPrice(value);
  return String(value);
}

export default function CompareModal({ properties, onClose, onRemove }) {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Keep the latest onClose without re-running the effect below
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") onCloseRef.current();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Build rows from every scalar field found on the selected properties
  const keys = [];
  properties.forEach((property) => {
    Object.entries(property).forEach(([key, value]) => {
      if (!HIDDEN_KEYS.has(key) && isScalar(value) && !keys.includes(key)) {
        keys.push(key);
      }
    });
  });

  const lowestPrice = Math.min(
    ...properties.map((property) => property.price ?? Infinity)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="مقارنة العقارات"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900">مقارنة العقارات</h2>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="إغلاق المقارنة"
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            &times;
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[560px] border-collapse text-start">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="w-36 px-5 py-3" />
                {properties.map((property) => (
                  <th
                    key={property.id}
                    className="px-5 py-3 text-start align-top font-semibold text-slate-900"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{property.title ?? property.location}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(property.id)}
                        aria-label={`إزالة ${
                          property.title ?? property.location
                        } من المقارنة`}
                        className="rounded px-1 text-lg leading-none text-slate-400 transition hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        &times;
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {keys.map((key) => (
                <tr key={key} className="border-b border-slate-100">
                  <th
                    scope="row"
                    className="px-5 py-3 text-start text-sm font-medium text-slate-500"
                  >
                    {LABELS[key] ?? key}
                  </th>

                  {properties.map((property) => {
                    const isLowest =
                      key === "price" &&
                      properties.length > 1 &&
                      property.price === lowestPrice;

                    return (
                      <td
                        key={property.id}
                        className="px-5 py-3 text-slate-800"
                      >
                        {formatValue(key, property[key])}
                        {isLowest && (
                          <span className="ms-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                            الأقل
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
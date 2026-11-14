"use client";

import { useMemo, useState } from "react";

function formatEgp(value) {
  return `${Math.round(value).toLocaleString("en-US")} EGP`;
}

export default function InstallmentCalculator({ price }) {
  const [downPercent, setDownPercent] = useState(20);
  const [years, setYears] = useState(8);
  const [rate, setRate] = useState(0);

  const result = useMemo(() => {
    const downPayment = (price * downPercent) / 100;
    const financed = price - downPayment;
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    const monthly =
      monthlyRate === 0
        ? financed / months
        : (financed * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    const totalInstallments = monthly * months;

    return {
      downPayment,
      financed,
      months,
      monthly,
      totalPaid: downPayment + totalInstallments,
      totalInterest: totalInstallments - financed,
    };
  }, [price, downPercent, years, rate]);

  const sliderClass =
    "mt-3 h-2 w-full cursor-pointer accent-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

  return (
    <section
      aria-labelledby="calculator-title"
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2
        id="calculator-title"
        className="text-xl font-bold text-slate-900"
      >
        Installment calculator
      </h2>

      <p className="mt-1 text-sm text-slate-600">
        Estimate your monthly payment for this property.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="down-payment"
                className="text-sm font-medium text-slate-700"
              >
                Down payment
              </label>
              <span className="text-sm font-semibold text-slate-900">
                {downPercent}% &middot; {formatEgp(result.downPayment)}
              </span>
            </div>
            <input
              id="down-payment"
              type="range"
              min="0"
              max="90"
              step="5"
              value={downPercent}
              onChange={(event) => setDownPercent(Number(event.target.value))}
              className={sliderClass}
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="years"
                className="text-sm font-medium text-slate-700"
              >
                Payment period
              </label>
              <span className="text-sm font-semibold text-slate-900">
                {years} {years === 1 ? "year" : "years"}
              </span>
            </div>
            <input
              id="years"
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(event) => setYears(Number(event.target.value))}
              className={sliderClass}
            />
          </div>

          <div>
            <label
              htmlFor="rate"
              className="text-sm font-medium text-slate-700"
            >
              Annual interest rate (%)
            </label>
            <input
              id="rate"
              type="number"
              inputMode="decimal"
              min="0"
              max="40"
              step="0.5"
              value={rate}
              onChange={(event) => {
                const value = Number(event.target.value);
                setRate(Number.isFinite(value) ? Math.min(Math.max(value, 0), 40) : 0);
              }}
              aria-describedby="rate-help"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            />
            <p id="rate-help" className="mt-1.5 text-sm text-slate-500">
              Enter 0 for a developer plan without interest.
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl bg-blue-50 p-6">
          <p className="text-sm text-slate-600">Monthly payment</p>
          <p
            className="mt-1 text-3xl font-extrabold text-blue-700"
            aria-live="polite"
          >
            {formatEgp(result.monthly)}
          </p>

          <dl className="mt-6 space-y-3 border-t border-blue-100 pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-600">Amount financed</dt>
              <dd className="font-semibold text-slate-900">
                {formatEgp(result.financed)}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-slate-600">Number of payments</dt>
              <dd className="font-semibold text-slate-900">{result.months}</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-slate-600">Total interest</dt>
              <dd className="font-semibold text-slate-900">
                {formatEgp(result.totalInterest)}
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-t border-blue-100 pt-3">
              <dt className="font-medium text-slate-700">Total you pay</dt>
              <dd className="font-bold text-slate-900">
                {formatEgp(result.totalPaid)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        This is an estimate only. Real plans depend on the developer or bank,
        and may include fees and a different payment schedule.
      </p>
    </section>
  );
}
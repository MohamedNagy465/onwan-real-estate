"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          An unexpected error happened while loading this page. Try again, and
          if it keeps happening, come back in a few minutes.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
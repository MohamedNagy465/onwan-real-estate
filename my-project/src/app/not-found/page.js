import Link from "next/link";

export const metadata = {
  title: "Page not found | EstateHub",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-blue-700">404</p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          We couldn&rsquo;t find that page
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          The link may be broken, or the property may no longer be listed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Go to home
          </Link>

          <Link
            href="/#properties"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Browse properties
          </Link>
        </div>
      </div>
    </main>
  );
}
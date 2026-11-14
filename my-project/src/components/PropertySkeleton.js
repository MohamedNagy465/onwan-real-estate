const bar = "animate-pulse bg-slate-200 motion-reduce:animate-none";

export default function PropertySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Image */}
      <div className={`h-64 ${bar}`} />

      <div className="p-5">
        {/* Title */}
        <div className={`h-6 w-3/4 rounded ${bar}`} />

        {/* Price */}
        <div className="mt-4">
          <div className={`h-3 w-12 rounded ${bar}`} />
          <div className={`mt-2 h-7 w-36 rounded ${bar}`} />
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* Features */}
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`h-6 w-6 rounded ${bar}`} />
              <div className={`h-4 w-8 rounded ${bar}`} />
              <div className={`h-3 w-14 rounded ${bar}`} />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className={`mt-6 h-12 w-full rounded-xl ${bar}`} />
      </div>
    </div>
  );
}
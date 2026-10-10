export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-[#e4e9e4] bg-white p-4">
      <div className="skeleton h-[145px] rounded-xl" />

      <div className="pt-4">
        <div className="skeleton h-5 w-3/5 rounded" />

        <div className="mt-2 skeleton h-3 w-2/5 rounded" />

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="skeleton h-3 w-16 rounded" />
            <div className="mt-2 skeleton h-5 w-28 rounded" />
          </div>

          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
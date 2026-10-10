
import ProductSkeleton from "@/components/productskeleton";

export default function Loading() {
  return (
    <>
      <div className="border-b border-[#dfe9df] bg-[#f3faf5]">
        <div className="container-main py-3">
          <div className="skeleton h-4 w-full rounded" />
        </div>
      </div>

      <main>
        <section className="bg-[#f7faf7]">
          <div className="container-main py-10">
            <div className="skeleton h-70 rounded-[28px]" />
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main">
            <div className="skeleton mb-7 h-8 w-52 rounded" />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

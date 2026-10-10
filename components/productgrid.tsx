import ProductCard from "@/components/productcard";
import type { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d9e4d9] bg-[#f8fbf8] px-5 py-12 text-center">
        <div className="text-4xl" aria-hidden="true">
          🛒
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#263026]">
          কোনো পণ্য পাওয়া যায়নি
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#778077]">
          অন্য ক্যাটাগরি নির্বাচন করে দেখুন।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
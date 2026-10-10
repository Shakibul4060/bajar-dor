import ProductCard from "@/components/productcard";
import type { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-base-300 p-8 text-center">
        <p className="text-lg font-semibold">
          কোনো পণ্য পাওয়া যায়নি
        </p>
        <p className="mt-2 text-sm opacity-70">
          অন্য ক্যাটাগরি নির্বাচন করে দেখো।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
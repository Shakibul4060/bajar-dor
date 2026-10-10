
"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/productcard";

type SortOption = "default" | "low" | "high" | "name";

export default function CategorySort({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sortBy) {
      case "low":
        return items.sort((a, b) => a.price - b.price);
      case "high":
        return items.sort((a, b) => b.price - a.price);
      case "name":
        return items.sort((a, b) =>
          a.name.localeCompare(b.name, "bn")
        );
      default:
        return items;
    }
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট <strong>{products.length}</strong>টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <ArrowDownUp size={17} className="text-[#168a45]" />

          <span>সাজান:</span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-xl border border-[#dfe8df] bg-white px-3 py-2.5 outline-none focus:border-[#168a45]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
          <p className="text-3xl">🛒</p>
          <h3 className="mt-3 font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            এই ক্যাটাগরিতে এখনো পণ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

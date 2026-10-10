"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, PackageSearch } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/productcard";

type SortOption = "default" | "low" | "high" | "name";

type Props = {
  products: Product[];
};

export default function CategoryProductGrid({ products }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sortBy) {
      case "low":
        return items.sort((a, b) => a.price - b.price);
      case "high":
        return items.sort((a, b) => b.price - a.price);
      case "name":
        return items.sort((a, b) => a.name.localeCompare(b.name, "bn"));
      default:
        return items;
    }
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#1b251b] sm:text-2xl">
            পণ্যের তালিকা
          </h2>
          <p className="mt-1 text-sm text-[#778077]">
            মোট {sortedProducts.length}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <label className="flex items-center gap-2 self-start rounded-xl border border-[#dfe8df] bg-white px-3 py-2.5 text-sm font-semibold text-[#526052] shadow-sm sm:self-auto">
          <ArrowDownUp size={17} className="shrink-0 text-[#168a45]" />

          <span className="shrink-0">সাজান:</span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="max-w-[190px] cursor-pointer bg-transparent text-sm outline-none"
            aria-label="পণ্য সাজানোর পদ্ধতি"
          >
            <option value="default">ডিফল্ট ক্রম</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9e4d9] bg-[#f8fbf8] px-5 py-12 text-center">
          <PackageSearch
            size={38}
            className="mx-auto text-[#8a9a8a]"
          />
          <h3 className="mt-3 font-bold text-[#263026]">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-1 text-sm text-[#778077]">
            এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/productcard";

type Props = {
  products: Product[];
};

export default function CategoryProductGrid({ products }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "bn"));
    }

    return result;
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold">পণ্যের তালিকা</h2>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="select select-bordered w-full max-w-xs"
          aria-label="পণ্য সাজানোর পদ্ধতি"
        >
          <option value="default">ডিফল্ট ক্রম</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
          <option value="name">নাম অনুযায়ী</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
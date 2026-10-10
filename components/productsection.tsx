import type { Product } from "@/lib/types";
import ProductCard from "./productcard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductSection({
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mb-6 flex items-end justify-between gap-3 sm:mb-7 sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-black tracking-tight text-[#1b251b] sm:text-2xl lg:text-3xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-2 text-sm leading-6 text-[#778077]">
                {subtitle}
              </p>
            )}
          </div>

          <span className="hidden shrink-0 rounded-full bg-[#eef7f0] px-3 py-1.5 text-xs font-bold text-[#168a45] sm:inline-flex">
            {products.length}টি পণ্য
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
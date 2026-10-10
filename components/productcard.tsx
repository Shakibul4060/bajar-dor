import Link from "next/link";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPercent, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.changeType === "up";
  const isDown = product.changeType === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <article className="h-full rounded-2xl border border-[#e0e8e0] bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-[#b9dabe] hover:shadow-lg hover:shadow-[#17301e]/7">
        {/* Product image */}
        <div className="flex h-36.25 items-center justify-center rounded-xl bg-[#f6f9f6] transition group-hover:bg-[#eef8f0]">
          <span
            className="text-7xl transition duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            {product.emoji}
          </span>
        </div>

        {/* Content */}
        <div className="pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="line-clamp-1 text-base font-extrabold text-[#202a20]">
                {product.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-[#7c857c]">
                {product.unit}
              </p>
            </div>

            <span className="shrink-0 rounded-lg bg-[#f1f6f1] px-2 py-1 text-[10px] font-bold text-[#687268]">
              {product.category}
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium text-[#879087]">
                আজকের দাম
              </p>

              <p className="mt-1 text-lg font-black text-[#168a45]">
                {formatPrice(product.price)}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isUp
                  ? "bg-[#e6f7ec] text-[#168a45]"
                  : isDown
                    ? "bg-[#fff0f0] text-[#dc4d4d]"
                    : "bg-[#f0f2f0] text-[#7b827b]"
              }`}
            >
              {isUp ? (
                <ArrowUp size={12} />
              ) : isDown ? (
                <ArrowDown size={12} />
              ) : (
                <Minus size={12} />
              )}

              {formatPercent(product.changePercent)}%
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
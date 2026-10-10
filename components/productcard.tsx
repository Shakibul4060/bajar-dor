import Link from "next/link";
import { ArrowDown, ArrowUp, Minus, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPercent, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.changeType === "up";
  const isDown = product.changeType === "down";

  const changeStyle = isUp
    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
    : isDown
      ? "bg-rose-50 text-rose-700 ring-rose-100"
      : "bg-gray-100 text-gray-600 ring-gray-200";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a45] focus-visible:ring-offset-2"
      aria-label={`${product.name}, দাম ${formatPrice(product.price)}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3eae3] bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#b7d9be] hover:shadow-xl hover:shadow-[#17301e]/10 sm:p-4">
        <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#f6faf6] to-[#edf6ee] sm:h-40">
          <span
            className="text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl"
            aria-hidden="true"
          >
            {product.emoji}
          </span>

          <span className="absolute right-2 top-2 rounded-full border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold text-[#526252] shadow-sm">
            {product.category}
          </span>

          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#687568]">
            {product.unit}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-3 sm:pt-4">
          <h3 className="line-clamp-1 text-sm font-extrabold text-[#202a20] transition-colors group-hover:text-[#168a45] sm:text-base">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-2 pt-4">
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-[#879087] sm:text-xs">
                আজকের দাম
              </p>

              <p className="mt-1 break-words text-base font-black text-[#168a45] sm:text-xl">
                {formatPrice(product.price)}
              </p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ring-1 ring-inset sm:text-xs ${changeStyle}`}
              title={`দামের পরিবর্তন ${formatPercent(product.changePercent)}%`}
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

          <div className="mt-4 flex items-center justify-between border-t border-[#edf1ed] pt-3 text-xs font-semibold text-[#748074] transition-colors group-hover:text-[#168a45]">
            <span>বিস্তারিত দেখুন</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
import { Product } from "@/lib/types";
import { formatPercent, formatPrice } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (!products.length) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="border-b border-[#dfe9df] bg-[#f3faf5]">
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {items.map((product, index) => {
            const isUp = product.changeType === "up";
            const isDown = product.changeType === "down";

            return (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center gap-2 border-r border-[#dce8dd] px-5 py-2.5 text-xs sm:text-sm"
              >
                <span className="text-base">
                  {product.emoji}
                </span>

                <span className="font-semibold text-[#303b30]">
                  {product.name}
                </span>

                <span className="font-bold text-[#168a45]">
                  {formatPrice(product.price)}
                </span>

                <span
                  className={`font-bold ${
                    isUp
                      ? "text-[#168a45]"
                      : isDown
                        ? "text-[#e04b4b]"
                        : "text-[#899089]"
                  }`}
                >
                  {isUp
                    ? "▲"
                    : isDown
                      ? "▼"
                      : "—"}{" "}
                  {formatPercent(product.changePercent)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
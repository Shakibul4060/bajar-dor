
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  MapPin,
  TrendingUp,
  Store,
} from "lucide-react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { formatPercent, formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  let product;

  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Product details error:", error);
    notFound();
  }

  if (!product) notFound();

  const isUp = product.changeType === "up";
  const isDown = product.changeType === "down";

  return (
    <main className="min-h-screen bg-[#eff4ef] pb-12">
      <div className="container-main pt-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#748074]"
        >
          <Link href="/" className="hover:text-[#168a45]">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-[#168a45]"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#394539]">
            {product.name}
          </span>
        </nav>

        {/* Product heading */}
        <section className="rounded-2xl border border-[#e0e8e0] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f7f1] text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                <span aria-hidden="true">{product.emoji || "🛒"}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#168a45]">
                  {product.category} · {product.unit}
                </span>
                <h1 className="mt-1 text-2xl font-black text-[#1b2b1e] sm:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#778177]">
                  {product.description || "এই পণ্যের সর্বশেষ বাজারদর দেখুন।"}
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-2xl bg-[#f1f8f2] px-5 py-4 sm:min-w-36 sm:text-center">
              <p className="text-xs font-semibold text-[#778477]">
                বর্তমান দাম
              </p>
              <p className="mt-1 text-2xl font-black text-[#168a45]">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-xs text-[#778477]">
                প্রতি {product.unit}
              </p>
              <span
                className={`mt-2 inline-flex items-center gap-1 text-xs font-bold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-[#168a45]"
                      : "text-[#7b847b]"
                }`}
              >
                {isUp ? (
                  <ArrowUp size={13} />
                ) : isDown ? (
                  <ArrowDown size={13} />
                ) : (
                  <TrendingUp size={13} />
                )}
                {formatPercent(product.changePercent)}%
              </span>
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-5 rounded-2xl border border-[#e0e8e0] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-black text-[#263326]">
            দামের সারসংক্ষেপ
          </h2>
          <p className="mt-1 text-xs text-[#818981]">
            এই পণ্যের সর্বনিম্ন, গড় ও সর্বোচ্চ দাম
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              label="সর্বনিম্ন দাম"
              value={product.minPrice}
              tone="green"
            />
            <SummaryCard
              label="গড় দাম"
              value={product.averagePrice}
              tone="blue"
            />
            <SummaryCard
              label="সর্বোচ্চ দাম"
              value={product.maxPrice}
              tone="orange"
            />
          </div>
        </section>

        {/* Market price table */}
        <section className="mt-5 rounded-2xl border border-[#e0e8e0] bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7ed] text-[#168a45]">
              <Store size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#263326]">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="mt-1 text-xs text-[#818981]">
                {product.markets.length}টি বাজারের মূল্যতথ্য
              </p>
            </div>
          </div>

          {product.markets.length === 0 ? (
            <div className="rounded-xl bg-[#f7f9f7] px-4 py-10 text-center">
              <Store className="mx-auto text-[#899489]" size={30} />
              <h3 className="mt-3 font-bold text-[#394539]">
                বাজারের তথ্য পাওয়া যায়নি
              </h3>
              <p className="mt-1 text-sm text-[#7b847b]">
                এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যাচ্ছে না।
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#e5ebe5]">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead className="bg-[#f4f8f4] text-xs text-[#677267]">
                  <tr>
                    <th className="px-4 py-4 font-bold">বাজারের নাম</th>
                    <th className="px-4 py-4 text-right font-bold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-bold">
                      গড় দাম
                    </th>
                    <th className="px-4 py-4 text-right font-bold">
                      সর্বোচ্চ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.bazar}-${index}`}
                      className={
                        index % 2 === 0
                          ? "border-t border-[#e7ece7] bg-white"
                          : "border-t border-[#e7ece7] bg-[#f5f8f5]"
                      }
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-[#168a45]"
                          />
                          <div>
                            <p className="font-bold text-[#354035]">
                              {market.bazar}
                            </p>
                            {market.location && (
                              <p className="mt-1 text-xs text-[#899189]">
                                {market.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-[#465346]">
                        {formatPrice(market.minPrice)}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-[#168a45]">
                        {formatPrice(market.averagePrice)}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-[#465346]">
                        {formatPrice(market.maxPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-4 py-3 text-sm font-bold text-[#455145] transition hover:border-[#168a45] hover:text-[#168a45]"
          >
            <ArrowLeft size={17} />
            সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "blue" | "orange";
}) {
  const styles = {
    green: "bg-[#f0f8f1] text-[#168a45]",
    blue: "bg-[#f0f6fb] text-[#276c9d]",
    orange: "bg-[#fff6ed] text-[#bd6a24]",
  };

  return (
    <div className="rounded-xl border border-[#e5ebe5] p-4">
      <p className="text-xs font-bold text-[#7b857b]">{label}</p>
      <p className={`mt-2 text-xl font-black ${styles[tone]}`}>
        {formatPrice(value)}
      </p>
    </div>
  );
}

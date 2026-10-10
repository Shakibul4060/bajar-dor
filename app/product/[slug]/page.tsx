
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Minus,
  MapPin,
  Store,
  TrendingUp,
} from "lucide-react";

import { getProduct } from "@/lib/api";
import { formatPercent, formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product;

  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Product details error:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  const isUp = product.changeType === "up";
  const isDown = product.changeType === "down";

  const changeStyle = isUp
    ? "bg-rose-50 text-rose-700"
    : isDown
      ? "bg-emerald-50 text-emerald-700"
      : "bg-gray-100 text-gray-600";

  return (
    <main className="min-h-screen bg-[#f5f8f5] pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="আপনি এখন যেখানে আছেন"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition hover:text-[#168a45]">
            হোম
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/category/${product.categorySlug}`}
            className="transition hover:text-[#168a45]"
          >
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-gray-800">
            {product.name}
          </span>
        </nav>

        {/* Product header */}
        <section className="overflow-hidden rounded-3xl border border-[#e0e9e0] bg-white shadow-sm">
          <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#edf8ef] to-[#dff0e2] text-5xl sm:h-28 sm:w-28 sm:text-6xl">
                <span aria-hidden="true">{product.emoji || "🛒"}</span>
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#edf8ef] px-3 py-1 text-xs font-bold text-[#168a45]">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    প্রতি {product.unit}
                  </span>
                </div>

                <h1 className="text-2xl font-black leading-tight text-[#203024] sm:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  {product.description ||
                    "এই পণ্যের সর্বশেষ বাজারদর দেখুন এবং কেনাকাটার আগে বিভিন্ন বাজারের দামের তুলনা করুন।"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#dceede] bg-[#f2faf3] p-5 md:min-w-52 md:text-center">
              <p className="text-sm font-semibold text-gray-600">
                বর্তমান দাম
              </p>

              <p className="mt-2 text-3xl font-black text-[#168a45]">
                {formatPrice(product.price)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}
              </p>

              <span
                className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${changeStyle}`}
              >
                {isUp ? (
                  <ArrowUp size={14} />
                ) : isDown ? (
                  <ArrowDown size={14} />
                ) : (
                  <Minus size={14} />
                )}
                {isUp
                  ? "দাম বেড়েছে"
                  : isDown
                    ? "দাম কমেছে"
                    : "দামের পরিবর্তন নেই"}
                <span>{formatPercent(product.changePercent)}%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-6 rounded-3xl border border-[#e0e9e0] bg-white p-5 sm:p-7">
          <div>
            <h2 className="text-xl font-black text-[#263326] sm:text-2xl">
              দামের সারসংক্ষেপ
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              সর্বনিম্ন, গড় ও সর্বোচ্চ দামের তুলনা
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

        {/* Market prices */}
        <section className="mt-6 rounded-3xl border border-[#e0e9e0] bg-white p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf7ed] text-[#168a45]">
              <Store size={23} />
            </div>

            <div>
              <h2 className="text-xl font-black text-[#263326]">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {product.markets.length}টি বাজারের মূল্যতথ্য
              </p>
            </div>
          </div>

          {product.markets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dce6dc] bg-[#f8faf8] px-4 py-12 text-center">
              <Store
                className="mx-auto text-gray-400"
                size={34}
                aria-hidden="true"
              />
              <h3 className="mt-3 font-bold text-gray-700">
                বাজারের তথ্য পাওয়া যায়নি
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম এখনো যোগ করা হয়নি।
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#e3ebe3]">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-[#f0f7f1] text-xs text-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-4 font-bold">
                      বাজারের নাম
                    </th>
                    <th scope="col" className="px-4 py-4 text-right font-bold">
                      সর্বনিম্ন
                    </th>
                    <th scope="col" className="px-4 py-4 text-right font-bold">
                      গড় দাম
                    </th>
                    <th scope="col" className="px-4 py-4 text-right font-bold">
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
                          ? "border-t border-[#e8eee8] bg-white"
                          : "border-t border-[#e8eee8] bg-[#f8faf8]"
                      }
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={17}
                            className="mt-0.5 shrink-0 text-[#168a45]"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="font-bold text-gray-800">
                              {market.bazar}
                            </p>
                            {market.location && (
                              <p className="mt-1 text-xs text-gray-500">
                                {market.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-gray-700">
                        {formatPrice(market.minPrice)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-extrabold text-[#168a45]">
                        {formatPrice(market.averagePrice)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-gray-700">
                        {formatPrice(market.maxPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs leading-6 text-gray-500">
            দ্রষ্টব্য: বাজারের তথ্যের সঠিকতা ও হালনাগাদের সময় ডেটার উৎসের ওপর নির্ভরশীল।
          </p>
        </section>

        {/* Back link */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-[#168a45] hover:text-[#168a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a45]"
          >
            <ArrowLeft size={17} />
            সব পণ্যে ফিরে যান
          </Link>

          <Link
            href={`/category/${product.categorySlug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#168a45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#116f36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a45] focus-visible:ring-offset-2"
          >
            <TrendingUp size={17} />
            এই বিভাগের পণ্য দেখুন
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
    green: {
      card: "border-emerald-100 bg-emerald-50/70",
      label: "text-emerald-800",
      value: "text-emerald-700",
    },
    blue: {
      card: "border-sky-100 bg-sky-50/70",
      label: "text-sky-800",
      value: "text-sky-700",
    },
    orange: {
      card: "border-orange-100 bg-orange-50/70",
      label: "text-orange-800",
      value: "text-orange-700",
    },
  };

  const style = styles[tone];

  return (
    <div className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-sm ${style.card}`}>
      <p className={`text-sm font-bold ${style.label}`}>{label}</p>
      <p className={`mt-3 break-words text-2xl font-black ${style.value}`}>
        {formatPrice(value)}
      </p>
    </div>
  );
}

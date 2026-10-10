import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-[#e3ebe3] bg-[#f7faf7]">
      <div className="container-main py-8 sm:py-12 lg:py-16">
        <div className="green-gradient relative overflow-hidden rounded-[28px] border border-[#dcebdd] px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#bde3c9] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#168a45]">
                আজকের বাজারদর এক নজরে
              </div>

              <h1 className="max-w-[650px] text-4xl font-black leading-tight tracking-tight text-[#172117] sm:text-5xl lg:text-[58px]">
                বাজারের দাম জানুন,
                <span className="mt-1 block text-[#168a45]">
                  সঠিক সিদ্ধান্ত নিন।
                </span>
              </h1>

              <p className="mt-5 max-w-[570px] text-sm leading-7 text-[#657065] sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় পণ্যের
                বাজারদর এবং দামের পরিবর্তন এক জায়গায় দেখুন।
                বাজার করুন জেনে-বুঝে, পরিকল্পনা করুন সহজে।
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#all-products"
                  className="inline-flex items-center justify-center rounded-xl bg-[#168a45] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#168a45]/20 transition hover:-translate-y-0.5 hover:bg-[#0f7138] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a45] focus-visible:ring-offset-2"
                >
                  সব পণ্যের দাম দেখুন
                </Link>

                <span className="text-sm text-[#657065]">
                  সহজে দেখুন, সচেতনভাবে কিনুন
                </span>
              </div>
            </div>

            <div className="relative flex min-h-[220px] items-center justify-center sm:min-h-[280px] lg:min-h-[310px]">
              <div className="absolute h-56 w-56 rounded-full bg-[#d2f1da] blur-2xl sm:h-72 sm:w-72" />

              <div className="relative h-[230px] w-[230px] sm:h-[280px] sm:w-[280px]">
                <Image
                  src="/images/bazar-hero.png"
                  alt="বাজারের বিভিন্ন পণ্য"
                  fill
                  priority
                  sizes="(max-width: 640px) 230px, 280px"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
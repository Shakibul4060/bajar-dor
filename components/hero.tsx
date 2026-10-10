import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-[#e3ebe3] bg-[#f7faf7]">
      <div className="container-main py-10 sm:py-14 lg:py-16">
        <div className="green-gradient relative overflow-hidden rounded-[28px] border border-[#dcebdd] px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Text */}
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#bde3c9] bg-white/75 px-3 py-1.5 text-xs font-bold text-[#168a45]">
                আজকের বাজারদর এক নজরে
              </div>

              <h1 className="max-w-[650px] text-4xl font-black leading-[1.08] tracking-[-1.5px] text-[#172117] sm:text-5xl lg:text-[58px]">
                বাজারের দাম জানুন,
                <span className="block text-[#168a45]">
                  সঠিক সিদ্ধান্ত নিন।
                </span>
              </h1>

              <p className="mt-5 max-w-[570px] text-sm leading-7 text-[#657065] sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ
                প্রয়োজনীয় পণ্যের আজকের বাজারদর এবং
                বাজারভিত্তিক মূল্য এক জায়গায় দেখুন।
              </p>

              <Link
                href="#সব-পণ্য"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#168a45] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#168a45]/20 transition hover:-translate-y-0.5 hover:bg-[#0f7138]"
              >
                সব পণ্যের দাম দেখুন
              </Link>
            </div>

            {/* Image */}
            <div className="relative flex min-h-[220px] items-center justify-center lg:min-h-[310px]">
              <div className="absolute h-56 w-56 rounded-full bg-[#d2f1da] blur-2xl sm:h-72 sm:w-72" />

              <div className="relative flex h-[230px] w-[230px] items-center justify-center sm:h-[280px] sm:w-[280px]">
                <Image
                  src="/images/bazar-hero.png"
                  alt="বাজারের পণ্য"
                  fill
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
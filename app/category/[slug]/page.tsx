import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProductGrid from "@/components/CategoryProductGrid";

type Props = {
  params: Promise<{ slug: string }>;
};

const fallbackCategories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🫗" },
  { slug: "sobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍖" },
];

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Category API error:", error);
  }

  const category =
    categories.find((item) => item.slug === slug) ??
    fallbackCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  try {
    products = await getProducts(slug);
  } catch (error) {
    console.error("Category products API error:", error);
  }

  return (
    <main className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="relative mb-8 overflow-hidden rounded-3xl border border-[#dcebdd] bg-gradient-to-br from-[#eef8ef] via-white to-[#e4f4e7] p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#d5eed9]/70 blur-3xl"
          />

          <div className="relative">
            <p className="mb-3 text-sm font-bold text-[#168a45]">
              বাজারদর / পণ্যের বিভাগ
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm"
                aria-hidden="true"
              >
                {category.icon}
              </span>

              <h1 className="text-3xl font-black tracking-tight text-[#172117] sm:text-4xl">
                {category.name}
              </h1>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#657065] sm:text-base">
              এই বিভাগের পণ্যের বর্তমান দাম দেখুন এবং প্রয়োজন অনুযায়ী
              দাম বা নাম অনুসারে পণ্য সাজিয়ে নিন।
            </p>

            <div className="mt-5 inline-flex rounded-full border border-[#cfe6d2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#168a45]">
              মোট {products.length}টি পণ্য
            </div>
          </div>
        </header>

        <CategoryProductGrid products={products} />
      </div>
    </main>
  );
}
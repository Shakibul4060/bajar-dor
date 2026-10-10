import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import CategorySort from "@/components/categorysort";

type Props = {
  params: Promise<{ slug: string }>;
};

const fallbackCategories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🫗" },
  { slug: "sobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
];

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  const category =
    categories.find((item) => item.slug === slug) ??
    fallbackCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  try {
    products = await getProducts(slug);
  } catch {
    products = [];
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-10">
        <p className="mb-3 text-sm font-semibold text-primary">
          বাজারদর · পণ্যের বিভাগ
        </p>

        <h1 className="text-3xl font-bold sm:text-4xl">
          {category.icon} {category.name}
        </h1>
        <CategorySort products={products} />

        <p className="mt-3 text-base-content/70">
          এই বিভাগের পণ্যের বর্তমান দাম দেখুন এবং দাম অনুযায়ী সাজান।
        </p>

        <p className="mt-4 text-sm text-base-content/60">
          মোট পণ্য: {products.length}টি
        </p>
      </div>

      {products.length > 0 ? (
        <CategoryProductGrid products={products} />
      ) : (
        <div className="rounded-2xl border border-base-300 p-10 text-center">
          <p className="text-4xl">🛒</p>
          <h2 className="mt-4 text-xl font-bold">
            এই বিভাগে এখন কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-base-content/60">
            কিছুক্ষণ পর আবার চেষ্টা করো।
          </p>
        </div>
      )}
    </main>
  );
}
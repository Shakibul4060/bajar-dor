import Navbar from "@/components/navbar";
import PriceTicker from "@/components/priceticker";
import Hero from "@/components/hero";
import ProductSection from "@/components/productsection";
import ProductCard from "@/components/productcard";
import Footer from "@/components/footer";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

function getTopRisers(products: Product[]) {
  return [...products]
    .filter((product) => product.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 6);
}

function getTopFallers(products: Product[]) {
  return [...products]
    .filter((product) => product.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 6);
}

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Products API error:", error);
  }

  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);

  return (
    <>
      <Navbar />

      <PriceTicker products={products} />

      <main>
        <Hero />

        <ProductSection
          title="আজ দাম বেড়েছে ▲"
          subtitle="আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
          products={risers}
        />

        <div className="border-y border-[#e7ece7] bg-[#fbfcfb]">
          <ProductSection
            title="আজ দাম কমেছে ▼"
            subtitle="আজ যেসব পণ্যের দাম কমেছে"
            products={fallers}
          />
        </div>

        <section
          id="all-products"
          className="section-padding scroll-mt-32"
        >
          <div className="container-main">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#1b251b] sm:text-3xl">
                  সব পণ্য
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#778077]">
                  প্রয়োজনীয় সব পণ্যের আজকের বাজারদর দেখুন।
                </p>
              </div>

              <span className="hidden rounded-full bg-[#eef7f0] px-3 py-1.5 text-xs font-bold text-[#168a45] sm:block">
                {products.length}টি পণ্য
              </span>
            </div>

            {products.length === 0 ? (
              <div className="rounded-2xl border border-[#e1e8e1] bg-white px-5 py-14 text-center">
                <div className="text-5xl" aria-hidden="true">
                  🛒
                </div>

                <h3 className="mt-4 text-lg font-black text-[#263026]">
                  পণ্যের তথ্য পাওয়া যায়নি
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#7c847c]">
                  কিছুক্ষণ পর আবার চেষ্টা করুন।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

import { Category, MarketPrice, Product } from "./types";

const PRIMARY_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

const FALLBACK_URL =
  "https://api.abcz.workers.dev/api/bazardor";

async function getJson<T>(endpoint: string): Promise<T> {
  const baseUrls = [...new Set([PRIMARY_URL, FALLBACK_URL])];
  let lastError: Error = new Error("API request failed");

  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
      });

      if (response.status === 429) {
        lastError = new Error("API rate limit exceeded (429)");
        continue;
      }

      if (!response.ok) {
        lastError = new Error(`API request failed: ${response.status}`);
        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unable to connect to API");
    }
  }

  throw lastError;
}

function extractArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.Products)) return payload.Products;
  if (Array.isArray(payload?.categories)) return payload.categories;

  return [];
}

function numberValue(value: any, fallback = 0): number {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getChangeType(value: number): "up" | "down" | "flat" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

function getProductEmoji(name: string): string {
  const value = name.toLowerCase();

  if (value.includes("চাল")) return "🍚";
  if (value.includes("ডাল")) return "🫘";
  if (value.includes("তেল")) return "🫙";
  if (value.includes("আলু")) return "🥔";
  if (value.includes("পেঁয়াজ") || value.includes("পেয়াজ")) return "🧅";
  if (value.includes("মরিচ")) return "🌶️";
  if (value.includes("মাছ")) return "🐟";
  if (value.includes("মুরগি") || value.includes("মাংস")) return "🍗";
  if (value.includes("ডিম")) return "🥚";
  if (value.includes("দুধ")) return "🥛";
  if (value.includes("আদা")) return "🫚";
  if (value.includes("রসুন")) return "🧄";

  return "🛒";
}

function normalizeMarket(market: any): MarketPrice {
  const minPrice = numberValue(
    market?.minPrice ?? market?.minimumPrice ?? market?.min
  );

  const maxPrice = numberValue(
    market?.maxPrice ?? market?.maximumPrice ?? market?.max,
    minPrice
  );

  return {
    bazar:
      market?.bazar ??
      market?.market ??
      market?.name ??
      "স্থানীয় বাজার",

    location:
      market?.location ??
      market?.division ??
      undefined,

    minPrice,
    maxPrice,

    averagePrice: numberValue(
      market?.averagePrice ??
        market?.avgPrice ??
        market?.average ??
        market?.price,
      minPrice && maxPrice
        ? (minPrice + maxPrice) / 2
        : minPrice
    ),
  };
}

function normalizeProduct(item: any): Product {
  const changeData =
    typeof item?.change === "object" && item.change !== null
      ? item.change
      : {};

  const name =
    item?.nameBn ??
    item?.name ??
    item?.title ??
    "পণ্য";

  const price = numberValue(
    item?.today ??
      item?.price ??
      item?.todayPrice ??
      item?.today_price ??
      item?.currentPrice ??
      item?.averagePrice
  );

  const yesterdayPrice = numberValue(
    item?.yesterday ??
      item?.yesterdayPrice ??
      item?.yesterday_price,
    price
  );

  const calculatedChange =
    yesterdayPrice > 0
      ? ((price - yesterdayPrice) / yesterdayPrice) * 100
      : 0;

  const changePercent = numberValue(
    changeData?.pct ??
      item?.changePercent ??
      item?.change_percentage ??
      item?.percentageChange,
    calculatedChange
  );

  const markets = Array.isArray(item?.markets)
    ? item.markets
    : Array.isArray(item?.bazars)
      ? item.bazars
      : Array.isArray(item?.bazaars)
        ? item.bazaars
        : Array.isArray(item?.marketPrices)
          ? item.marketPrices
          : [];

  const categorySlug =
    typeof item?.category === "object"
      ? item.category?.slug ?? item.category?.id ?? "other"
      : item?.categorySlug ??
        item?.category_slug ??
        item?.category ??
        "other";

  const categoryName =
    item?.categoryNameBn ??
    item?.categoryName ??
    (typeof item?.category === "object"
      ? item.category?.nameBn ?? item.category?.name
      : undefined) ??
    (typeof item?.category === "string" ? item.category : undefined) ??
    "অন্যান্য";

  return {
    id: String(item?.id ?? item?._id ?? item?.slug ?? name),

    slug: String(item?.slug ?? item?.id ?? item?._id ?? name),

    name: String(name),

    emoji: String(
      item?.image ??
        item?.emoji ??
        item?.icon ??
        getProductEmoji(String(name))
    ),

    category: String(categoryName),
    categorySlug: String(categorySlug),

    unit: String(
      item?.unitName ??
        item?.unit ??
        item?.measurement ??
        "প্রতি কেজি"
    ),

    price,

    minPrice: numberValue(
      item?.minPrice ?? item?.minimumPrice ?? item?.min,
      price
    ),

    maxPrice: numberValue(
      item?.maxPrice ?? item?.maximumPrice ?? item?.max,
      price
    ),

    averagePrice: numberValue(
      item?.averagePrice ?? item?.avgPrice ?? item?.today,
      price
    ),

    changePercent,
    changeType: getChangeType(changePercent),

    description: String(
      item?.description ??
        item?.summary ??
        "আজকের বাজারদর সম্পর্কে বিস্তারিত তথ্য দেখুন।"
    ),

    markets: markets.map(normalizeMarket),
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const payload = await getJson<any>(`/products${query}`);

  return extractArray(payload).map(normalizeProduct);
}

export async function getProduct(
  slug: string
): Promise<Product | undefined> {
  const productKey = decodeURIComponent(slug).trim();

  // প্রথমে সরাসরি ID/slug দিয়ে পণ্য খোঁজা
  try {
    const payload = await getJson<any>(
      `/products/${encodeURIComponent(productKey)}`
    );

    const item =
      payload?.data?.product ??
      payload?.data ??
      payload?.product ??
      payload;

    if (
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      (
        item.id != null ||
        item._id != null ||
        item.slug != null ||
        item.name != null ||
        item.nameBn != null ||
        item.title != null
      )
    ) {
      return normalizeProduct(item);
    }
  } catch {
    // সরাসরি API ব্যর্থ হলে নিচে তালিকা থেকে খুঁজবে
  }

  // API-এর তালিকা থেকে ID, slug বা নাম দিয়ে খোঁজা
  try {
    const products = await getProducts();

    return products.find(
      (product) =>
        product.id === productKey ||
        product.slug === productKey ||
        product.name === productKey
    );
  } catch (error) {
    console.error("Unable to find product:", error);
    return undefined;
  }
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getJson<any>("/categories");

  return extractArray(payload).map(
    (item: any): Category => ({
      slug: String(
        item?.slug ??
          item?.id ??
          item?.nameBn ??
          item?.name ??
          "other"
      ),

      name: String(
        item?.nameBn ??
          item?.name ??
          item?.title ??
          "অন্যান্য"
      ),

      icon: String(
        item?.icon ??
          item?.emoji ??
          item?.image ??
          getProductEmoji(
            String(item?.nameBn ?? item?.name ?? "")
          )
      ),

      description: item?.description,
    })
  );
}

export async function getCategory(slug: string) {
  const payload = await getJson<any>(
    `/categories/${encodeURIComponent(slug)}`
  );

  return (
    payload?.data?.category ??
    payload?.data ??
    payload?.category ??
    payload
  );
}

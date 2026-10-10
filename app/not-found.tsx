import Link from "next/link";
import { Home, ShoppingBasket } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-5">
      <div className="w-full max-w-md rounded-3xl border border-[#dfe8df] bg-white p-8 text-center shadow-xl shadow-[#17301e]/5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f7ed]">
          <ShoppingBasket
            size={38}
            className="text-[#168a45]"
          />
        </div>

        <p className="mt-6 text-6xl font-black text-[#168a45]">
          404
        </p>

        <h1 className="mt-3 text-2xl font-black text-[#1e281e]">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#747d74]">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে
          দেওয়া হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#168a45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f7138]"
        >
          <Home size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
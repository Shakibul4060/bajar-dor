
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const closeMobileMenu = () => setMobileOpen(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে");
      closeMobileMenu();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("লগআউট করার সময় সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

  const isCategoryActive = (slug: string) => {
    if (!slug) {
      return pathname === "/" || pathname === "/product";
    }

    return pathname === `/category/${slug}`;
  };

  const authLinks = (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        onClick={closeMobileMenu}
        className="rounded-xl px-4 py-2 text-sm font-bold text-[#374037] transition hover:bg-[#f1f6f1]"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        onClick={closeMobileMenu}
        className="rounded-xl bg-[#168a45] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0f7138]"
      >
        সাইন আপ
      </Link>
    </div>
  );

  const userLinks = (
    <>
      <Link
        href="/profile"
        onClick={closeMobileMenu}
        className="flex max-w-full items-center gap-2 truncate rounded-xl border border-[#dfe7df] bg-white px-3 py-2 text-sm font-bold text-[#263026] transition hover:bg-[#f5faf6]"
      >
        <User size={17} className="shrink-0 text-[#168a45]" />
        <span className="max-w-[150px] truncate">
          {session?.user?.name ||
            session?.user?.email ||
            "প্রোফাইল"}
        </span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#fff1f1] px-3 py-2 text-sm font-bold text-[#dc4d4d] transition hover:bg-[#ffe4e4] disabled:opacity-60"
      >
        <LogOut size={17} />
        {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe8df] bg-white/95 backdrop-blur">
      <div className="container-main">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f7ee] text-[#168a45]">
              <ShoppingBasket size={24} />
            </div>

            <div>
              <span className="text-lg font-black text-[#17301e] sm:text-xl">
                বাজার দর
              </span>
              <p className="text-[10px] font-semibold text-[#7b857b]">
                আজকের বাজারদর এক নজরে
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <span className="text-sm text-gray-500">
                অপেক্ষা করুন...
              </span>
            ) : session?.user ? (
              userLinks
            ) : (
              authLinks
            )}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe7df] text-[#263026] md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="hidden items-center gap-1 overflow-x-auto pb-3 md:flex"
        >
          {categories.map((category) => (
            <Link
              key={category.slug || "all"}
              href={
                category.slug
                  ? `/category/${category.slug}`
                  : "/"
              }
              aria-current={
                isCategoryActive(category.slug) ? "page" : undefined
              }
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition ${
                isCategoryActive(category.slug)
                  ? "bg-[#e8f7ed] text-[#168a45]"
                  : "text-[#667066] hover:bg-[#f2f6f2] hover:text-[#168a45]"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-[#edf1ed] py-4 md:hidden"
          >
            <nav
              aria-label="মোবাইল পণ্যের ক্যাটাগরি"
              className="grid grid-cols-2 gap-2"
            >
              {categories.map((category) => (
                <Link
                  key={category.slug || "all"}
                  href={
                    category.slug
                      ? `/category/${category.slug}`
                      : "/"
                  }
                  onClick={closeMobileMenu}
                  aria-current={
                    isCategoryActive(category.slug) ? "page" : undefined
                  }
                  className={`rounded-xl px-4 py-3 text-sm font-bold ${
                    isCategoryActive(category.slug)
                      ? "bg-[#e8f7ed] text-[#168a45]"
                      : "bg-[#f7f9f7] text-[#596259]"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-[#edf1ed] pt-4">
              {isPending ? (
                <p className="text-center text-sm text-gray-500">
                  অপেক্ষা করুন...
                </p>
              ) : session?.user ? (
                <div className="flex flex-col gap-2">
                  {userLinks}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-[#dfe7df] px-4 py-3 text-center text-sm font-bold text-[#374037]"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-[#168a45] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

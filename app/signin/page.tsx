
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/socialbuttons";

function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedURL = searchParams.get("callbackURL") || "/";
  const callbackURL =
    requestedURL.startsWith("/") && !requestedURL.startsWith("//")
      ? requestedURL
      : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন");
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-black text-[#168a45]"
          >
            🛒 বাজার দর
          </Link>

          <p className="mt-2 text-sm text-[#778077]">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        <div className="rounded-3xl border border-[#e0e8e0] bg-white p-6 shadow-[0_15px_50px_rgba(22,35,22,0.08)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-black text-[#1b251b]">
              সাইন ইন
            </h1>

            <p className="mt-2 text-sm text-[#7b847b]">
              বাজার দর-এর আপনার অ্যাকাউন্টে প্রবেশ করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#344034]"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#899289]"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#344034]"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#899289]"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="আপনার পাসওয়ার্ড"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#168a45] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f7138] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e5ebe5]" />

            <span className="text-xs font-medium text-[#9aa29a]">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#e5ebe5]" />
          </div>

          <SocialButtons />

          <p className="mt-6 text-center text-sm text-[#737d73]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#168a45] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-[#737d73] hover:text-[#168a45]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SigninPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4]">
          <p className="text-sm text-gray-600">
            সাইন ইন পেজ লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <SigninForm />
    </Suspense>
  );
}
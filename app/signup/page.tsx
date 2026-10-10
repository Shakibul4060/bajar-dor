"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন");
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          callbackURL: "/",
        });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-black text-[#168a45]"
          >
            🛒 বাজার দর
          </Link>

          <p className="mt-2 text-sm text-[#778077]">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-3xl border border-[#e0e8e0] bg-white p-6 shadow-[0_15px_50px_rgba(22,35,22,0.08)] sm:p-8">

          <div className="mb-7">
            <h1 className="text-2xl font-black text-[#1b251b]">
              সাইন আপ
            </h1>

            <p className="mt-2 text-sm text-[#7b847b]">
              বাজার দর-এ আপনার অ্যাকাউন্ট তৈরি করুন।
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#344034]"
              >
                আপনার নাম
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#899289]"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="আপনার নাম"
                  className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
                />
              </div>
            </div>

            {/* Email */}
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
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
                />
              </div>
            </div>

            {/* Password */}
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
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#168a45] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f7138] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Sign In */}
          <p className="mt-6 text-center text-sm text-[#737d73]">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-[#168a45] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Home */}
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

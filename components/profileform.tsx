
"use client";

import { useState } from "react";
import { UserRound, Mail, Save, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  initialName: string;
  email: string;
};

export default function ProfileForm({ initialName, email }: Props) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      toast.success("আপনার প্রোফাইল আপডেট হয়েছে!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <section className="overflow-hidden rounded-3xl border border-[#e0e8e0] bg-white shadow-[0_18px_60px_rgba(20,50,25,0.07)]">
      <div className="h-2 bg-gradient-to-r from-[#168a45] via-[#36ad68] to-[#a8d86d]" />

      <div className="p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e8f6ec] text-2xl font-black text-[#168a45]">
            {initial}
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-xl font-extrabold text-[#1b291d]">
              {name.trim() || "ব্যবহারকারী"}
            </h2>
            <p className="mt-1 break-all text-sm text-[#758176]">{email}</p>
            <span className="mt-2 inline-flex rounded-full bg-[#e8f6ec] px-3 py-1 text-xs font-bold text-[#168a45]">
              বাজার দর সদস্য
            </span>
          </div>
        </div>

        <div className="mb-6 border-b border-[#edf1ed] pb-4">
          <h3 className="text-lg font-bold text-[#1b291d]">
            ব্যক্তিগত তথ্য
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#758176]">
            আপনার নাম দেখুন এবং প্রয়োজনে পরিবর্তন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-bold text-[#344034]"
            >
              আপনার নাম
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#899289]"
              />

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                maxLength={100}
                required
                className="w-full rounded-xl border border-[#dfe7df] bg-[#fbfcfb] py-3 pl-11 pr-4 text-sm text-[#1b291d] outline-none transition focus:border-[#168a45] focus:ring-4 focus:ring-[#168a45]/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="mb-2 block text-sm font-bold text-[#344034]"
            >
              ইমেইল ঠিকানা
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#899289]"
              />

              <input
                id="profile-email"
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-[#e6ebe6] bg-[#f3f6f3] py-3 pl-11 pr-4 text-sm text-[#758176] outline-none"
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-[#758176]">
              এই ফর্ম থেকে ইমেইল ঠিকানা পরিবর্তন করা যাবে না।
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#168a45] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f7138] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                আপডেট হচ্ছে...
              </>
            ) : (
              <>
                <Save size={18} />
                প্রোফাইল সংরক্ষণ করুন
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
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
      toast.error("তোমার নাম লিখো।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-content">
          {name.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold">{name || "ব্যবহারকারী"}</h2>
          <p className="break-all text-sm text-base-content/60">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="profile-name" className="mb-2 block font-medium">
            তোমার নাম
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input input-bordered w-full"
            placeholder="তোমার নাম লিখো"
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="profile-email" className="mb-2 block font-medium">
            ইমেইল
          </label>

          <input
            id="profile-email"
            type="email"
            value={email}
            className="input input-bordered w-full"
            readOnly
          />

          <p className="mt-1 text-xs text-base-content/60">
            এই ফর্ম থেকে ইমেইল পরিবর্তন করা যাবে না।
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করো"}
        </button>
      </form>
    </div>
  );
}

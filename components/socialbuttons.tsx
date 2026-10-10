"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Globe } from "lucide-react";
import { useState } from "react";

type Provider = "google" | "github";

export default function SocialButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);

  async function handleSocialLogin(provider: Provider) {
    try {
      setLoading(provider);

      await authClient.signIn.social({
        provider,
        callbackURL: "/profile",
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন করা যায়নি। আবার চেষ্টা করো।`);
      setLoading(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={loading !== null}
        className="flex items-center justify-center gap-2 rounded-xl border border-base-300 px-4 py-3 font-medium transition hover:bg-base-200 disabled:opacity-50"
      >
        <Globe size={19} />
        {loading === "google" ? "অপেক্ষা করো..." : "Google"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        disabled={loading !== null}
        className="flex items-center justify-center gap-2 rounded-xl border border-base-300 px-4 py-3 font-medium transition hover:bg-base-200 disabled:opacity-50"
      >
       <svg
  width="19"
  height="19"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.414-.012 2.741 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
</svg>
        {loading === "github" ? "অপেক্ষা করো..." : "GitHub"}
      </button>
    </div>
  );
}
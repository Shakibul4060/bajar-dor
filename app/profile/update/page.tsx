
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Settings2 } from "lucide-react";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/profileform";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
  headers: await headers(),
});

  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile%2Fupdate");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6ec] text-[#168a45]">
            <Settings2 size={27} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#168a45]">
              অ্যাকাউন্ট সেটিংস
            </p>
            <h1 className="mt-1 text-3xl font-black text-[#1b291d]">
              প্রোফাইল আপডেট
            </h1>
          </div>
        </div>

        <p className="mb-7 text-sm leading-7 text-[#758176]">
          আপনার নাম হালনাগাদ রাখুন। পরিবর্তন সংরক্ষণ করতে নিচের ফর্ম ব্যবহার করুন।
        </p>

        <ProfileForm
          initialName={session.user.name ?? ""}
          email={session.user.email ?? ""}
        />
      </div>
    </main>
  );
}

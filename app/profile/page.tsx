
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/profileform";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const authInstance = await auth();
  const session = await authInstance.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6ec] text-[#168a45]">
            <UserRound size={28} />
          </div>

          <p className="text-sm font-extrabold tracking-[0.16em] text-[#168a45]">
            BAZAR DOR ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#1b291d] sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#758176] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং নিজের নাম পরিবর্তন করুন।
          </p>
        </div>

        <ProfileForm
          initialName={session.user.name ?? ""}
          email={session.user.email ?? ""}
        />
      </div>
    </main>
  );
}

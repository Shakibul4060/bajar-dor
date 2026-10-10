import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/profileform";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile%2Fupdate");
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-2xl px-4 py-12">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold text-primary">
          BazarDor অ্যাকাউন্ট
        </p>

        <h1 className="text-3xl font-bold">
          প্রোফাইল আপডেট
        </h1>

        <p className="mt-3 mb-8 text-sm opacity-70">
          নিজের নাম পরিবর্তন করো এবং অ্যাকাউন্টের তথ্য হালনাগাদ রাখো।
        </p>

        <ProfileForm
          initialName={session.user.name ?? ""}
          email={session.user.email}
        />
      </div>
    </main>
  );
}
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/profileform";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">
          BAZARDOR ACCOUNT
        </p>
        <h1 className="mt-2 text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2 text-base-content/70">
          তোমার অ্যাকাউন্টের তথ্য দেখো এবং নাম পরিবর্তন করো।
        </p>
      </div>

      <ProfileForm
        initialName={session.user.name ?? ""}
        email={session.user.email ?? ""}
      />
    </main>
  );
}

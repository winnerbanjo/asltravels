import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getSession();

  if (user) {
    redirect("/");
  }

  return (
    <main className="page-shell py-12 md:py-16">
      <AuthForm mode="login" />
    </main>
  );
}

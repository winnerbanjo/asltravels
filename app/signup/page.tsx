import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="page-shell py-12 md:py-16">
      <AuthForm mode="signup" />
    </main>
  );
}

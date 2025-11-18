import { LoginForm } from "@/app/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm mt-16">
      <h2 className="text-2xl my-2">Login page</h2>
      <LoginForm />
    </div>
  );
}

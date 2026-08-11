import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Admin Login
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Sign in as Mr. Noe to manage catalog and orders.
      </p>
      <AdminLoginForm />
    </div>
  );
}

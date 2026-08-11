"use client";

import { useActionState, useState } from "react";
import { login, signup, logout, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export function AccountAuth({
  user,
}: {
  user: { name: string; email: string; role: string } | null;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction, loginPending] = useActionState(
    login,
    initial,
  );
  const [signupState, signupAction, signupPending] = useActionState(
    signup,
    initial,
  );

  if (user) {
    return (
      <div className="mt-8 border border-neutral-200 p-6">
        <p className="text-sm text-neutral-600">Signed in as</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">
          {user.name}
        </p>
        <p className="text-sm text-neutral-600">{user.email}</p>
        {user.role === "ADMIN" && (
          <a
            href="/admin"
            className="mt-4 inline-block text-[11px] font-semibold tracking-[0.14em] uppercase underline"
          >
            Open admin dashboard
          </a>
        )}
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="border border-neutral-300 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase hover:border-black"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex gap-4 text-[11px] font-semibold tracking-[0.14em] uppercase">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={mode === "login" ? "text-black" : "text-neutral-400"}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={mode === "signup" ? "text-black" : "text-neutral-400"}
        >
          Create account
        </button>
      </div>

      {mode === "login" ? (
        <form action={loginAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value="/account" />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
          {loginState.error && (
            <p className="text-sm text-red-600">{loginState.error}</p>
          )}
          <button
            type="submit"
            disabled={loginPending}
            className="w-full bg-black py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
          >
            {loginPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form action={signupAction} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Name"
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password (min 8 chars)"
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
          {signupState.error && (
            <p className="text-sm text-red-600">{signupState.error}</p>
          )}
          <button
            type="submit"
            disabled={signupPending}
            className="w-full bg-black py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
          >
            {signupPending ? "Creating..." : "Create Account"}
          </button>
        </form>
      )}
    </div>
  );
}

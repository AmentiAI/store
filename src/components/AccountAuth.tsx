"use client";

import { useActionState, useState } from "react";
import { login, signup, logout, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

const inputClass =
  "w-full min-w-0 border-2 border-accent bg-white px-3 py-3 text-base outline-none focus:border-accent-bright sm:text-sm";

export function AccountAuth({
  user,
  redirectTo = "/account",
  initialMode = "login",
}: {
  user: { name: string; email: string; role: string } | null;
  redirectTo?: string;
  initialMode?: "login" | "signup";
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
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
      <div className="mt-8 border-2 border-accent bg-white p-6">
        <p className="text-sm text-muted">Signed in as</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">
          {user.name}
        </p>
        <p className="text-sm text-muted">{user.email}</p>
        {user.role === "ADMIN" && (
          <a
            href="/admin"
            className="mt-4 inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-accent underline"
          >
            Open admin dashboard
          </a>
        )}
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="min-h-11 border-2 border-accent px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-accent hover:text-white"
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
          className={`min-h-11 ${mode === "login" ? "text-accent" : "text-muted"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`min-h-11 ${mode === "signup" ? "text-accent" : "text-muted"}`}
        >
          Create account
        </button>
      </div>

      {mode === "login" ? (
        <form action={loginAction} className="space-y-4" autoComplete="on">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            className={inputClass}
          />
          {loginState.error && (
            <p className="text-sm text-red-400">{loginState.error}</p>
          )}
          <button
            type="submit"
            disabled={loginPending}
            className="w-full min-h-12 bg-accent py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
          >
            {loginPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form action={signupAction} className="space-y-4" autoComplete="on">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Create a password (min 8 chars)"
            className={inputClass}
          />
          {signupState.error && (
            <p className="text-sm text-red-400">{signupState.error}</p>
          )}
          <button
            type="submit"
            disabled={signupPending}
            className="w-full min-h-12 bg-accent py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
          >
            {signupPending ? "Creating..." : "Create Your Account"}
          </button>
        </form>
      )}
    </div>
  );
}

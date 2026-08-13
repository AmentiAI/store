"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="mt-8 space-y-4" autoComplete="on">
      <input type="hidden" name="redirectTo" value="/admin" />
      <div>
        <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-black"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-black"
        />
      </div>
      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
          className="min-h-12 w-full bg-black py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex min-w-0 border-2 border-accent bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
        setEmail("");
      }}
    >
      {done ? (
        <p className="w-full px-3 py-2.5 text-sm text-accent">
          You&apos;re on the list.
        </p>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none placeholder:text-muted sm:py-2.5 sm:text-sm"
          />
          <button
            type="submit"
            className="shrink-0 bg-accent px-4 text-[11px] font-semibold tracking-[0.12em] uppercase text-white hover:bg-accent-bright"
          >
            Join
          </button>
        </>
      )}
    </form>
  );
}

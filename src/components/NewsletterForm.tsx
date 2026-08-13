"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex border border-line bg-background"
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
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            className="bg-accent px-4 text-[11px] font-semibold tracking-[0.12em] uppercase text-background hover:bg-accent-bright"
          >
            Join
          </button>
        </>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex border border-neutral-300 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
        setEmail("");
      }}
    >
      {done ? (
        <p className="w-full px-3 py-2.5 text-sm text-neutral-700">
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
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-black px-4 text-[11px] font-semibold tracking-[0.12em] uppercase text-white"
          >
            Join
          </button>
        </>
      )}
    </form>
  );
}

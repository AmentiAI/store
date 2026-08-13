"use client";

import { useActionState } from "react";
import {
  updateAnnouncement,
  type AdminState,
} from "@/app/actions/admin";
import { DEFAULT_ANNOUNCEMENT } from "@/lib/site-settings";

const initial: AdminState = {};

export function AnnouncementSettingsForm({
  current,
}: {
  current: string;
}) {
  const [state, action, pending] = useActionState(updateAnnouncement, initial);

  return (
    <form action={action} className="max-w-xl space-y-4 border border-neutral-200 bg-white p-5 sm:p-6">
      <div>
        <label
          htmlFor="announcement"
          className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500"
        >
          Announcement bar
        </label>
        <input
          id="announcement"
          name="announcement"
          type="text"
          required
          maxLength={160}
          defaultValue={current}
          placeholder={DEFAULT_ANNOUNCEMENT}
          className="w-full min-w-0 border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-black"
        />
        <p className="mt-2 text-xs text-neutral-500">
          Shown as the centered line in the store announcement bar. On phones
          this is the only line customers see. Max 160 characters.
        </p>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-700">{state.success}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 bg-black px-5 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save announcement"}
      </button>
    </form>
  );
}

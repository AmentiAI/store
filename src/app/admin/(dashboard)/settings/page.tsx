import { AnnouncementSettingsForm } from "@/components/admin/AnnouncementSettingsForm";
import { getAnnouncementText } from "@/lib/announcement";

export const metadata = { title: "Admin Settings" };

export default async function AdminSettingsPage() {
  const announcement = await getAnnouncementText();

  return (
    <div>
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Settings
      </h1>
      <p className="mb-8 max-w-xl text-sm text-neutral-600">
        Update storefront copy. Changes show on the live site right after you
        save.
      </p>
      <AnnouncementSettingsForm current={announcement} />
    </div>
  );
}

import { CheckoutForm } from "@/components/CheckoutForm";
import { getCurrentUser } from "@/app/actions/auth";
import {
  getPaypalClientId,
  isPaypalConfigured,
  isPaypalLive,
} from "@/lib/paypal";

export const metadata = { title: "Checkout" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-[1100px] px-3 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <CheckoutForm
        clientId={isPaypalConfigured() ? getPaypalClientId() : ""}
        paypalLive={isPaypalLive()}
        defaultEmail={user?.email}
        defaultName={user?.name}
      />
    </div>
  );
}

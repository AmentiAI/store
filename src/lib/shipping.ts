export const FREE_SHIPPING_THRESHOLD = 150;
export const FLAT_SHIPPING_USD = 10;

export function shippingForSubtotal(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_USD;
}

export function money(value: number) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

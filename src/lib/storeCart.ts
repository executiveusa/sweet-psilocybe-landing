export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantLabel: string;
  priceCents: number;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = "sp_cart_v1";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore quota/storage errors in private browsing
  }
}

export function addToCart(item: Omit<CartItem, "quantity">): CartItem[] {
  const current = readCart();
  const idx = current.findIndex(
    (entry) =>
      entry.productId === item.productId && entry.variantId === item.variantId
  );
  const next = [...current];
  if (idx >= 0) {
    next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
  } else {
    next.push({ ...item, quantity: 1 });
  }
  writeCart(next);
  return next;
}

export function removeFromCart(productId: string, variantId: string): CartItem[] {
  const next = readCart().filter(
    (entry) => !(entry.productId === productId && entry.variantId === variantId)
  );
  writeCart(next);
  return next;
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

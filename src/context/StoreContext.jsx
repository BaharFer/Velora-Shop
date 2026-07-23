import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage("velora_cart", []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage("velora_wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("velora_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("velora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product, size, color, qty = 1) => {
    setCart((prev) => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { key, product, size, color, qty }];
    });
    showToast(`${product.name} added to bag`);
    setCartOpen(true);
  };

  const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  const updateQty = (key, delta) =>
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((p) => p.id !== product.id);
      }
      showToast("Added to wishlist");
      return [...prev, product];
    });
  };

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value = {
    cart, wishlist, cartOpen, toast,
    setCartOpen, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist,
    subtotal, cartCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQty, subtotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/40"
          onClick={() => setCartOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-canvas flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#e5ddd0]">
              <span className="font-display text-2xl">Your Bag ({cart.reduce((s, i) => s + i.qty, 0)})</span>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} strokeWidth={1} className="text-[#a89f91]" />
                <p className="text-[#8a7f6c]">Your bag is empty</p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/shop");
                  }}
                  className="text-sm underline underline-offset-4"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                  {cart.map((item) => (
                    <div key={item.key} className="flex gap-4">
                      <img src={item.product.img} alt={item.product.name} className="w-20 h-24 object-cover rounded-sm" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <button onClick={() => removeFromCart(item.key)} aria-label="Remove item">
                            <Trash2 size={14} className="text-[#a89f91] hover:text-ink" />
                          </button>
                        </div>
                        <p className="text-xs text-[#8a7f6c] mt-1">
                          Size {item.size} · {item.color}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#e5ddd0] rounded-full">
                            <button onClick={() => updateQty(item.key, -1)} className="p-1.5" aria-label="Decrease quantity">
                              <Minus size={12} />
                            </button>
                            <span className="text-xs w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.key, 1)} className="p-1.5" aria-label="Increase quantity">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-medium">${item.product.price * item.qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-[#e5ddd0]">
                  <div className="flex justify-between mb-4 text-sm">
                    <span className="text-[#8a7f6c]">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-ink text-white py-4 text-sm tracking-wide hover:bg-champagne hover:text-ink transition-colors duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

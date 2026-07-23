import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0 && step < 4) {
    return (
      <div className="pt-32 pb-24 px-6 text-center min-h-screen">
        <p className="text-[#8a7f6c] mb-4">Your bag is empty. Add items to checkout.</p>
        <button onClick={() => navigate("/shop")} className="text-sm underline underline-offset-4">
          Go to shop
        </button>
      </div>
    );
  }

  const placeOrder = () => {
    setStep(4);
    clearCart();
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-10 max-w-6xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl mb-10">Checkout</h1>

      <div className="flex gap-6 mb-12 text-sm">
        {["Information", "Shipping", "Payment"].map((s, i) => (
          <div key={s} className={`flex items-center gap-2 ${step >= i + 1 ? "text-ink" : "text-[#a89f91]"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= i + 1 ? "bg-ink text-white" : "border border-[#e5ddd0]"}`}>{i + 1}</span>
            {s}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-display text-2xl mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First name" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                <input placeholder="Last name" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <input placeholder="Email address" type="email" className="w-full border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              <input placeholder="Phone number" className="w-full border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              <h2 className="font-display text-2xl mb-4 pt-4">Shipping Address</h2>
              <input placeholder="Street address" className="w-full border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              <div className="grid grid-cols-3 gap-4">
                <input placeholder="City" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                <input placeholder="State" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                <input placeholder="ZIP code" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <button onClick={() => setStep(2)} className="bg-ink text-white px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors">
                Continue to Shipping
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-display text-2xl mb-4">Shipping Method</h2>
              {[
                { name: "Standard Shipping", time: "5-7 business days", price: shipping === 0 ? "Free" : "$15" },
                { name: "Express Shipping", time: "2-3 business days", price: "$35" },
                { name: "Next Day Delivery", time: "1 business day", price: "$60" },
              ].map((opt, i) => (
                <label
                  key={opt.name}
                  className="flex items-center justify-between border border-[#e5ddd0] px-5 py-4 cursor-pointer hover:border-champagne has-[:checked]:border-champagne has-[:checked]:bg-[#F0EAE0]/50"
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" defaultChecked={i === 0} className="accent-champagne" />
                    <div>
                      <p className="text-sm font-medium">{opt.name}</p>
                      <p className="text-xs text-[#8a7f6c]">{opt.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{opt.price}</span>
                </label>
              ))}
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="border border-ink px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-ink hover:text-white transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="bg-ink text-white px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors">
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-display text-2xl mb-4">Payment Method</h2>
              <div className="border border-[#e5ddd0] p-5 space-y-4">
                <div className="flex gap-3">
                  {["Visa", "Mastercard", "Amex"].map((c) => (
                    <span key={c} className="text-[10px] tracking-wide uppercase border border-[#e5ddd0] px-2.5 py-1 text-[#8a7f6c]">
                      {c}
                    </span>
                  ))}
                </div>
                <input placeholder="Card number" className="w-full border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM / YY" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                  <input placeholder="CVC" className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
                </div>
                <input placeholder="Name on card" className="w-full border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(2)} className="border border-ink px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-ink hover:text-white transition-colors">
                  Back
                </button>
                <button onClick={placeOrder} className="bg-ink text-white px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors">
                  Place Order
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-champagne" />
              </div>
              <h2 className="font-display text-3xl mb-3">Order Confirmed</h2>
              <p className="text-sm text-[#8a7f6c] mb-8 max-w-sm mx-auto">Thank you for shopping with Velora. A confirmation email is on its way.</p>
              <button onClick={() => navigate("/")} className="bg-ink text-white px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors">
                Continue Shopping
              </button>
            </motion.div>
          )}
        </div>

        {step < 4 && (
          <div className="bg-[#F0EAE0] p-6 h-fit">
            <h3 className="font-display text-xl mb-5">Order Summary</h3>
            <div className="space-y-4 mb-5 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <img src={item.product.img} className="w-14 h-16 object-cover" alt="" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-[#8a7f6c]">
                      Qty {item.qty} · Size {item.size}
                    </p>
                  </div>
                  <span className="text-sm">${item.product.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#d8d2c5] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#8a7f6c]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-[#8a7f6c]">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-[#d8d2c5]">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

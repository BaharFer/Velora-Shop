import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Women", cat: "Women" },
    { label: "Men", cat: "Men" },
    { label: "Accessories", cat: "Accessories" },
    { label: "New Arrivals", cat: "New" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-canvas/95 backdrop-blur-md shadow-[0_1px_0_rgba(17,17,17,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          <button onClick={() => navigate("/")} className="font-display text-2xl tracking-[0.15em] text-ink">
            VELORA
          </button>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => navigate(`/shop?category=${l.cat}`)}
                className="relative text-[13px] tracking-wide text-body group py-2"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-champagne transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:opacity-60 transition">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate("/wishlist")} aria-label="Wishlist" className="relative hover:opacity-60 transition hidden sm:block">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative hover:opacity-60 transition">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-champagne text-ink text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate("/login")} aria-label="Account" className="hover:opacity-60 transition hidden sm:block">
              <User size={18} strokeWidth={1.5} />
            </button>
            <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="lg:hidden">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-canvas p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-display text-xl">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => {
                      navigate(`/shop?category=${l.cat}`);
                      setMobileOpen(false);
                    }}
                    className="text-left font-display text-2xl"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    navigate("/wishlist");
                    setMobileOpen(false);
                  }}
                  className="text-left font-display text-2xl"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileOpen(false);
                  }}
                  className="text-left font-display text-2xl"
                >
                  Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-canvas/98 backdrop-blur-sm flex items-start justify-center pt-32 px-6"
          >
            <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="absolute top-8 right-8">
              <X size={24} />
            </button>
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-full max-w-2xl">
              <input
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent border-b border-ink text-3xl font-display py-4 focus:outline-none placeholder:text-[#a89f91]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/shop?search=${encodeURIComponent(searchValue)}`);
                    setSearchOpen(false);
                  }
                }}
              />
              <div className="mt-6 text-sm text-[#8a7f6c]">Try "trench coat", "loafers", "cashmere"</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

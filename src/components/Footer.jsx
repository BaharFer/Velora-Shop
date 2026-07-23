import React from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-ink text-parchment pt-20 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl tracking-[0.15em] mb-4">VELORA</p>
          <p className="text-xs text-parchment/60 leading-relaxed">
            Premium fashion for the modern individual. Crafted with intention, worn with confidence.
          </p>
          <div className="flex gap-4 mt-6">
            <Instagram size={16} className="hover:text-champagne cursor-pointer transition-colors" />
            <Twitter size={16} className="hover:text-champagne cursor-pointer transition-colors" />
            <Facebook size={16} className="hover:text-champagne cursor-pointer transition-colors" />
          </div>
        </div>
        <div>
          <p className="text-xs tracking-wide uppercase text-champagne mb-4">Shop</p>
          <div className="flex flex-col gap-2.5 text-sm">
            <button onClick={() => navigate("/shop?category=Women")} className="text-left hover:text-champagne transition-colors">Women</button>
            <button onClick={() => navigate("/shop?category=Men")} className="text-left hover:text-champagne transition-colors">Men</button>
            <button onClick={() => navigate("/shop?category=Accessories")} className="text-left hover:text-champagne transition-colors">Accessories</button>
            <button onClick={() => navigate("/shop")} className="text-left hover:text-champagne transition-colors">New Arrivals</button>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-wide uppercase text-champagne mb-4">Customer Service</p>
          <div className="flex flex-col gap-2.5 text-sm text-parchment/80">
            <span>Contact Us</span>
            <span>Shipping & Returns</span>
            <span>Size Guide</span>
            <span>FAQ</span>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-wide uppercase text-champagne mb-4">Company</p>
          <div className="flex flex-col gap-2.5 text-sm text-parchment/80">
            <span>About Velora</span>
            <span>Sustainability</span>
            <span>Careers</span>
            <span>Press</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-parchment/10 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-parchment/50">
        <span>© 2026 Velora. All rights reserved.</span>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

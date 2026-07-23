import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Eyebrow } from "../components/Ui";

export default function Wishlist() {
  const { wishlist } = useStore();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto min-h-screen">
      <Eyebrow>Saved</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl mb-10">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="py-20 text-center">
          <Heart size={40} strokeWidth={1} className="text-[#a89f91] mx-auto mb-4" />
          <p className="text-[#8a7f6c] mb-4">Your wishlist is empty</p>
          <button onClick={() => navigate("/shop")} className="text-sm underline underline-offset-4">
            Discover products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {wishlist.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

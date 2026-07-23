import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Minus, Plus, ChevronLeft } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PriceTag, StarRating } from "../components/Ui";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const product = PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  useEffect(() => {
    setActiveImg(0);
    setSize(product.sizes[0]);
    setColor(product.colors[0]);
    setQty(1);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  return (
    <div className="pt-28 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <button onClick={() => navigate("/shop")} className="text-xs tracking-wide uppercase text-[#8a7f6c] flex items-center gap-1 mb-8 hover:text-ink">
        <ChevronLeft size={14} /> Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <motion.div key={activeImg} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="aspect-[3/4] bg-[#F0EAE0] overflow-hidden mb-4">
            <img src={product.gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="flex gap-3">
            {product.gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-24 overflow-hidden border-2 ${activeImg === i ? "border-champagne" : "border-transparent"}`}>
                <img src={g} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-wide uppercase text-[#8a7f6c] mb-2">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{product.name}</h1>
          <StarRating value={product.rating} />
          <div className="mt-4 mb-6">
            <PriceTag price={product.price} oldPrice={product.oldPrice} />
          </div>
          <p className="text-sm text-[#5c5348] leading-relaxed mb-8">
            Crafted from the finest materials with meticulous attention to detail, this piece embodies Velora's commitment to
            timeless elegance and modern sophistication. Designed to move with you, season after season.
          </p>

          <div className="mb-6">
            <p className="text-xs tracking-wide uppercase text-[#8a7f6c] mb-3">Color</p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-champagne" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs tracking-wide uppercase text-[#8a7f6c] mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 text-sm border ${size === s ? "border-ink bg-ink text-white" : "border-[#e5ddd0] hover:border-ink"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-[#e5ddd0] rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3">
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, size, color, qty)}
              className="flex-1 bg-ink text-white py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)} className="w-12 h-12 border border-[#e5ddd0] rounded-full flex items-center justify-center shrink-0 hover:border-ink">
              <Heart size={16} className={isWishlisted ? "fill-ink text-ink" : ""} />
            </button>
          </div>

          <div className="border-t border-[#e5ddd0] pt-6 text-xs text-[#8a7f6c] space-y-2">
            <p>Free shipping on orders over $200</p>
            <p>30-day return policy</p>
            <p>Sustainably sourced materials</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-3xl mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

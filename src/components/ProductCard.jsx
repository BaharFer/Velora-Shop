import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { PriceTag, StarRating } from "./Ui";

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-[#F0EAE0] aspect-[3/4] cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 text-[10px] tracking-wide uppercase px-2.5 py-1 ${
              product.badge === "Sale" ? "bg-ink text-white" : "bg-champagne text-ink"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={14} className={isWishlisted ? "fill-ink text-ink" : "text-ink"} />
        </button>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-outgroup-hover:scale-105
group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.sizes[0], product.colors[0]);
            }}
            className="w-full bg-canvas text-ink text-xs tracking-wide px-8 py-3 rounded-full text-xs tracking-[0.15em] hover:bg-ink hover:text-white transition-colors duration-300"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="pt-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <p className="text-[11px] text-[#8a7f6c] tracking-wide uppercase mb-1">{product.category}</p>
        <p className="text-sm font-medium mb-1">{product.name}</p>
        <div className="flex items-center justify-between">
          <PriceTag price={product.price} oldPrice={product.oldPrice} />
          <StarRating value={product.rating} />
        </div>
      </div>
    </motion.div>
  );
}

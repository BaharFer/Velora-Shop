import React from "react";
import { Star } from "lucide-react";

export function Eyebrow({ children, dark }) {
  return (
    <div className={`text-[11px] tracking-[0.25em] uppercase font-medium mb-3 ${dark ? "text-parchment" : "text-[#8a7f6c]"}`}>
      {children}
    </div>
  );
}

export function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={12} className={n <= Math.round(value) ? "fill-champagne text-champagne" : "text-[#d8d2c5]"} />
      ))}
      <span className="text-[11px] text-[#8a7f6c] ml-1">{value}</span>
    </div>
  );
}

export function PriceTag({ price, oldPrice }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-medium text-ink">${price}</span>
      {oldPrice && <span className="text-[#a89f91] line-through text-sm">${oldPrice}</span>}
    </div>
  );
}

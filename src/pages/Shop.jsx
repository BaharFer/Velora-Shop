import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Eyebrow } from "../components/Ui";
import { PRODUCTS } from "../data/products";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState(1200);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearch(searchParam);
  }, [categoryParam, searchParam]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "All" && activeCategory !== "New") list = list.filter((p) => p.category === activeCategory);
    if (activeCategory === "New") list = list.filter((p) => p.badge === "New");
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((p) => p.price <= priceRange);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, search, sort, priceRange]);

  const cats = ["All", "Women", "Men", "Accessories", "New"];

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <Eyebrow>Shop</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl">{activeCategory === "All" ? "All Products" : activeCategory}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <aside className="md:w-64 shrink-0">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden flex items-center justify-between w-full py-3 border-y border-[#e5ddd0] mb-4 text-sm">
            Filters {filtersOpen ? <ChevronLeft size={16} className="rotate-90" /> : <ChevronRight size={16} className="rotate-90" />}
          </button>
          <div className={`${filtersOpen ? "block" : "hidden"} md:block space-y-8`}>
            <div>
              <p className="text-xs tracking-wide uppercase text-[#8a7f6c] mb-3">Search</p>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a89f91]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  className="w-full border border-[#e5ddd0] pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-champagne bg-white/50"
                />
              </div>
            </div>
            <div>
              <p className="text-xs tracking-wide uppercase text-[#8a7f6c] mb-3">Category</p>
              <div className="flex flex-col gap-2">
                {cats.map((c) => (
                  <button key={c} onClick={() => setActiveCategory(c)} className={`text-left text-sm py-1 ${activeCategory === c ? "text-ink font-medium" : "text-[#8a7f6c]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs tracking-wide uppercase text-[#8a7f6c] mb-3">Max Price: ${priceRange}</p>
              <input type="range" min="200" max="1200" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-champagne" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#8a7f6c]">{filtered.length} items</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border border-[#e5ddd0] px-3 py-2 bg-transparent focus:outline-none">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-[#8a7f6c]">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

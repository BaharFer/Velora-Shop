import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Eyebrow } from "../components/Ui";
import { PRODUCTS, CATEGORIES } from "../data/products";

function FeaturedCollections() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 md:px-10 bg-canvas">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Curated for you</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => navigate(`/shop?category=${cat.key}`)}
              className="relative group cursor-pointer overflow-hidden aspect-[3/4]"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <span className="text-canvas font-display text-lg md:text-xl">{cat.name}</span>
                <ArrowRight size={16} className="text-champagne group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 md:px-10 bg-[#F0EAE0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <Eyebrow>The Edit</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">Best Sellers</h2>
          </div>
          <button onClick={() => navigate("/shop")} className="text-xs tracking-[0.15em] uppercase border-b border-ink pb-1 hover:border-champagne transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="py-32 px-6 bg-ink text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <Eyebrow dark>The Velora Philosophy</Eyebrow>
        <p className="font-display text-3xl md:text-5xl text-canvas max-w-3xl mx-auto leading-tight italic">
          "Style is not what you wear — it is how you carry the silence between trends."
        </p>
      </motion.div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-xl mx-auto text-center">
        <Eyebrow>Stay in the Loop</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl mb-6">Join the Velora Circle</h2>
        <p className="text-sm text-[#5c5348] mb-8">Be the first to know about new arrivals, exclusive offers, and private sales.</p>
        {submitted ? (
          <p className="text-sm flex items-center justify-center gap-2">
            <Check size={16} className="text-champagne" /> Thank you for subscribing.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent border-b border-ink py-3 text-sm focus:outline-none placeholder:text-[#8a7f6c]"
            />
            <button type="submit" className="px-6 text-xs tracking-wide uppercase border-b border-ink hover:text-champagne hover:border-champagne transition-colors">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <ProductShowcase />
      <Manifesto />
      <Newsletter />
    </>
  );
}

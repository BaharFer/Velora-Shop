import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "./Ui";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: false,
        },
      });

      // Wardrobe doors part like they're opening
      tl.to(doorLeftRef.current, { xPercent: -100, ease: "none" }, 0)
        .to(doorRightRef.current, { xPercent: 100, ease: "none" }, 0)
        // Hero copy fades and lifts away
        .to(contentRef.current, { opacity: 0, y: -80, ease: "none" }, 0)
        // Background slowly zooms for a camera dolly-in feeling
        .to(bgRef.current, { scale: 1.15, ease: "none" }, 0)
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
       <div
  ref={bgRef}className="absolute inset-0 origin-center will-change-transform"
>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_65%)] z-0" />

<div className="absolute left-1/2 top-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[140px] z-0" />
          <img
            src="/images/hero image.jpg"
            className="w-full h-full object-cover scale-105 opacity-55 transition-transform duration-[2500ms]"
            alt="Velora atelier backdrop"
          />
         <div className="absolute inset-0 bg-black/40" />

<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        {/* Wardrobe doors */}
        <div
          ref={doorLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] border-r border-champagne/20 z-20"
        >
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300/20 via-transparent to-transparent blur-3xl" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-1 h-24 bg-champagne/40 rounded-full" />
        </div>
        <div
          ref={doorRightRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#1a1a1a] to-[#0d0d0d] border-l border-champagne/20 z-20"
        >
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-1 h-24 bg-champagne/40 rounded-full" />
        </div>


        {/* Hero copy */}
        <div ref={contentRef} className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <Eyebrow dark>VELORA · Fall Collection</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-8xl text-canvas leading-[0.95] max-w-4xl"
          >
            Discover Your <em className="italic text-champagne">Signature</em> Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-parchment/80 mt-6 max-w-md text-sm md:text-base tracking-wide"
          >
            Premium fashion designed for modern individuals
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <button
              onClick={() => navigate("/shop")}
              className="bg-champagne text-ink px-8 py-4 rounded-full text-xs tracking-[0.15em] uppercase hover:bg-canvas transition-colors duration-300"
            >
              Explore Collection
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="border border-parchment/40 rounded-full text-canvas px-8 py-4 text-xs tracking-[0.15em] uppercase hover:border-canvas transition-colors duration-300"
            >
              Shop Now
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-px h-10 bg-gradient-to-b from-champagne to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

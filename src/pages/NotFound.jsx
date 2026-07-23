import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
      <p className="font-display text-7xl mb-4">404</p>
      <p className="text-[#8a7f6c] mb-8">This page doesn't exist, or has moved.</p>
      <button onClick={() => navigate("/")} className="bg-ink text-white px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors">
        Back to Home
      </button>
    </div>
  );
}

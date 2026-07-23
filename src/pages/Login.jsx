import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-2xl tracking-[0.15em] mb-2">VELORA</p>
          <h1 className="font-display text-3xl">Welcome Back</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/profile");
          }}
          className="space-y-4"
        >
          <input required type="email" placeholder="Email address" className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-champagne transition-all" />
          <input required type="password" placeholder="Password" className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-champagne transition-all" />
          <button type="submit" className="w-full rounded-xl bg-ink text-white py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-[#8a7f6c] mt-6">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-ink font-medium hover:text-champagne transition-colors">
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
}

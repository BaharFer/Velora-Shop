import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-2xl tracking-[0.15em] mb-2">VELORA</p>
          <h1 className="font-display text-3xl">Create Account</h1>
        </div>
        <form
         onSubmit={(e) => {
         e.preventDefault();
        const user = {
              name,
             email,
            password,
          };
        console.log("Saving user:", user);
         localStorage.setItem("user", JSON.stringify(user));
         navigate("/profile");
}}

          className="space-y-4"
        >
          <input required placeholder="Full name"value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-champagne transition-all"/>
          <input required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-champagne transition-all"/>
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}className="w-full border border-[#e5ddd0] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-champagne transition-all"/>
          <button type="submit" className="w-full rounded-xl bg-ink text-white py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-[#8a7f6c] mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-ink font-medium hover:text-champagne transition-colors">
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}

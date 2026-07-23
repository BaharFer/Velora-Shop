import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-ink text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 shadow-xl"
        >
          <Check size={14} className="text-champagne" /> {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

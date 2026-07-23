import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/Velora-Shop/",

  server: {
    port: 5173,
    open: true,
  },
});

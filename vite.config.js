import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
  },
  server: {
    open: true,
    port: 5173,
  },
  
});

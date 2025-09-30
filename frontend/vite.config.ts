import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.VITE_WS_URL_PROD": JSON.stringify(
      process.env.VITE_WS_URL_PROD
    ),
  },
});

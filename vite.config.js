import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from all devices on the network
    port: 5173, // Ensure the port is correct
    allowedHosts: [
      "a21c-113-11-90-206.ngrok-free.app", // Add your Ngrok hostname here
    ],
  },
});

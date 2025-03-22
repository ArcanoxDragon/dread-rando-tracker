import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint2";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		eslint(),
		react(),
		tailwindcss(),
	],
	base: "https://randomizer.hijumpboots.com/tracker/",
	preview: {
		port: 5173,
		strictPort: true,
	},
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:5173",
	},
});

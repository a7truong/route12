import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // must be "/" when using a custom domain, if using the GitHub pages domain, change to "/route12/" - must also change homepage in package.json to the https://a7truong.github.io/route12 URL as well
  base: "/",
});

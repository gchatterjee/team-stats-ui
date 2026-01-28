import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/team-stats-ui" : "/team-stats-ui/",
  plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],
}));

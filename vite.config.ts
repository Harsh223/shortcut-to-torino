import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
  },
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  plugins: [
    tanstackStart({
      srcDirectory: "src",
      server: { entry: "server.ts" },
    }),
    viteReact(),
    tailwindcss(),
    nitro({
      preset: "node_server",
      ignore: ["**/._*"],
    }),
  ],
});

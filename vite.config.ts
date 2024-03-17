import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from 'path';

export default defineConfig({
    plugins: [react()],
    base: "/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                exibit: resolve(__dirname, 'exhibit/index.html'),
                creative: resolve(__dirname, 'exhibit/creative/index.html'),
                resume: resolve(__dirname, "/exhibit/resume.html"),
                bendwell: resolve(__dirname, "/exhibit/bendwell.html"),
                speaksign: resolve(__dirname, "/exhibit/speaksign.html"),
                cfesim: resolve(__dirname, "/exhibit/cfesim.html"),
                threejs: resolve(__dirname, "/exhibit/creative/threejs/index.html"),
                p5js: resolve(__dirname, "/exhibit/creative/p5js/index.html"),
                purpose: resolve(__dirname, "purpose.html")
            }
        }
    }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import * as process from 'process';
import * as path from "node:path";

export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    server: {
        host: 'localhost',
        port: parseInt(process.env.FRONTEND_PORT || '5173'),
        proxy: {
            '/api': {
                target: process.env.BACKEND_URL || 'http://localhost:3001',
                changeOrigin: true,
            },
            '/trpc': {
                target: process.env.BACKEND_URL || 'http://localhost:3001',
                changeOrigin: true,
            }
        },
        watch: {
            usePolling: true,  // Moved inside the watch object
        },
    },
    build: {
        outDir: 'build',
    },
    cacheDir: '.vite',
    plugins: [
        tailwindcss(),
        react(),
        eslint({
            exclude: ['**/node_modules/**', '**/.*/**', '**/.vite/**'],
            failOnWarning: false,
            failOnError: false,
        }),
    ],
});
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'resources/js/components/er-diagram.js'),
            formats: ['es'],
            fileName: () => 'er-diagram.js',
        },
        outDir: 'resources/js/dist',
        emptyOutDir: true,
        rollupOptions: {
            external: [],
        },
        sourcemap: false,
    },
})

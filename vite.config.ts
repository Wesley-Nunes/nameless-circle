/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        coverage: {
            reporter: ['html'],
            exclude: [
                '**/*.interface.ts',
                '**/index.ts',
                '**/vite-env.d.ts',
                '**/*.config.*',
                'src/main.tsx'
            ]
        }
    }
})


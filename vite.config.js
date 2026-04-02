const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                en: resolve(__dirname, 'en/index.html'),
                roadmap: resolve(__dirname, 'roadmap/index.html'),
                enRoadmap: resolve(__dirname, 'en/roadmap/index.html'),
            },
        },
    },
})

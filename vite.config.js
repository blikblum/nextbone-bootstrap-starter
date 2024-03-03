import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import autoprefixer from 'autoprefixer'
import babel from 'vite-plugin-babel'

export default defineConfig(({ mode }) => {
  const devModes = ['development', 'remote']
  return {
    root: 'src',
    build: {
      // Relative to the root
      outDir: '../dist',
    },
    publicDir: '../public',
    envDir: '..',
    plugins: [
      babel({
        babelConfig: { sourceMaps: devModes.includes(mode) ? 'inline' : false },
        filter: /^(?!.*node_modules(?!.*luipack)).*\.jsx?$/,
      }),
      tsConfigPaths(),
    ],
    css: {
      postcss: { plugins: [autoprefixer()] },
    },
  }
})

import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import autoprefixer from 'autoprefixer'

// local copy with fix to https://github.com/owlsdepartment/vite-plugin-babel/issues/12
import babel from './vite-plugin-babel.js'

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

import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import tsConfigPaths from 'vite-tsconfig-paths'
import autoprefixer from 'autoprefixer'

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
        // blocked by https://github.com/owlsdepartment/vite-plugin-babel/issues/12
        // filter: /^(?!.*node_modules(?!.*luipack)).*\.jsx?$/,
      }),
      tsConfigPaths(),
    ],
    css: {
      postcss: { plugins: [autoprefixer()] },
    },
  }
})

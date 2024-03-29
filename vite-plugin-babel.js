import babel from '@babel/core'; 
import fs from 'fs';
import path from 'path';

const esbuildPluginBabel = (options = {}) => ({
  name: "babel",
  setup(build) {
    const { filter = /.*/, namespace = "", config = {}, loader } = options;
    const resolveLoader = (args) => {
      if (typeof loader === "function") {
        return loader(args.path);
      }
      return loader;
    };
    const transformContents = async (args, contents) => {
      const babelOptions = babel.loadOptions({
        filename: args.path,
        ...config,
        caller: {
          name: "esbuild-plugin-babel",
          supportsStaticESM: true
        }
      });
      if (!babelOptions) {
        return { contents, loader: resolveLoader(args) };
      }
      if (babelOptions.sourceMaps) {
        babelOptions.sourceFileName = path.relative(process.cwd(), args.path);
      }
      return new Promise((resolve, reject) => {
        babel.transform(contents, babelOptions, (error, result) => {
          error ? reject(error) : resolve({
            contents: result?.code ?? "",
            loader: resolveLoader(args)
          });
        });
      });
    };
    build.onLoad({ filter: /.*/, namespace }, async (args) => {
      const shouldTransform = filter.test(args.path);
      if (!shouldTransform)
        return;
      const contents = await fs.promises.readFile(args.path, "utf8");
      return transformContents(args, contents);
    });
  }
});

const DEFAULT_FILTER = /\.jsx?$/;
const babelPlugin = ({ babelConfig = {}, filter = DEFAULT_FILTER, apply, loader } = {}) => {
  return {
    name: "babel-plugin",
    apply,
    enforce: "pre",
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              esbuildPluginBabel({
                config: { ...babelConfig },
                filter,
                loader
              })
            ]
          }
        }
      };
    },
    transform(code, id) {
      const shouldTransform = filter.test(id);
      if (!shouldTransform)
        return;
      const { code: output, map } = babel.transformSync(code, {
        filename: id,
        ...babelConfig
      }) ?? {};
      return {
        code: output ?? "",
        map
      };
    }
  };
};

export { babelPlugin as default, esbuildPluginBabel };

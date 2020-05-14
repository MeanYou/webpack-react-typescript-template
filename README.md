# Webpack Boilerplate

参考 [`webpack-boilerplate`](https://github.com/jantimon/html-webpack-plugin) 和 [`create-react-app`](https://github.com/facebook/create-react-app) 写的一个webpack基础配置，满足普通项目使用

## 安装

```
git clone https://gitee.com/meanyou/webpack-boilerplate.git
npm i
```

## 使用

### 启动开发环境

```bash
npm start
```

项目自动打开，默认端口8080

### 生产环境打包

普通打包
```bash
npm run build
```

生成sourcemap打包
```bash
npm run build_sourcemap
```

生成gzip打包
```bash
npm run build_compress
```

生成sourcemap和gzip打包
```bash
npm run build_sourcemap_compress
```

### 浏览项目

```bash 
npm i -g http-server
cd dist && http-server
```

### 一些提示

- 在src目录下面修改App.tsx即可开始编写业务代码
- 在 `/public` 目录下放静态资源，建议只用来存放一些外部js库，图片等资源放在 `/src` 下面让webpack编译
- 默认生产环境下publicPath为./，直接打开生成的index.html也可以浏览项目
- 项目默认集成了 `react` `react-router-dom` `redux` `react-redux` `typescript`
- 修改 `/tsconfig.json` 来配置typescript

## 特性

- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Less](http://lesscss.cn/)
- [PostCSS](https://postcss.org/)
- [ESLint](https://eslint.org/)
- [React](https://react.docschina.org/)
- [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Typescript](https://www.typescriptlang.org/)

## 依赖

### Webpack

- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for Webpack.
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for Webpack.
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration
- [`cross-env`](https://github.com/kentcdodds/cross-env) - Cross platform configuration.

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript.
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Use properties directly on a class.
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel.
- [`babel-eslint`](https://github.com/babel/babel-eslint) - Lint Babel code.
  - [`eslint`](https://github.com/eslint/eslint) - ESLint.

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and Webpack.
- [`less-loader`](https://www.webpackjs.com/loaders/less-loader/) - A Less loader for webpack. Compiles Less to CSS.
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Process CSS with PostCSS.
  - [`cssnano`](https://github.com/cssnano/cssnano) - Optimize and compress PostCSS.
  - [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - Sensible defaults for PostCSS.
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolves CSS imports into JS.
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM.
- [`eslint-loader`](https://webpack.js.org/loaders/eslint-loader/) - Use ESLint with Webpack.
- [`file-loader`](https://webpack.js.org/loaders/file-loader/) - Copy files to build folder.
- [`url-loader`](https://webpack.js.org/loaders/url-loader/) - Encode and inline files. Falls back to file-loader.

### Plugins

- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders.
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory.
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template.
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files.
- [`optimize-css-assets-webpack-plugin`](https://github.com/NMFR/optimize-css-assets-webpack-plugin) - Optimize and minimize CSS assets.
- [`terser-webpack-plugin`](https://github.com/webpack-contrib/terser-webpack-plugin) - Minify JavaScript.
- [`compression-webpack-plugin`](https://github.com/webpack-contrib/compression-webpack-plugin) Prepare compressed versions of assets to serve them with Content-Encoding.

## License

开源MIT [MIT License](LICENSE).

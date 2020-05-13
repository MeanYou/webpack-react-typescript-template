const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
  const isEnvDevelopment = env.mode === 'development';
  const isEnvProduction = env.mode === 'production';
  const useSourcemap = env.sourcemap;

  return {
    /**
       * The first place Webpack looks to start building the bundle.
       */
    entry: [paths.src + '/index.tsx'],

    /**
     * Where Webpack outputs the assets and bundles.
     */
    output: {
      path: isEnvProduction ? paths.build : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // 服务的根目录，比如静态资源需要放在cdn，就设置为https://alicdn.com/
      publicPath: isEnvProduction
        ? './'
        : isEnvDevelopment && '/',
    },

    /**
     * Determine how modules within the project are treated.
     */
    module: {
      rules: [
        /**
         * js jsx ts tsx预执行lint
         */
        {
          test: /\.(js|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: ['eslint-loader'],
          include: paths.src
        },
        {
          oneOf: [
            /**
             * 使用url-loader加载各类型图片
             */
            {
              test: /\.(?:ico|bmp|gif|png|jpg|jpeg)$/i,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            /**
             * JavaScript
             * Use Babel to transpile JavaScript files.
             */
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: paths.src,
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction
              }
            },
            /**
             * 处理非src路径下的js文件
             */
            // {
            //   test: /\.js$/,
            //   exclude: /@babel(?:\/|\\{1,2})runtime/,
            //   loader: 'babel-loader',
            //   options: {
            //     babelrc: false,
            //     configFile: false,
            //     compact: false,
            //     presets: [
            //       [
            //         '@babel/preset-env',
            //         { helpers: true },
            //       ]
            //     ],
            //     cacheDirectory: true,
            //     cacheCompression: isEnvProduction
            //   }
            // },

            /**
             * Styles
             *
             * Inject CSS into the head with source maps.
             * Inject less files
             */
            {
              test: /\.css$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                { loader: 'css-loader', options: { sourceMap: useSourcemap, importLoaders: 1 } },
                { loader: 'postcss-loader', options: { sourceMap: useSourcemap } },
              ],
            },
            {
              test: /\.less$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 } },
                { loader: 'postcss-loader', options: { sourceMap: isEnvProduction } },
                { loader: 'less-loader', options: { sourceMap: isEnvProduction } },
              ],
            },

            /**
             * 其他类型的文件使用file-loader
             * 排除html和json，webpack会使用内部loader处理它们
             */
            {
              loader: 'file-loader',
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              },
            }
          ]
        },
      ],
    },
    resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
  };
}

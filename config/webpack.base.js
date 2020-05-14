const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssNormalize = require('postcss-normalize')

module.exports = env => {
  /**
   * env为package.json中scripts定义的变量
   * mode表示环境，development为开发环境，production为生产环境
   * sourcemap表示是否生成sourcemap文件，生成sourcemap方便调试，但会增大打包体积
   */
  const isEnvDevelopment = env.mode === 'development';
  const isEnvProduction = env.mode === 'production';
  const useSourcemap = env.sourcemap;
  /**
   * 静态资源路径表示服务器根目录
   * 开发环境为devServer的contentBase，默认/
   * 生产环境下可以自定义，比如CDN下的静态资源就设置为https://www.cdn.com/
   * 生产环境默认为./，使用相对路径可以直接打开index.html访问页面
   */
  const publicPath = isEnvProduction ? './' : isEnvDevelopment && '/';
  const shouldUseRelativeAssetPaths = publicPath === './';
  /**
   * publicUrl和publicPath类似
   * 在html中以%PUBLIC_URL%的形式访问
   * 在Javascript中以process.env.PUBLIC_URL的形式访问
   * 使用slice删除/，%PUBLIC_URL%/abc相比%PUBLIC_URL%abc，写法更好些
   */
  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && '';

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
      publicPath: publicPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
          path
            .relative(paths.src, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
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
            {
              test: /\.js$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: ['@babel/preset-env'],
                cacheDirectory: false,
                cacheCompression: isEnvProduction,
                sourceMaps: false
              }
            },

            /**
             * Styles
             *
             * Inject CSS into the head with source maps.
             * Inject less files
             */
            {
              test: /\.css$/,
              use: [
                isEnvDevelopment ? 'style-loader'
                  : isEnvProduction && {
                    loader: MiniCssExtractPlugin.loader,
                    options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
                  },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: useSourcemap,
                    importLoaders: 1
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      postcssNormalize(),
                    ],
                    sourceMap: useSourcemap
                  }
                }
              ]
            },
            {
              test: /\.less$/,
              use: [
                isEnvDevelopment ? 'style-loader'
                  : isEnvProduction && {
                    loader: MiniCssExtractPlugin.loader,
                    options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
                  },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: useSourcemap,
                    importLoaders: 1
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      postcssNormalize(),
                    ],
                    sourceMap: useSourcemap
                  }
                },
                {
                  loader: 'less-loader',
                  options: { sourceMap: useSourcemap }
                }
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
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: `${paths.static}/template.html`
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined
        )
      ),
      /**
       * 给JS环境造两个变量
       * NODE_ENV表示环境
       * PUBLIC_URL表示/public目录，需要引入外部js库的时候比较方便
       */
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.mode),
          PUBLIC_URL: JSON.stringify(publicUrl)
        }
      }),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
  };
}

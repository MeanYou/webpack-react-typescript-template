const paths = require('./paths')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')

const proConf = env => {
  const useSourceMap = true;
  return {
    mode: 'production',
    devtool: false,
    output: {
      path: paths.build,
      publicPath: '/',
      filename: '[name].[contenthash].bundle.js',
    },
    plugins: [
      /**
       * Removes/cleans build folders and unused assets when rebuilding.
       */
      new CleanWebpackPlugin(),

      /**
       * Copies files from target to destination folder.
       */
      // new CopyWebpackPlugin([
      //   {
      //     from: paths.static,
      //     to: 'assets',
      //     ignore: ['*.DS_Store'],
      //   },
      // ]),
      /**
       * 根据模板生产html文件的插件
       */
      new HtmlWebpackPlugin({
        title: 'Webpack',
        favicon: paths.static + '/favicon.png',
        template: paths.src + '/template.html', // template file
        filename: 'index.html', // output file
        inject: true,
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
        }
      }),
      /**
       * Extracts CSS into separate files.
       *
       * Note: style-loader is for development, MiniCssExtractPlugin is for production.
       * They cannot be used together in the same config.
       */
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],

    /**
     * Production minimizing of JavaSvript and CSS assets.
     */
    optimization: {
      minimizer: [new TerserJSPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
          },
          inline: 2,
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        cache: true,
        sourceMap: useSourceMap,
        extractComments: false
      }), new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: useSourceMap
            ? {
              inline: false,
              annotation: true
            } : false
        }
      })],
      // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
      // instead of having their own. This also helps with long-term caching, since the chunks will only
      // change when actual code changes, not the webpack runtime.
      runtimeChunk: 'single',
      // This breaks apart commonly shared deps (react, semantic ui, etc) into one shared bundle. React, etc
      // won't change as often as the app code, so this chunk can be cached separately from app code.
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};

module.exports = env => {
  return merge(proConf(env), baseConf(env));
};

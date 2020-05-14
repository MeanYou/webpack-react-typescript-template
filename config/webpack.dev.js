const paths = require('./paths')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.js')

const devConf = env => {
  return {
    /**
     * Set the mode to development or production.
     */
    mode: 'development',

    /**
     * Devtool
     *
     * Control how source maps are generated.
     */
    // devtool: 'cheap-module-eval-source-map',
    devtool: false,

    /**
     * DevServer
     *
     * Spin up a server for quick development.
     */
    devServer: {
      clientLogLevel: 'none',
      historyApiFallback: true,
      contentBase: paths.static,
      open: true,
      compress: true,
      hot: true,
      port: 3000,
    },

    plugins: [
      /**
       * HotModuleReplacementPlugin
       *
       * Only update what has changed.
       */
      new webpack.HotModuleReplacementPlugin(),
    ],

    resolve: {
      alias: {
        '@': paths.src
      },
    }
  };
}

module.exports = env => {
  return merge(devConf(env), baseConf(env));
}

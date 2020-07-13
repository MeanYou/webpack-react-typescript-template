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
     * 开发服务器配置
     * 
     */
    devServer: {
      clientLogLevel: 'none',
      historyApiFallback: true,
      contentBase: paths.static,
      open: true,
      compress: true,
      hot: true,
      port: 3000,
      proxy: {
        '/xxx': 'http://127.0.0.1:8888'
      },
    },

    plugins: [
      /**
       * HotModuleReplacementPlugin
       *
       * Only update what has changed.
       */
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
}

module.exports = env => {
  return merge(devConf(env), baseConf(env));
}

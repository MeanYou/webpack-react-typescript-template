const paths = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: [paths.src + '/index.tsx'],

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: 'assets',
        ignore: ['*.DS_Store'],
      },
    ]),

    /**
     * HtmlWebpackPlugin
     *
     * Generates an HTML file from a template.
     */
    new HtmlWebpackPlugin({
      title: 'React App',
      favicon: paths.static + '/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  /**
   * Module
   *
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
                 * JavaScript
                 *
                 * Use Babel to transpile JavaScript files.
                 */
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
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
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 2 } },
              'postcss-loader',
              'less-loader',
            ],
          },

          /**
           * Images
           *
           * Copy image files to build folder.
           */
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src', // prevent display of src/ in filename
            },
          },

          /**
           * Fonts
           *
           * Inline font files.
           */
          {
            test: /\.(woff(2)?|eot|ttf|otf|)$/,
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]',
              context: 'src', // prevent display of src/ in filename
            },
          },
        ]
      },
    ],
  },
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
}

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // target:'node',
  entry: `./src/index.js`,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: 'LaughAtIE',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { loose: true }]
            ]
          },
        }, ],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          configFile: '.eslintrc.js',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: 'head' }),
    new CopyWebpackPlugin(
      [{
        context: 'src/sound/',
        from: '.',
        to: path.resolve(__dirname, "dist/sound/")
      }]),
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: "dist",
    open: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
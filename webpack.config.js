var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./public",
    hot: true
  },
  module: {
   loaders: [
     {
       test: /.jsx?$/,
       loader: [ 'babel-loader', 'eslint-loader' ],
       exclude: /node_modules/
     },
     {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
     },
     {
        test: /\.(svg|jpe?g|png|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin()
  ]
};

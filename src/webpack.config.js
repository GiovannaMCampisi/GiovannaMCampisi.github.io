const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your JavaScript
  watch: true, // Automatically recompile on file changes
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'js/bundle.js' // Output JS file
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Match .scss files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader', // Process CSS into CommonJS
          'sass-loader' // Compile SCSS into CSS
        ]
      },
      {
        test: /\.css$/, // Match .css files
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Match image files
        type: 'asset/resource', // Use Webpack 5's asset/resource for image files
        generator: {
          filename: 'img/[name][ext]' // Output folder for images
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      '...', // Extend Webpack's default minimizers
      new CssMinimizerPlugin(), // Minify CSS
      new TerserJSPlugin() // Minify JavaScript
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css' // Output CSS file
    })
  ],
  devtool: 'source-map' // Generate source maps for debugging
};

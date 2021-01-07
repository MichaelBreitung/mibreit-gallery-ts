const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./mibreit-gallery/mibreitGalleryTs.min.js",
    library: "mibreitGalleryTs",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    jquery: "jQuery",
  },
  optimization: {
    minimize: false
  },
};
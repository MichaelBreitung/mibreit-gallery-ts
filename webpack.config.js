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
      {
        test: /\.css?$/,
        use: ['style-loader',  {
          loader: 'css-loader',
          options: {            
            modules: {
              localIdentName: '[local]'
            }
          }
        }],
        exclude: /node_modules/,        
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    minimize: true
  },
};
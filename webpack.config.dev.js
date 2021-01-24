const path = require('path');

module.exports = {
  mode: 'development',
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
        use: [{
          loader: 'style-loader', 
          options: {
            injectType: 'singletonStyleTag'
          }
        },{
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
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    minimize: false
  },
};
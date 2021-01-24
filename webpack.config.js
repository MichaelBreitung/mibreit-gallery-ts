const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {          
          output: {
            // removing comments
            comments: false,
          },
          compress: {
            // remove console.logs
            drop_console: true,
            unused: true,
            dead_code: true
          },
        },
      }),
    ],
  },
};
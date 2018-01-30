const debug = process.env.NODE_ENV === 'development';

const Path = require('path');
// const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const buildPath = Path.join(__dirname, 'dist');
const defaultConfig = {
  devtool: debug ? 'inline-sourcemap' : '',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: ['transform-object-rest-spread'],
          }
        }
      }
    ]
  },
  plugins: debug ? [] : [
    new UglifyJsPlugin({ uglifyOptions: {
      mangle: false, comments: false
    } })
  ],
};

module.exports = [
  {
    ...defaultConfig,
    entry: Path.join(__dirname, 'src/foreground'),
    output: {
      path: buildPath,
      filename: 'content.js',
    },
  },

  {
    ...defaultConfig,
    entry: Path.join(__dirname, 'src/background'),
    output: {
      path: buildPath,
      filename: 'background.js',
    },
  },
];
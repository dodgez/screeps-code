const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: {
      type: "commonjs-module",
    },
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

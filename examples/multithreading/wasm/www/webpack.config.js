const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

const appConfig = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};

const workerConfig = {
  entry: "./worker.js",
  target: "webworker",
  resolve: {
    extensions: [".js", ".wasm"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "worker.js"
  },
  mode: "development"
};

module.exports = [appConfig, workerConfig];

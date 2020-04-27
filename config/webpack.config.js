const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssNormalize = require("postcss-normalize");
const cliPath = __dirname;
const appRootPath = path.resolve(cliPath, "..");

module.exports = (mode) => {
  return {
    mode: "development",
    entry: path.resolve(appRootPath, "src/index"),
    output: {
      path: path.resolve(appRootPath, "dist"),
    },
    devServer: {
      port: 3000,
      open: true,
      contentBase: path.resolve(appRootPath, "public"),
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
    },
    resolve: {
      //   extensions: [".tsx", "ts", ".json", ".jsx", ".css"],
      extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@": path.resolve(appRootPath, "src"),
      },
    },

    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [postcssNormalize()],
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.resolve(appRootPath, "public/favicon.ico"),
        meta: { appName: "Terms" },
        template: path.resolve(appRootPath, "public/index.html"),
      }),
    ],
  };
};

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssNormalize = require("postcss-normalize");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cliPath = __dirname;
const IS_DEV = process.env.NODE_ENV === "development";
const appRootPath = path.resolve(cliPath, "..");

module.exports = () => {
  return {
    mode: IS_DEV ? "development" : "production",
    entry: {
      main: path.resolve(appRootPath, "src/index"),
    },
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
            MiniCssExtractPlugin.loader,
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
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.resolve(appRootPath, "public/favicon.ico"),
        meta: { appName: "Terms" },
        template: path.resolve(appRootPath, "public/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };
};

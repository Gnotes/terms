const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
      main: path.resolve(appRootPath, "src/index")
    },
    output: {
      path: path.resolve(appRootPath, "dist"),
      filename: "[name].[hash:8].js",
      chunkFilename: "[name].[chunkhash:8].js"
    },
    devServer: {
      port: 3000,
      open: true,
      contentBase: path.resolve(appRootPath, "public"),
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false // true for self-signed, object for cert authority
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      lunr: "lunr"
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@": path.resolve(appRootPath, "src")
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          use: ["babel-loader"]
        },
        {
          test: /\.(ts|tsx)$/,
          use: ["babel-loader", "ts-loader"]
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
                plugins: () => [postcssNormalize()]
              }
            }
          ]
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // lunr: {
          //   name: "lunr",
          //   test: /node_modules\/lunr/,
          //   priority: 0
          // },
          vendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        favicon: path.resolve(appRootPath, "public/favicon.ico"),
        meta: { appName: "Terms" },
        template: path.resolve(appRootPath, "public/index.html")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[id].[contenthash:8].css"
      })
    ]
  };
};

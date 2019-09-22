const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    noParse: content => {
      return /jquery|lodash/.test(content);
    },
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // {
          //   loader: "style-loader"
          // },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: loader => [
                require("autoprefixer")()
                // 可以加上更多其他的插件，比如 require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true, // 并行压缩
      sourceMap: true // 启用 sourceMap
    }),
    new HtmlWebpackPlugin({
      title: "cute webpack", // 页面标题
      filename: "index.html", // 生成的文件名,
      template: path.resolve(__dirname, "src", "templates", "index.html"),
      minify: {
        // 压缩配置
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除双引号
      }
    })
  ]
};

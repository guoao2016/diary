---
layout: post
title: Cute Webpack Learn
excerpt: ""
categories: 学习
tags: webpack
---

参考 https://juejin.im/post/5d518b4de51d4561cc25f013

# 初始化

```shell
mkdir cute-webpack && cd cute-webpack

npm init -y

yarn add webpack webpack-cli -D
```

安装 [Lodash](https://lodash.com/) (A modern JavaScript utility library delivering modularity, performance & extras.)

```shell
yarn add lodash
```

新建 `src/index.js` 入口文件，敲入

```js
import _ from "lodash";
console.log(_.join(["hello", "webpack"]));
```

新建 `webpack.config.js` 配置文件，敲入

```js
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

# 打包

webpack4 是可以零配置的，上面简单的配置一下，看看输出的结果

```shell
npx webpack

Hash: d45ca7f050769421989e
Version: webpack 4.40.0
Time: 331ms
Built at: 2019-09-13 11:19:41
  Asset     Size  Chunks             Chunk Names
main.js  552 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/index.js] 66 bytes {main} [built]
    + 1 hidden module
```

npx 是调用项目内的命令

生成 `dist/main.js`文件，调用一下看看结果

```js
node dist/main.js

hello,webpack
```

# 处理 css 模块

平时肯定要处理 css 模块

新建 `src/styles/main.css` 文件，敲入

```css
* {
  padding: 0;
  margin: 0;
}
```

新建 `index.html`，敲入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

然后我们需要在 `src/index.js` 导入 css 文件

```js
import "./styles/main.css";
```

运行构建的时候发现下面报错

```bash
npx webpack
Hash: 535c17a361ad1b5a0bbd
Version: webpack 4.40.0
Time: 332ms
Built at: 2019-09-13 11:28:54
  Asset     Size  Chunks             Chunk Names
main.js  552 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/index.js] 91 bytes {main} [built]
[./src/styles/main.css] 267 bytes {main} [built] [failed] [1 error]
    + 1 hidden module

ERROR in ./src/styles/main.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> * {
|   padding: 0;
|   margin: 0;
 @ ./src/index.js 1:0-26
```

我们需要对应的 `loader` 去加载，`css-loader` 用于处理 `css` 文件，可以在 `js` 文件中导入，`style-loader` 处理样式写入到 `html <style>`标签

```bash
yarn add css-loader style-loader -D
```

我们在配置文件中加入 `module` 处理 `css` 的相关逻辑

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

`test` 使用正则匹配对应的文件，`use` 代表使用的 `loader` 插件名字，按照处理顺序从右到左

```bash
npx webpack

Hash: aaafd0826e9fd60348a4
Version: webpack 4.40.0
Time: 584ms
Built at: 2019-09-13 11:34:00
  Asset     Size  Chunks             Chunk Names
main.js  564 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/css-loader/dist/cjs.js!./src/styles/main.css] 176 bytes {main} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/index.js] 91 bytes {main} [built]
[./src/styles/main.css] 408 bytes {main} [built]
    + 3 hidden modules
```

可以正常打包了，头部也正常的加入了样式

```css
<style>* {
  padding: 0;
  margin: 0;
}</style>
```

# webpack 模块介绍

`webpack.config.js` 的 `module` 配置确定如何处理项目中的不同模块，支持下面几种

- es2015 `import`
- commonjs `require()`
- AMD `define`/`require`
- css/sass/less `@import`
- 样式 `url()` 图片 `<img src=''/>`

### 参数介绍

`module.noParse` (类型: `RegExp` or `[RegExp]` or `function`)

命中条件的文件不包含 `import`/`require`/`define` 等引用其他库的机制，比如 `jquery`/`lodash`，我们可以选择忽略它们提高构建的速度

例如在我们前面的 `demo` 添加下面的配置，构建速度有了明显的提升

```js
noParse: (content) => {
   return /jquery|lodash/.test(content)
 },
```

另外就是我们前面提到的 `rules` 配置，不再赘述，除了 `test` 和 `use` 以外还有其他参数

- include: Condition，匹配特定的条件，非必传
- exclude: Condition，排除特定的条件，非必传
- and / or / not

可以参考 https://www.webpackjs.com/configuration/module/#rule

# 加载 Less 文件

下载依赖项

```bash
yarn add less-loader less -D
```

新建 `src/styles/page.less`，敲入

```less
@bodyColor: #eee;

body {
  background-color: @bodyColor;
}
```

在 `src/index.js` 引入

```js
import "./styles/page.less";
```

现在运行构建的话肯定也报错，我们需要加入处理 `less` 模块的配置，进行简单的修改

```js
rules: [
  {
    test: /\.(le|c)ss$/,
    use: ["style-loader", "css-loader", "less-loader"]
  }
];
```

可以看到我们的页面已经变成指定的背景色了

最后我们添加 `npm scripts` 命令，在 `package.json` 下的 `scripts` 属性

```js
  "scripts": {
    "build": "npx webpack --config webpack.config.js"
  },
```

以后只要运行 `npm run build` 就可以执行打包操作了

# 添加样式文件 `sourceMap` 和前缀

我们给 `css-loader` 和 `less-loader` 都加上 `options.sourceMap:true` 参数，在页面审查的时候可以找到对应的样式文件地址，如下图

```js
rules: [
  {
    test: /\.(le|c)ss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true
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
];
```

<img width="774" alt="屏幕快照 2019-09-13 12 06 28" src="https://user-images.githubusercontent.com/3488257/64836998-fc31dd00-d61e-11e9-9aad-98d369d6d722.png">

接下来使用 `postcss-loader` 预处理工具，为 `css3` 属性添加前缀，样式格式校验`stylelint`，提前使用 `css` 新属性，实现 `css` 模块化` 等等，可以参考官网 https://www.webpackjs.com/loaders/postcss-loader/

首先安装 `postcss-loader` 和 `autoprefixer`

```bash
yarn add postcss-loader autoprefixer -D
```

之后修改 `webpack.config.js` 配置，主要是添加了 `postcss-loader` 相关的配置

```js
rules: [
  {
    test: /\.(le|c)ss$/,
    use: [
      {
        loader: "style-loader"
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
];
```

然后在 `package.json` 添加支持的浏览器版本，这个也可以单独抽出一个文件，有兴趣的可以自己找找看

```js
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

最后就是在 `src/styles/page.less` 添加一些新的 `css` 属性，比如

```css
body {
  background-color: @bodyColor;
  display: flex;
}
```

执行打包，可以看到下面的结果

<img width="326" alt="屏幕快照 2019-09-13 13 03 24" src="https://user-images.githubusercontent.com/3488257/64838681-e58f8400-d626-11e9-8582-3de39dd3dac2.png">

# 抽取单独 `css` 文件

`webpack4` 用的是 `mini-css-extract-plugin` 插件，替代以前的 `extract-text-webpack-plugin` ，我们 `webpack` 也不需要配置 `style-loader`

```bash
yarn add mini-css-extract-plugin -D
```

我们接下来引入它，并且进行新的配置

```js

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// `webpack.config.js` module.rules
// {
//   loader: "style-loader"
// },

// ==========>

{
  loader: MiniCssExtractPlugin.loader
},

// `webpack.config.js` plugins

plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
]

```

运行打包以后会发现 `dist` 新生成了一个 `main.css` 文件，我们在 `index.html` 文件中引入，效果和以前一样

# 压缩 css 文件

使用 `optimize-css-assets-webpack-plugin` 进行 `css` 文件压缩，我们可以发现上面生成的 `css` 文件是没有经过压缩处理的

```bash
yarn add optimize-css-assets-webpack-plugin -D
```

```js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// `webpack.config.js` plugins

plugins: [new OptimizeCssAssetsPlugin()];
```

现在运行 `yarn build` 出来的就是压缩处理以后的 `css` 文件了

# 压缩 JavaScript 文件

我们可以使用 `uglifyjs-webpack-plugin` 来压缩 `JavsScript` 文件

```bash
yarn add uglifyjs-webpack-plugin -D
```

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// `webpack.config.js` plugins

plugins: [
  new UglifyJsPlugin({
    cache: true,
    parallel: true, // 并行压缩
    sourceMap: true // 启用 sourceMap
  })
];
```

现在运行 `yarn build` 出来的就是压缩处理以后的 `JavaScript` 文件了

# 文件名 hash 值

我们打包出来的 `css` `JavaScript` 文件，如果名字不变的话会存在缓存问题，更新了文件，客户端拉取的还是旧的文件。修改一下配置文件，分别是输出的 `JavaScript` 文件名和分离出来的 `css` 文件名都加上了 `[hash]` 值

```js
output: {
  filename: "main.[hash].js",
  path: path.resolve(__dirname, "dist")
},

new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css"
}),
```

可以看下构建的结果

```bash
Hash: e03565c74686c3af325f
Version: webpack 4.40.0
Time: 948ms
Built at: 2019-09-20 12:17:12 PM
                        Asset       Size  Chunks                         Chunk Names
main.e03565c74686c3af325f.css  101 bytes    main  [emitted] [immutable]  main
 main.e03565c74686c3af325f.js    548 KiB    main  [emitted] [immutable]  main
Entrypoint main = main.e03565c74686c3af325f.css main.e03565c74686c3af325f.js
```

其实我们我们可以做一个简单的优化，我们先看看随便修改了一下 `css` 文件之后的构建

```
Hash: 6ea1949fdf9d9b6e6449
Version: webpack 4.40.0
Time: 841ms
Built at: 2019-09-20 12:18:47 PM
                        Asset       Size  Chunks                         Chunk Names
main.6ea1949fdf9d9b6e6449.css  116 bytes    main  [emitted] [immutable]  main
 main.6ea1949fdf9d9b6e6449.js    548 KiB    main  [emitted] [immutable]  main
Entrypoint main = main.6ea1949fdf9d9b6e6449.css main.6ea1949fdf9d9b6e6449.js
```

每次构建都有一个 `hash` 值，我们仅仅是修改了 `css` 文件，没有修改其他文件，但是都会生成新的 `hash` 值文件名，我们可以把 `[hash]` 都替换成 `[contenthash]`

```js
output: {
  filename: "main.[contenthash].js",
  path: path.resolve(__dirname, "dist")
},

new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
  chunkFilename: "[id].[contenthash].css"
}),
```

下面是第一次的构建结果

```
Hash: 43e919bd28352d3be8d6
Version: webpack 4.40.0
Time: 818ms
Built at: 2019-09-20 12:21:11 PM
                        Asset       Size  Chunks                         Chunk Names
 main.4a6e049583b2019fe0bb.js    548 KiB    main  [emitted] [immutable]  main
main.b13afb3eb082caa0dd6c.css  116 bytes    main  [emitted] [immutable]  main
Entrypoint main = main.b13afb3eb082caa0dd6c.css main.4a6e049583b2019fe0bb.js
```

修改一下 `css` 文件

```
Hash: 016308c94ff46a021e6b
Version: webpack 4.40.0
Time: 904ms
Built at: 2019-09-20 12:21:51 PM
                        Asset       Size  Chunks                         Chunk Names
 main.4a6e049583b2019fe0bb.js    548 KiB    main  [emitted] [immutable]  main
main.8c1ddc9a6aa25fd44cd1.css  101 bytes    main  [emitted] [immutable]  main
Entrypoint main = main.8c1ddc9a6aa25fd44cd1.css main.4a6e049583b2019fe0bb.js
```

可以看到 `JavaScript` 文件是没有任何变化的

# 动态引入打包文件

我们会发现前面的 `demo` 报错找不到 `css` `JavaScript` 文件了，我们不可能每次打包新的文件名出来，手动替换文件路径，需要用到 `html-webpack-plugin` 插件

```bash
yarn add html-webpack-plugin -D
```

在配置文件中引入这个插件，更多的配置参考 https://github.com/jantimon/html-webpack-plugin

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

// plugins

new HtmlWebpackPlugin({
  title: "cute webpack", // 页面标题
  filename: "index.html", // 生成的文件名,
  minify: {
    // 压缩配置
    collapseWhitespace: true, // 移除空格
    removeComments: true, // 移除注释
    removeAttributeQuotes: true // 移除双引号
  }
});
```

运行构建后生成了下面的 `dist/index.html` 文件

```html
<!DOCTYPE html><html><head><meta charset=UTF-8><title>cute webpack</title><link href=main.8c1ddc9a6aa25fd44cd1.css rel=stylesheet></head><body><script type=text/javascript src=main.4a6e049583b2019fe0bb.js></script></body></html>
```

我们也可以删除掉之前的 `index.html` 文件了

# 清理目录

我们发现每次修改文件之后生成的文件随着 `contenthash` 的不同，会堆积越来越多过时的文件，我们可以使用插件 `clean-webpack-plugin` 来清理他们

```
yarn add clean-webpack-plugin -D
```

引入和使用插件

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [new CleanWebpackPlugin()];
```

更多可以参考 https://github.com/johnagan/clean-webpack-plugin

# 图片处理

我们如果在 `css` 文件引入一个图片，会导致构建报错，因为我们还没有去处理图片模块

```css
body {
  background-image: url(../images/logo.png);
}
```

需要使用到 `file-loader`

```bash
yarn add file-loader -D
```

加入图片的 `module.rules` 处理

```js
{
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  use: [{
    loader: 'file-loader'
  }]
}
```

图片成功被使用

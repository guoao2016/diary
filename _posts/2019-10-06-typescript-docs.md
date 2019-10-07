---
layout: post
title: TypeScript 官方文档学习
excerpt: ""
categories:
tags:
---

看着 `Vue3` 也预发布了，完成使用 `TypeScript` 写的，自己断断续续学，没有系统得学习，最终也没用到项目上（从头开始一个新的项目，或者重构以前的代码）

这篇日记主要的参考资料是中文版本的[官方文档](https://www.tslang.cn/index.html)，看了下英文的[官方文档](http://www.typescriptlang.org/docs/home.html) 已经是 3.6 版本了，中文的一年多没更新还是停留在 3.1 版本，不过应该是不影响我们学习的，参考中文文档学习一遍以后再快速撸一边英文的，大概的学习计划就是这样

那就开始我们的学习旅程吧

# 官网简介

> TypeScript 是 JavaScript 类型的超集，它可以编译成纯 JavaScript
>
> TypeScript 可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的
>
> > 始于 JavaScript，归于 JavaScript
> >
> > > TypeScript 从今天数以百万计的 JavaScript 开发者所熟悉的语法和语义开始。使用现有的 JavaScript 代码，包括流行的 JavaScript 库，并从 JavaScript 代码中调用 TypeScript 代码。
> > >
> > > TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的 JavaScript 引擎中。

> > 强大的工具构建 大型应用程序
> >
> > > 类型允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。
> > >
> > > 类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有 JavaScript 库的行为。

> > 先进的 JavaScript
> >
> > > TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。
> > > 这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的 ECMAScript3（或更新版本）的 JavaScript。

上面简单摘录官网的一些介绍

# 五分钟上手

来自 https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html

全局安装 `ts` 工具

```
npm install -g typescript
```

新建一个 `hello.ts` 文件，我们的第一个 `ts` 文件，代码如下

```ts
function greeter(person) {
  return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

我们前面安装了 `ts` 工具，现在可以通过 `tsc 文件名` 命令来编译 `ts` 文件

```
tsc hello.ts
```

我们获得了一个 `hello.js` 的文件，内容如下

```js
function greeter(person) {
  return "Hello, " + person;
}
var user = "Jane User";
document.body.innerHTML = greeter(user);
```

现在看来和我们平时写 `js` 是没有区别的，上面现在有的一个区别就是把 `let` 编译成了 `var` 各大浏览器都支持的

这个只是一个简单的 `hello world` 程序，我们继续往下看更多的 `ts` 的特性和用法

我们现在简单修改一下第一行代码，重新编译一次

```ts
function greeter(person: string) {
  return "Hello, " + person;
}
```

输出的 `js` 文件是一样的。我们这里是给 `greeter` 函数的 `person` 参数添加了一个 `string` 类型注解

> TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式

上面的例子表明我们想要传入的 `person` 参数是一个字符串类型的变量，我们尝试传入一个数组类型的参数

```ts
let user = [1, 2, 3];
```

重新编译，发现下面的报错信息

```bash
Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

我们再尝试不传入参数的情况

```ts
document.body.innerHTML = greeter();
```

会产生下面的报错信息，`ts` 会告诉你使用了非期望个数的参数调用了这个函数

```bash
Expected 1 arguments, but got 0
```

`ts` 提供了静态的代码分析，它可以分析代码结构和提供的类型注解

不过 `ts` 虽然会告诉你出错的地方，但是最终的 `js` 文件还是被创建出来了，但是可能不会如期运行

#### 接口

> 在 TypeScript 里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句

我们在上面的列子上使用接口来描述一个拥有 `firstName` 和 `lastName` 字段的对象

上面的代码被修改成这样，能正常编译运行

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

let user = {
  firstName: "cody",
  lastName: "tang"
};

document.body.innerHTML = greeter(user);
```

#### 类

`ts` 支持基于类的面向对象编程，类带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。

另外在构造函数的参数上使用 `public` 等同于创建了同名的成员变量

我们修改代码如下

```ts
interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
}

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

function greeter(person: Person) {
  return `Hello, ${person.fullName}`;
}

let user = new Student("cody", "M.", "tang");

console.log(greeter(user));
```

可以看到编译出来的代码

```js
var Student = /** @class */ (function() {
  function Student(firstName, middleInitial, lastName) {
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName = lastName;
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
  return Student;
})();
function greeter(person) {
  return "Hello, " + person.fullName;
}
var user = new Student("cody", "M.", "tang");
console.log(greeter(user));
```

和我们平时定义类的方法没多大区别

上面的 `js` 文件都可以直接在 `html` 文件里面引入使用

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
    <script src="./hello.js"></script>
  </body>
</html>
```

# 快速入门指南

在 [快速入门指南](https://www.tslang.cn/samples/index.html) 我们可以看到有不少框架的例子，我们可以一个个来看这些例子

#### Vue.js

因为平时使用 `Vue.js` 比较多，先看看这个例子的简单入门

> 查看这个使用 Vue.js 和 TypeScript 的 TodoMVC 应用。

具体的教程地址 [TypeScript-Vue-Starter](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter)

开始吧

新建目录并进入，新建 `src` 目录 和 `src/component` 目录，并且初始化我们的项目 `npm init`，这个就是最原始的 `Vue.js` 项目结构

```
mkdir typescript-vue-tutorial
cd typescript-vue-tutorial
mkdir src
mkdir src/component
npm init -y
```

接下来就是安装我们 `ts` `vue` `webpack` 需要的各种依赖

```
yarn add typescript webpack webpack-cli ts-loader css-loader vue vue-loader vue-template-compiler -D
```

接下来我们来生成 `ts` 需要的配置文件

```
tsc --init
```

可以看到跟目录下生成了 `tsconfig.json` 文件，内容如下

```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

简单的进行一些修改，基本都是按照原来的默认配置

```json
{
  "include": ["./src/**/*"],
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "es2015" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true /* Generates corresponding '.map' file. */,
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    "noImplicitReturns": true /* Report error when not all code paths in function return a value. */,
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

之后我们需要编写 `webpack` 的配置文件 `webpack.config.js`

我们现在 `src` 目录下添加入口文件 `index.ts` 文件

```js
// index.ts

console.log("ts vue learn");
```

最简单的 `webpack` 配置

```js
// webpack.config.js
var path = require("path");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  }
};
```

执行一下 `npx webpack` 可以看到生成一个 `dist/build.js` 文件

```bash
npx webpack

Hash: f1a72f8e19cd1d6e0da3
Version: webpack 4.41.0
Time: 71ms
Built at: 2019-10-07 10:36:24 PM
   Asset       Size  Chunks             Chunk Names
build.js  963 bytes       0  [emitted]  main
Entrypoint main = build.js
[0] ./src/index.ts 29 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

node dist/build.js

ts vue learn
```

可以看到是正常构建了，当然现在还不能使用 `vue` 和 `ts` ，我们继续修改文件，如下

```js
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
```

我们只是从官方示例抽取了一些需要的配置项目，更多的 `webpack` 知识可以参考其他资料，也可以参考我前面写的文章 [cute-webpack](https://cody1991.github.io/diary/articles/2019-09/cute-webpack)

之后我们添加 `npm scripts`

```json
{
  "name": "typescript-vue-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npx webpack --mode development --watch",
    "build": "nxp webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^3.2.0",
    "ts-loader": "^6.2.0",
    "typescript": "^3.6.3",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.1",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.0",
    "webpack-cli": "^3.3.9"
  }
}
```

现在已经支持 `ts` 了，所以我们简单修改下入口文件的代码

```ts
interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
}

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

function greeter(person: Person) {
  return `Hello, ${person.fullName}`;
}

let user = new Student("cody", "M.", "tang");

console.log(greeter(user));
```

可以看到就是前面五分钟学习教程里面的示例代码

运行 `yarn dev`，可以发现现在只要我们修改了 `index.ts` 的代码，就会重新构建打包文件，同时使用 `nodemon dist/build.js` 的话可以同步看到最新的文件输出结果，代表我们的 `ts` 文件已经被正常的编译执行打包了

既然说到是使用 `Vue.js`，我们继续修改我们的示例

修改我们的入口文件

```ts
// index.ts
import Vue from "vue";

const v = new Vue({
  el: "#app",
  template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
  data: {
    name: "World"
  }
});
```

在根目录下新增 `index.html` 文件

```html
<!DOCTYPE html>
<html>
  <head></head>

  <body>
    <div id="app"></div>
  </body>
  <script src="./dist/build.js"></script>
</html>
```

启动浏览器就可以看到正常运行结果了

我们接下来新建一个 `component/Hello.ts` 组建

```ts
// component/Hello.ts
import Vue from "vue";

export default Vue.extend({
  template: `
      <div>
        <div>Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
      </div>
    `,
  props: ["name", "initialEnthusiasm"],
  data() {
    return {
      enthusiasm: this.initialEnthusiasm
    };
  },
  methods: {
    increment() {
      this.enthusiasm++;
    },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--;
      }
    }
  },
  computed: {
    exclamationMarks(): string {
      return Array(this.enthusiasm + 1).join("!");
    }
  }
});
```

并且修改 `index.ts` 文件

```ts
// index.ts
import Vue from "vue";

import Hello from "./component/Hello";
const v = new Vue({
  el: "#app",
  components: {
    Hello
  },
  template: `
    <div>
      <hello :name="name" :initialEnthusiasm="5" />
      <div>Hello {{name}}!</div>
      Name: <input v-model="name" type="text">
    </div>`,
  data: {
    name: "World"
  }
});
```

可以看到我们上面已经简单使用一些 `ts` 的语法了

接下来当然是希望能在单独的 `.vue` 文件里面使用 `ts` 语法了

> We also specified the appendTsSuffixTo: [/\.vue$/], option to ts-loader in our webpack.config.js file, which allows TypeScript to process the code extracted from a single file component.

我们前面的 `webpack` 配置里面已经给 `ts-loader` 的选项添加了 `appendTsSuffixTo: [/\.vue$/]` 配置，这样就允许 `ts` 去执行单文件模块的代码

> One extra thing we'll have to do is tell TypeScript what .vue files will look like when they're imported. We'll do this with a vue-shims.d.ts file

当时我们还需要做的一件事是告诉 `ts` ，当我们导入 `.vue` 文件的时候，它们应该是怎么处理的，把这份配置写到 `vue-shims.d.ts` 中

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

> We don't need to import this file anywhere. It's automatically included by TypeScript, and it tells it that anything imported that ends in .vue has the same shape of the Vue constructor itself.

我们不需要引入这个文件， `ts` 会自己引入

接下来我们把原来的 `Hello.ts` 文件修改成 `Hello.vue` 文件，内容如下

```ts
<template>
  <div>
    <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["name", "initialEnthusiasm"],
  data() {
    return {
      enthusiasm: this.initialEnthusiasm
    };
  },
  methods: {
    increment() {
      this.enthusiasm++;
    },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--;
      }
    }
  },
  computed: {
    exclamationMarks(): string {
      return Array(this.enthusiasm + 1).join("!");
    }
  }
});
</script>
```

而 `index.ts` 也进行简单的修改

```ts
import Vue from "vue";

import Hello from "./component/Hello.vue";
const v = new Vue({
  el: "#app",
  components: {
    Hello
  },
  template: `
    <div>
      <hello :name="name" :initialEnthusiasm="5" />
      <div>Hello {{name}}!</div>
      Name: <input v-model="name" type="text">
    </div>`,
  data: {
    name: "World"
  }
});
```

... 未完待续

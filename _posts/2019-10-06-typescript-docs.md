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

... 未完待续

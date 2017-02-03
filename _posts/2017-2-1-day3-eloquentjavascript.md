---
layout: post
title: Day 3 eloquentjavascript
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
image:
  feature: https://images.unsplash.com/photo-1448407827089-1a9f3751dca0?dpr=2&auto=compress,format&fit=crop&w=767&h=575&q=80&cs=tinysrgb&crop=
  credit: Ivan Levchenko
  creditlink: https://unsplash.com/photos/yrk22UaR9wk
---

还是继续 `eloquentjavascript` 书本的学习

### [04_data](http://eloquentjavascript.net/04_data.html)

在运行里面的事例的时候我都是在 `nodemon` 下运行，今天在引入一个 `JavaScript` 文件的时候，我习惯性写了

{% highlight javascript %}
import journal from './journal.js'
{% endhighlight %}

这个是 `ES6` 的新语法，当然立刻就报错了，使用

{% highlight javascript %}
let journal = require('./journal.js')
{% endhighlight %}

才是正确的。

顺手查了下 [webpack的require和import 有什么区别啊？](https://segmentfault.com/q/1010000005857558) :

---

首先无论require还是import，都不是webpack的发明，它们是已经存在于世的不同的模块化规范(目前都不能直接运行于浏览器)。

于是需要通过webpack在配合各种plugin、loader将其转义，使之可以运行在浏览器里。

关于require，最早应该见于nodejs开发，属于CommonJS规范的一部分，可以看 [Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1)

关于import，是ES2015里的新模块化规范，可以看 [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html)

再来回到你的问题

* _就是个变量，当然能在js里使用，这个jquery里的$是一种东西，无非是命名怪了点，总归还是变量，不要怕

* 如果你问的是require或者import用法，那目前仍然需要通过babel或者traceur之类的转义工具将之转义为ES5语法，才能在浏览器里运行。但对于lodash库本身，并不是非得利用webpack...之类的工具才能用，直接使用 `<script>` 标签放在html里，就可以使用_了。

---

后面的练习，写两个方法来反转一个数组，一个是会改变原来的数组，一个返回新的数组

{% highlight javascript %}
for (let i = array.length - 1; i >= 0; i--) {
  result.push(array[i])
}

for (let i = 0; i < array.length; i++) {
  result.unshift(array[i])
}
{% endhighlight %}

返回一个新的数组，上面两个方法都可以

由于一点小误导，改变原来的数组的我居然写了个快排来实现。。还是代码贴上来顺便复习下快排

{% highlight javascript %}
function reverseArrayInPlace(array) {
  function quick(array, left, right) {
    let index
    if (array.length > 1) {
      index = partition(array, left, right)

      if (left < index - 1) {
        quick(array, left, index - 1)
      }

      if (index < right) {
        quick(array, index, right)
      }
    }
  }

  function partition(array, left, right) {
    let pivot = array[Math.floor((left + right) / 2)]
    let i = left
    let j = right

    while (i < j) {
      while (array[i] > pivot) {
        i++
      }
      while (array[j] < pivot) {
        j--
      }
      if (i <= j) {
        swapQuickSort(array, i, j)
        i++
        j--
      }
    }

    return i
  }

  function swapQuickSort(array, i, j) {
    let aux = array[i]
    array[i] = array[j]
    array[j] = aux
  }

  quick(array, 0, array.length - 1)
}


let arrayValue = [1, 2, 3, 4, 5]
reverseArrayInPlace(arrayValue)
console.log(arrayValue)
{% endhighlight %}

正确的实现方法其实很简单:
{% highlight javascript %}
function reverseArrayInPlace(array) {
  let mid = Math.floor(array.length / 2)
  for (let i = 0; i < mid; i++) {
    swap(array, i, array.length - 1 - i)
  }

  function swap(array, first, second) {
    let temp = array[first]
    array[first] = array[second]
    array[second] = temp
  }
}
{% endhighlight %}

最后给我们一个练习，判断两个对象是不是深度相似的
{% highlight javascript %}
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  // typeof null 也是 object 所以这里要排除
  // 当它们都是对象的时候，才会继续判断，不然在上面的判断已经返回了
  // 所以接下来就是只有对象比较了
  // 对象可能是纯对象，或者 null
  // null 和其他对象比较 肯定返回false
  // null === null  ===> true ，这里也不存在，因为在上面返回了
  // 所以最后就只剩下真的是纯对象的继续往下判断了

  // obj1 是 null ，直接返回 false
  // obj1 不是 null ，它的类型不是 object 返回 false
  // obj2 情况上同
  // 最终就是只要 obj1 或者 obj2 其中一个是 null 或者其中一个不是 object 就返回 false
  if (obj1 === null || typeof obj1 !== 'object' || obj2 === null || typeof obj2 !== 'object') {
    return false
  }

  let propsInObj1 = 0
  let propsInObj2 = 0
  for (let prop in obj1) {
    propsInObj1++
  }
  for (let prop in obj2) {
    propsInObj2++
  }

  for (let prop in obj2) {
    // return deepEqual(obj1[prop], obj2[prop])
    if (!(prop in obj1) || !deepEqual(obj1[prop], obj2[prop])) {
      return false
    }
  }

  return propsInObj1 === propsInObj2
}

var obj = {
  here: {
    is: "an"
  },
  object: 2
};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {
  here: 1,
  object: 2
}));
// → false
console.log(deepEqual(obj, {
  here: {
    is: "an"
  },
  object: 2
}));
// → true
{% endhighlight %}

{% highlight javascript %}

{% endhighlight %}

完成这一章的学习

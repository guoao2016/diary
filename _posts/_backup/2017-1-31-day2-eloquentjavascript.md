---
layout: post
title: eloquentjavascript-2
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
---

还是继续 `eloquentjavascript` 书本的学习

### [03_functions](http://eloquentjavascript.net/03_functions.html)

{% highlight javascript %}
function findSoulution(target) {
  function find(start, history) {
    console.log(history)
    if (start === target) {
      return history
    } else if (start > target) {
      return null
    } else {
      return find(start + 5, "(" + history + " + 5)") ||
        find(start * 3, "(" + history + " * 3)")
    }
  }
  return find(1, '1')
}

console.log(findSoulution(24))
{% endhighlight %}

上面是一段递归的实例。我们传入一个数字给 `findSoulution` 函数，来计算出从数字 `1` 开始，通过 `+5` 或者 `*3` 怎么得到这个传入的数字

{% highlight javascript %}
1
(1 + 5)
((1 + 5) + 5)
(((1 + 5) + 5) + 5)
((((1 + 5) + 5) + 5) + 5)
(((((1 + 5) + 5) + 5) + 5) + 5)
(((((1 + 5) + 5) + 5) + 5) * 3)
((((1 + 5) + 5) + 5) * 3)
(((1 + 5) + 5) * 3)
((1 + 5) * 3)
(((1 + 5) * 3) + 5)
((((1 + 5) * 3) + 5) + 5)
((((1 + 5) * 3) + 5) * 3)
(((1 + 5) * 3) * 3)
(1 * 3)
((1 * 3) + 5)
(((1 * 3) + 5) + 5)
((((1 * 3) + 5) + 5) + 5)
(((((1 * 3) + 5) + 5) + 5) + 5)
((((((1 * 3) + 5) + 5) + 5) + 5) + 5)
((((((1 * 3) + 5) + 5) + 5) + 5) * 3)
(((((1 * 3) + 5) + 5) + 5) * 3)
((((1 * 3) + 5) + 5) * 3)
(((1 * 3) + 5) * 3)
(((1 * 3) + 5) * 3) 
{% endhighlight %}

The indentation suggests the depth of the call stack. The first time find is called it calls itself twice to explore the solutions that start with (1 + 5) and (1 * 3). The first call tries to find a solution that starts with (1 + 5) and, using recursion, explores every solution that yields a number less than or equal to the target number. Since it doesn’t find a solution that hits the target, it returns null back to the first call. There the `||` operator causes the call that explores (1 * 3) to happen. This search has more luck because its first recursive call, through yet another recursive call, hits upon the target number, 13. This innermost recursive call returns a string, and each of the `||` operators in the intermediate calls pass that string along, ultimately returning our solution.

就像文中说的这段，和我们前一篇日记说的，递归就是一个个函数的调用，形成一个个的栈。自己也画了一个很丑的属性结构，按照自己的理解就是：

一开始的判断，如果现在 `target` 和 `start` 如果已经相等了，我们直接返回这个结果就好了。如果 `target` 比 `start` 还大，说明这个栈已经超过目标数字了，直接返回 `null` 给上一层，上一层会调用 `||` 之后的那个函数。而如果 `return find(start + 5, "(" + history + " + 5)") || find(start * 3, "(" + history + " * 3)")` 返回的是 `null || null` ，就又返回上一层的栈。一直这样递归下去，直到回到最顶部的栈还是 `null` 那就返回没有找到结果，或者找到了一个结果，返回这个结果

然后我又想，如果我们想要返回所有成立的结果呢？

{% highlight javascript %}
function findSoulution2(target) {
  let results = []

  function find(start, history) {
    if (start === target) {
      results.push(history)
      return null
    } else if (start > target) {
      return null
    } else {
      return find(start + 5, "(" + history + " + 5)") ||
        find(start * 3, "(" + history + " * 3)")
    }
  }
  find(1, '1')

  return results
}

console.log(findSoulution2(101))
{% endhighlight %}

得到下面的结果：

{% highlight javascript %}
[ '((((((((((((((((((((1 + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5)',
  '((((((1 * 3) * 3) * 3) + 5) * 3) + 5)',
  '((((((((1 * 3) * 3) * 3) * 3) + 5) + 5) + 5) + 5)' ]
{% endhighlight %}

稍微修改一下就好。接下来又想到如果我们想获取最短的路径，那直接循环判断数组看看最短的那条字符串就好了。

对递归有了更好的一个理解了

{% highlight javascript %}

{% endhighlight %}

{% highlight javascript %}

{% endhighlight %}
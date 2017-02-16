---
layout: post
title: eloquentjavascript-1
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
image:
  feature: https://images.unsplash.com/photo-1448400025760-7c27c7b9e3c4?dpr=1&auto=format&fit=crop&w=767&h=512&q=80&cs=tinysrgb&crop=
  credit: Archana Patchirajan
  creditlink: https://unsplash.com/photos/ykAUM1gFuBc
---

还是继续 `eloquentjavascript` 书本的学习

### [02_program_structure](http://eloquentjavascript.net/02_program_structure.html)

很简单的一节内容，但是最后的 `exercises` 发现自己居然都答得不是太理想

不是太理想的意思是和标准答案的思维相差有点大，自己的想法有点拐弯抹角的。。

都很简单，还是贴出来吧

{% highlight javascript %}
for (let str = '#'; str.length <= 6; str += '#') {
  console.log(str)
}
{% endhighlight %}

自己一开始的写法是 判断一个计数器 `i` 然后来继续 `str` 字符串的自加，完全可以使用 `str` 自己的 `length` 来判断

---

{% highlight javascript %}
for (let i = 0; i < 100; i++) {
  let num = i + 1
  let str = ''
  if (num % 3 === 0) {
    str += 'Fizz'
  }

  if (num % 5 === 0) {
    str += 'Buzz'
  }

  console.log(str || num)
}
{% endhighlight %}

自己用了 `if elseif else` 来，但是明显不能完成要求。最后结论是自己审题不太认真～最后的判断主要应用 `||` 的逻辑短路，当它是空字符串的时候被判断为 `false` ，才会输出 `num` 数字

---

{% highlight javascript %}
function printChessBoard(size) {
  let str = ''
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0) {
        str += ' '
      } else {
        str += '#'
      }
    }
    if (i !== size - 1) {
      str += '\n'
    }
  }

  return str
}

console.log(printChessBoard(20))
{% endhighlight %}

`Chess Board` 是一个什么，其实不是太了解，其实题干也不是很明确吧。自己使用了一个 `flag` 来记录当前行的第一个输出 ` ` 还是 `#` ，然后来判断接下来的输出是 ` ` 还是 `#`。看了标准答案直接判断 `i+j` 的值。。好吧

---

### [03_functions](http://eloquentjavascript.net/03_functions.html)

he place where the computer stores this context is the call stack. Every time a function is called, the current context is put on top of this “stack”. When the function returns, it removes the top context from the stack and uses it to continue execution.

Storing this stack requires space in the computer’s memory. When the stack grows too big, the computer will fail with a message like “out of stack space” or “too much recursion”. The following code illustrates this by asking the computer a really hard question, which causes an infinite back-and-forth between two functions. Rather, it would be infinite, if the computer had an infinite stack. As it is, we will run out of space, or “blow the stack”.

{% highlight javascript %}
function chicken() {
  return egg();
}

function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
{% endhighlight %}

有一段讲到了函数调用的 `栈` 的问题，然后用 先有鸡还是先有蛋 的实例程序来说明，感觉还是蛮有趣的

---

下面这一大段是对闭包的阐述，其实让自己对闭包有了更好的理解

The ability to treat functions as values, combined with the fact that local variables are “re-created” every time a function is called, brings up an interesting question. What happens to local variables when the function call that created them is no longer active?

The following code shows an example of this. It defines a function, wrapValue, which creates a local variable. It then returns a function that accesses and returns this local variable.

{% highlight javascript %}
function wrapValue(n) {
  var localVariable = n;
  return function() { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
{% endhighlight %}

This is allowed and works as you’d hope—the variable can still be accessed. In fact, multiple instances of the variable can be alive at the same time, which is another good illustration of the concept that local variables really are re-created for every call—different calls can’t trample on one another’s local variables.

This feature—being able to reference a specific instance of local variables in an enclosing function—is called closure. A function that “closes over” some local variables is called a closure. This behavior not only frees you from having to worry about lifetimes of variables but also allows for some creative use of function values.

闭包的意义在于我们不用当心内部局部变量的生命周期而继续获得，而且在每次调用闭包函数的时候，都会重置闭包内部的执行环境变量。

接下来对于闭包的阐述又进了一步，通过一个例子和一段说明：

{% highlight javascript %}
function multiplier(factor) {
  return function (number) {
    return number * factor
  }
}

let twice = multiplier(2)

console.log(twice(5))
{% endhighlight %}

Thinking about programs like this takes some practice. A good mental model is to think of the function keyword as “freezing” the code in its body and wrapping it into a package (the function value). So when you read return function(...) {...}, think of it as returning a handle to a piece of computation, frozen for later use.

In the example, multiplier returns a frozen chunk of code that gets stored in the twice variable. The last line then calls the value in this variable, causing the frozen code (return number * factor;) to be activated. It still has access to the factor variable from the multiplier call that created it, and in addition it gets access to the argument passed when unfreezing it, 5, through its number parameter.

上述的例子中，可以看到 `twice` 就是指向了一个闭包函数，内部变量 `factor` 已经通过 `multiplier(2)` 被封存起来，值为  `2` 。封存的意思就是固定不能变化了。而我们在 `multiplier` 内部返回的函数带有一个 `number` 的参数，我们调用这个封存的函数，但是可以传入一个没有被封存的变量 `number`

大概是对闭包有了进一步的认识了～开心

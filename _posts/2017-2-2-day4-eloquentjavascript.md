---
layout: post
title: Day 4 Diary
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
image:
  feature: https://images.unsplash.com/photo-1448386992143-1356c5f4227c?dpr=2&auto=format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=
  credit: Lindsay Henwood
  creditlink: https://unsplash.com/photos/0sNTxKV8PnY
---

还是继续 `eloquentjavascript` 书本的学习

### [05_higher_order](http://eloquentjavascript.net/05_higher_order.html)

其实这一章很多地方看的有点萌比，感觉主要大半夜了（现在是早上12点半）有点不清醒，明天起来重新看一遍

然后下面是巩固下 `bind` 函数的使用～

{% highlight javascript %}
let ancestry = require('./ancestry.js')

ancestry = JSON.parse(ancestry)

let theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

function isInSet(set, person) {
  return set.indexOf(person.name) > -1
}

console.log(ancestry.filter(function (person) {
  return isInSet(theSet, person)
}))

console.log(ancestry.filter(isInSet.bind(null, theSet)))
{% endhighlight %}

The call to bind returns a function that will call isInSet with theSet as first argument, followed by any remaining arguments given to the bound function.

The first argument, where the example passes null, is used for method calls, similar to the first argument to apply.


{% highlight javascript %}

{% endhighlight %}

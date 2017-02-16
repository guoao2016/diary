---
layout: post
title: eloquentjavascript-4
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

这一章的日记，以最后贴几个练习的代码结束吧

{% highlight javascript %}
let ancestry = require('./ancestry.js')
ancestry = JSON.parse(ancestry)

// console.log(ancestry)

function average(array) {
  function plus(a, b) {
    return a + b
  }
  return array.reduce(plus) / array.length
}

function hasKnownMother(person) {
  return byName[person.mother] != null
}

function ageDifference(person) {
  return person.born - byName[person.mother].born
}

let byName = {}
ancestry.forEach(function (person) {
  byName[person.name] = person
})

console.log(average(ancestry.filter(hasKnownMother).map(ageDifference)))
{% endhighlight %}

{% highlight javascript %}
let ancestry = require('./ancestry.js')
ancestry = JSON.parse(ancestry)

// console.log(ancestry)

function average(array) {
  function plus(a, b) {
    return a + b
  }
  return array.reduce(plus) / array.length
}

function groupBy(array, groupOf) {
  let groups = {}
  array.forEach(function (element) {
    // 返回组名就好了
    let groupName = groupOf(element)
    if (groupName in groups) {
      groups[groupName].push(element)
    } else {
      groups[groupName] = [element]
    }
  })
  return groups
}

function century(person) {
  return Math.ceil(person.died / 100)
}

let byCentury = groupBy(ancestry, century)

console.log(byCentury)

function age(person) {
  return person.died - person.born
}

for (century in byCentury) {
  let persons = byCentury[century]

  console.log(century, ': ', average(persons.map(age)).toFixed(1))
}
{% endhighlight %}

{% highlight javascript %}

{% endhighlight %}

{% highlight javascript %}

{% endhighlight %}

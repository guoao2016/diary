---
layout: post
title: Day 6 eloquentjavascript
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
image:
  feature: https://images.unsplash.com/photo-1415353115981-9bb4c22bafed?dpr=2&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=
  credit: Dawn Emerick
  creditlink: https://unsplash.com/photos/PewUcrT1yIw
---

还是继续 `eloquentjavascript` 书本的学习

### [06_object](http://eloquentjavascript.net/06_object.html)

在上一篇日记中有一段代码，把今天学习修改的代码也更新在那边了。

So objects are more complicated than I initially portrayed them. They have prototypes, which are other objects, and will act as if they have properties they don’t have as long as the prototype has that property. Simple objects have Object.prototype as their prototype.

对象都有原型对象，查找一些属性的时候，如果它本身没有会往上去查找它的所有原型对象直到找到为止或者返回 `undefined`

简单的对象也有 `Object.prototype` 作为它们的原型对象

Constructors, which are functions whose names usually start with a capital letter, can be used with the new operator to create new objects. The new object’s prototype will be the object found in the prototype property of the constructor function. You can make good use of this by putting the properties that all values of a given type share into their prototype. The instanceof operator can, given an object and a constructor, tell you whether that object is an instance of that constructor.

构造函数的函数名一般都是大写最开头，使用 `new` 操作来创建一个新的对象。这个新的对象的原型对象会在构造函数的原型对象属性上找到。 `instanceof` 可以告诉你一个对象的构造期是不是那个构造函数

One useful thing to do with objects is to specify an interface for them and tell everybody that they are supposed to talk to your object only through that interface. The rest of the details that make up your object are now encapsulated, hidden behind the interface.

Once you are talking in terms of interfaces, who says that only one kind of object may implement this interface? Having different objects expose the same interface and then writing code that works on any object with the interface is called polymorphism. It is very useful.

When implementing multiple types that differ in only some details, it can be helpful to simply make the prototype of your new type derive from the prototype of your old type and have your new constructor call the old one. This gives you an object type similar to the old type but for which you can add and override properties as you see fit.

这一段是对这一章的总结，也算完成这一章的学习了

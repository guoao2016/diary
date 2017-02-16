---
layout: post
title: eloquentjavascript-5
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

概念和例子想结合来了解 `Javascript` 对象，想直接贴出两段代码来结束今天的日记吧。第二段还是第二天再来过一遍，因为一开始自己并不是太熟悉代码，只是跟着写下来。写完总算了解多了，然后再回头来深入重新看看代码吧。

第一段：

{% highlight javascript %}
// let rabbit = {}
// rabbit.speak = function (line) {
//   console.log('The rabbit says "' + line + '"')
// }
// rabbit.speak('I\'m alive.')

let whiteRabbit = {
  type: 'white',
  speak: speak
}

let fatRabbit = {
  type: 'fat',
  speak: speak
}

function speak(line) {
  console.log('The ' + this.type + ' rabbit says "' + line + '"')
}

whiteRabbit.speak('Oh my ears and whiskers, how late it\'s getting.')
fatRabbit.speak('I could sure use a carrot right now.')

speak.apply(fatRabbit, ["Burp!"])
speak.call({
  type: 'old'
}, "Oh my god.")

let empty = {}
console.log(empty.toString)
console.log(empty.toString())


// 最顶层的原型链就是 Object.prototype 了
// 提供了比如 toString 这样的方法
console.log(Object.getPrototypeOf(empty))
console.log(Object.prototype)

// nodejs 返回的都是 {}
// 浏览器 Object

console.log(Object.getPrototypeOf(Object.prototype))

// null

// 很多对象的直接原型不是 Object.prototype ，有其他的对象提供了它特定的属性
// 比如 Functions 继承自 Function.prototype
// arrays 继承自 Array.prototype

console.log(Object.getPrototypeOf(isNaN))
console.log(Function.prototype)

// nodejs 返回都是 [Function]
// 浏览器 function () {}

console.log(Object.getPrototypeOf([]))
console.log(Array.prototype)

// Array

// 它们都继承了 Object.prototype 所有都有提供 .toString()

let protoRabbit = {
  speak: function (line) {
    console.log("The " + this.type + " rabbit says '" + line + "'")
  }
}

// The “proto” rabbit acts as a container for the properties that are shared by all rabbits. An individual rabbit object, like the killer rabbit, contains properties that apply only to itself—in this case its type—and derives shared properties from its prototype.

let killerRabbit = Object.create(protoRabbit)
killerRabbit.type = 'Killer'
killerRabbit.speak('SKREEEE!')

// A more convenient way to create objects that derive from some shared prototype is to use a constructor. In JavaScript, calling a function with the new keyword in front of it causes it to be treated as a constructor. The constructor will have its this variable bound to a fresh object, and unless it explicitly returns another object value, this new object will be returned from the call.

// An object created with new is said to be an instance of its constructor.

function Rabbit(type) {
  this.type = type
}

let killerRabbit2 = new Rabbit('killer')
let blackRabbit = new Rabbit('black')
console.log(blackRabbit.type)

// 这个指向构造函数 Rabbit
console.log(blackRabbit.constructor)

// 这个指向构造函数的原型对象
console.log(blackRabbit.constructor.prototype)

// Constructors (in fact, all functions) automatically get a property named prototype, which by default holds a plain, empty object that derives from Object.prototype. 

// 每个通过构造函数创建的实例都会有这个对象作为原型对象
// 所以，给通过 Rabbit 构造函数创建的 rabbits ，我们可以简单的做下面的处理
// Every instance created with this constructor will have this object as its prototype. So to add a speak method to rabbits created with the Rabbit constructor, we can simply do this

Rabbit.prototype.speak = function (line) {
  console.log("The " + this.type + " rabbit says '" + line + "'")
}

blackRabbit.speak('Doom....')

// 构造函数真正的原型对象是 Function.prototype ，因为它是一个函数
// 它的 prototype 属性，会成为实例们的原型对象，但是这个不是它自己的原型对象
// It is important to note the distinction between the way a prototype is associated with a constructor (through its prototype property) and the way objects have a prototype (which can be retrieved with Object.getPrototypeOf). The actual prototype of a constructor is Function.prototype since constructors are functions. Its prototype property will be the prototype of instances created through it but is not its own prototype.

Rabbit.prototype.teeth = 'small'

console.log(killerRabbit2.teeth)

killerRabbit2.teeth = "long, sharp, and bloody"

console.log(killerRabbit2.teeth)
console.log(blackRabbit.teeth)
console.log(Rabbit.prototype.teeth)
console.log(Object.getPrototypeOf(Rabbit))

console.log(Array.prototype.toString == Object.prototype.toString)
console.log([1, 2].toString())

// Array 上的 toString 进行了修改，如果想用原来的 toString 方法，可以使用下面的方法，结果是 [object Array]
console.log(Object.prototype.toString.call([]))

Rabbit.prototype.dance = function () {
  console.log("The " + this.type + " rabbit dances a jig.")
}

killerRabbit2.dance()

let map = {}

function storePhi(event, phi) {
  map[event] = phi
}

storePhi('pizza', 0.069)
storePhi('touched tree', -0.081)
  // 这个在下面也会显示出来
Object.prototype.nonsense = 'hi'
for (let name in map) {
  console.log(name)
}

// toString 并没有在上面，但是 toString 是 true 。因为分了 可枚举和不可枚举的属性
// 简单的赋值 是可枚举的
// 在 Object.prototype 上面的标准属性都是不可枚举的
console.log('toString' in map)

// 我们可以用 Object.defineProperty 方法定义自己的不可枚举属性

Object.defineProperty(Object.prototype, 'hiddenNonsense', {
  enumerable: false,
  value: 'hi'
})

for (let name in map) {
  console.log(name)
}

console.log(map.hiddenNonsense)

console.log(map.hasOwnProperty('toString'))

for (let name in map) {
  if (map.hasOwnProperty(name)) {
    console.log(name)
  }
}

// 这样子传入 null 的话，这个对象就没有原型对象了
let map2 = Object.create(null)
map2['pizza'] = 0.069
console.log("toString" in map2)
console.log(map2.prototype)
console.log(Object.getPrototypeOf(map2))
{% endhighlight %}

第二段：

{% highlight javascript %}
// minHeight() returns a number indicating the minimum height this cell requires (in lines).
// minWidth() returns a number indicating this cell’s minimum width (in characters).
// draw(width, height) returns an array of length height, which contains a series of strings that are each width characters wide. This represents the content of the cell.

// The rows variable will hold an array of arrays, with each inner array representing a row of cells.
function rowHeights(rows) {
  // It uses reduce to compute the maximum height of an array of cells and wraps that in map in order to do it for all rows in the rows array.
  return rows.map(function (row) {
    return row.reduce(function (max, cell) {
      return Math.max(max, cell.minHeight())
    }, 0)
  })
}

// Using a variable name starting with an underscore (_) or consisting entirely of a single underscore is a way to indicate (to human readers) that this argument is not going to be used
function colWidths(rows) {
  // Things are slightly harder for the colWidths function because the outer array is an array of rows, not of columns. I have failed to mention so far that map (as well as forEach, filter, and similar array methods) passes a second argument to the function it is given: the index of the current element. By mapping over the elements of the first row and only using the mapping function’s second argument, colWidths builds up an array with one element for every column index. The call to reduce runs over the outer rows array for each index and picks out the width of the widest cell at that index.
  return rows[0].map(function (_, i) {
    return rows.reduce(function (max, row) {
      // console.log(row[i].minWidth())
      return Math.max(max, row[i].minWidth())
    }, 0)
  })
}

function drawTable(rows) {
  let heights = rowHeights(rows)
  let widths = colWidths(rows)
  console.log(heights)
  console.log(widths)

  function drawLine(blocks, lineNo) {

    return blocks.map(function (block) {
      return block[lineNo]
    }).join(' ')
  }

  function drawRow(row, rowNum) {
    let blocks = row.map(function (cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum])
    })

    console.log(blocks[0])

    return blocks[0].map(function (_, lineNo) {
      return drawLine(blocks, lineNo)
    }).join("\n")
  }

  return rows.map(drawRow).join('\n')
}

function repeat(string, times) {
  let result = ''
  for (let i = 0; i < times; i++) {
    result += string
  }
  return result
}

function TextCell(text) {
  this.text = text.split('\n')
}

TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length)
  }, 0)
}

TextCell.prototype.minHeight = function () {
  return this.text.length
}

TextCell.prototype.draw = function (width, height) {
  let result = []
  for (let i = 0; i < height; i++) {
    // 有可能存在后面占据两行的情况
    let line = this.text[i] || ''
    result.push(line + repeat(" ", width - line.length))
  }
  return result
}

let rows = []
for (let i = 0; i < 5; i++) {
  let row = []
  for (let j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0) {
      row.push(new TextCell('##'))
    } else {
      row.push(new TextCell("  "))
    }
  }
  rows.push(row)
}

// console.log(drawTable(rows))

function UnderlinedCell(inner) {
  this.inner = inner
}

UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth()
}

UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1
}

UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)])
}

function dataTable(data) {
  let keys = Object.keys(data[0])
  let headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name))
  })

  let body = data.map(function (row) {
    return keys.map(function (name) {
      return new TextCell(String(row[name]))
    })
  })

  return [headers].concat(body)
}

console.log(dataTable(require('./mountains.js')))
console.log(drawTable(dataTable(require('./mountains.js'))))

// We reuse the constructor and the minHeight and minWidth methods from the regular TextCell. An RTextCell is now basically equivalent to a TextCell, except that its draw method contains a different function.
// 继承
function RTextCell(text) {
  // Typically, the new constructor will call the old constructor (using the call method in order to be able to give it the new object as its this value).
  // Once this constructor has been called, we can assume that all the fields that the old object type is supposed to contain have been added
  TextCell.call(this, text)
}

// We arrange for the constructor’s prototype to derive from the old prototype so that instances of this type will also have access to the properties in that prototype. 
RTextCell.prototype = Object.create(TextCell.prototype)

// Finally, we can override some of these properties by adding them to our new prototype
RTextCell.prototype.draw = function (width, height) {
  let result = []
  for (let i = 0; i < height; i++) {
    let line = this.text[i] || ''
    result.push(repeat(" ", width - line.length) + line)
  }
  return result
}

function dataTable2(data) {
  let keys = Object.keys(data[0])
  let headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name))
  })

  let body = data.map(function (row) {
    return keys.map(function (name) {
      let value = row[name]
      if (typeof value == 'number') {
        return new RTextCell(String(value))
      } else {
        return new TextCell(String(value))
      }
    })
  })

  return [headers].concat(body)
}

console.log(drawTable(dataTable2(require('./mountains.js'))))

let test = new RTextCell('A')
let test2 = new TextCell('A')
console.log(test instanceof RTextCell)
console.log(test instanceof TextCell)
console.log(test2 instanceof RTextCell)
console.log([1] instanceof Array)

{% endhighlight %}

补充： 2017.2.4 重新看了一遍，基本都熟悉了

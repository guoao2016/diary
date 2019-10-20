---
layout: post
title: 《HTML5 Canvas核心技术 图形、动画与游戏开发》 學習筆記
excerpt: ""
categories: 
tags: 
---

閱讀 《HTML5 Canvas核心技术 图形、动画与游戏开发》 一書做點學習筆記

# ch1

canvas 的能力是通過 canvas 元素上的 context 上下文對象表現出來的

我們從一個簡單的 hello world 程序開始

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas" width='600' height='300'></canvas>
    <script src="index.js"></script>
</body>
</html>
```

```js
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

context.font = '38pt Arial'
context.fillStyle = 'skyblue'
context.strokeStyle = 'green'

context.fillText('hello world', canvas.width / 2 - 140, canvas.height / 2)
context.strokeText('hello world', canvas.width / 2 - 140, canvas.height / 2)
```

html 代碼沒什麼好講的，後面也不會列出來，而 js 代碼部分

* 獲取 canvas 元素
* 調用 getContext('2d') 獲取繪畫環境變量
* 使用 繪畫環境變量 繪製

這段代碼設置了 font fillStyle strokeStyle 屬性，然後對文本進行了填充 fillText 和 描邊 strokeText

fillText 使用 fillStyle 屬性填充文字，strokeText 使用 strokeStyle 屬性來描繪字符輪廓

fillStyle strokeStyle 可以是 顏色 漸變色 或者 圖案

fillText strokeText 都需要三個參數：文字，橫坐標和縱座標

另外 canvas 元素上的 width 和 height 必須是整數，不可以帶上 px，默認大小是 300 * 150

---

我們可以通過 canvas 元素上的 width 和 height 控制 canvas 大小，也可以通過 css 的 width 和 height 控制 canvas 大小，但是他們本質上是有區別的

只修改 html 代碼

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        canvas {
            width: 600px;
            height: 300px;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script src="index.js"></script>
</body>

</html>
```

canvas 實際上有兩套尺寸，一個是元素本身的大小，一個是元素繪圖表面 drawing surface 大小

元素設置 width 和 height 屬性實際上是同時修改了該元素本身的大小和繪圖表面的大小

通過 css 屬性設置的話只會修改了元素本身的大小，而不影響繪圖表面的大小

所以canvas元素默認是 300 * 150 大小，使用 css 設置了 600 * 300 大小，繪圖面積是沒有變化的，還是默認的 300 * 150，當元素大小和繪圖表面大小不一致的時候，瀏覽器會對繪圖表面進行縮放，讓他符合大小，所以我們第二個例子的繪圖表面會拉伸到 600 * 300 大小

最好是通過 canvas 屬性設置寬高像素，以免出現奇怪的現象

---

canvas 自身的 api 不多

屬性上面已經提到了 width height，方法也提到了 getContext

還有 toDataURL(type,quality) 返回一個數據地址 data url，可設置為 img 的 src 屬性。第一個是圖片類型，可以是 image/jpeg 或者 image/png，默認是 image/png，第二個必須是 0~1.0的 附點數，代表 jepg 的圖片質量

toBlob(callback,type,args...) 生成表示這個 canvas 圖像文件 的 Blob，第一個參數是回調函數，瀏覽器會以一個指向 blob 的參數調用回調函數，第二個也是指定圖片的類型，默認 image/png，第二個必須是 0~1.0的 附點數，代表 jpeg 的圖片質量

---

主要還是要研究 2d 繪畫環境 CanvasRenderingContext2d

| 屬性                    | 描述                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| canvas                  | 指向繪圖環境對應的 canvas 對象，一般來獲取寬高 context.canvas.width context.canvas.height             |
| fillstyle               | 繪圖環境後續填充使用的顏色或者漸變色和圖案                                                            |
| font                    | 繪製文字 fillText strokeText 的時候使用的字體                                                         |
| globalAlpha             | 全局透明度 0~1.0，瀏覽器會在繪製的時候根據每個像素的 alpha 和它相乘                                   |
| globalCompsiteOperation | 某個物體繪製在其他物體上所採用的繪製方式                                                              |
| lineCamp                | 如何繪製線段的端點，可以是 butt round square 默認是 butt                                              |
| lineWidth               | 繪製線段的屏幕像素寬度，默認是1.0                                                                     |
| lineJoin                | 兩條線相交時如何繪製焦點，可以是 bevel round miter 默認是 miter                                       |
| miterLimit              | 如何繪製 miter 形式的線段焦點                                                                         |
| shadowBlur              | 如何延伸陰影效果，值越高，陰影效果延伸越遠，不是指像素長度，代表的是高斯模糊方程式裡面的參數值，默認0 |
| shadowColor             | 繪製陰影的顏色，通常使用半透明顏色                                                                    |
| shadowOffsetX           | 像素為單位， 陰影效果的水平方向偏移值                                                                 |
| shadowOffsetY           | 像素為單位， 陰影效果的垂直方向偏移值                                                                 |
| strokeStyle             | 路徑描邊的繪製風格，可以是顏色或者漸變色和圖案                                                        |
| textAlign               | fillText() 和 strokeText() 文本水平方向對齊方式                                                       |
| textBaseline            | fillText() 和 strokeText() 文本垂直方向對齊方式                                                       |

後面會仔細一個個介紹

---

canvas 的狀態保存和恢復

有時候我們希望臨時修改某些屬性，比如有時候需要比較粗的線條繼續後面的繪畫，這個時候需要臨時修改 lineWidth，之後恢復原來的各種屬性

提供了 save() 和 restore() 兩個方法來保存和恢復繪圖環境的屬性

```js
function drawGrid(strokeStyle, fillStyle) {
    context.save() // save the context on a stack

    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;

    // draw grid

    context.restore() // restore the context from the stack
}
```

這個 stack 是可以嵌套使用的

save() 方法：把當前 canvas 的狀態推送到一個保存當前狀態的棧頂，包括當前的座標變換(transformation)信息，剪輯區域（clipping region） 和 canvas 繪圖環境對象的屬性，包括 strokeStyle fillStyle 和 globalCompsiteOperation 等。

它不包括當前的路徑和位圖，只能通過 beginPath() 來重置路徑，位圖是 canvas 本身的屬性，不屬於 context。注意：位圖是 canvas 的屬性，但是 context 也可以訪問它，調用 getImageData()

restore() 方法：棧頂條目彈出，彈出以後就是當前 canvas 的狀態了

---

做一些基本的繪製動作，繪製一個時鐘⏰，涉及到一下一些方法

- arc()
- beginPath()
- clearRect()
- fill()
- fillText()
- lineTo()
- moveTo()
- stroke()

canvas 可以繪製一些看不見的路徑，然後通過 stroke() 描繪路徑邊緣，或者 fill() 填充內部，則路徑可見

調用 beginPath() 來開始定義某個路徑

我們先進行編碼，後面慢慢解釋

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const fontHeight = 15;
const margin = 35;
const handTruncation = canvas.width / 10;
const hourHandTruncation = canvas.width / 10;
const numeralSpacing = 20;
const radius = canvas.width / 2 - margin;
const handRadius = radius + numeralSpacing;

context.font = fontHeight + "px Arial";
const loop = setInterval(drawClock, 1000);
drawClock();

function drawClock() {
  console.log("drawing");

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawCircle();
  drawCenter();
  drawHands();
  drawNumbers();
}

function drawCircle() {
  context.beginPath();

  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    0,
    Math.PI * 2,
    true
  );
  context.stroke();
}

function drawCenter() {
  context.beginPath();

  context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);

  context.fill();
}

function drawHands() {
  const date = new Date();
  let hour = date.getHours();

  hour = hour > 12 ? hour - 12 : hour;

  drawHand(date.getSeconds(), false);
  drawHand(date.getMinutes(), false);
  drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
}

function drawHand(loc, isHour) {
  const angle = Math.PI * 2 * (loc / 60) - Math.PI / 2;
  const handRadius = isHour
    ? radius - handTruncation - hourHandTruncation
    : radius - handTruncation;

  context.moveTo(canvas.width / 2, canvas.height / 2);

  context.lineTo(
    canvas.width / 2 + Math.cos(angle) * handRadius,
    canvas.height / 2 + Math.sin(angle) * handRadius
  );

  context.stroke();
}

function drawNumbers() {
  const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let angle = 0;
  let numeralWidth = 0;

  numerals.forEach(function(numeral) {
    angle = (Math.PI / 6) * (numeral - 3);

    numeralWidth = context.measureText(numeral).width;

    context.fillText(
      numeral,
      canvas.width / 2 + Math.cos(angle) * handRadius - numeralWidth / 2,
      canvas.height / 2 + Math.sin(angle) * handRadius + fontHeight / 3
    );
  });
}
```

drawCircle() 绘制一个圆形，调用 beginPath() 开始定义路径， 使用 arc() 绘制圆形路径，使用 stroke() 描边路径

drawNumbers() 通过 fillText() 绘制时钟周围的数字

drawHands 绘制三个指针险段，使用 moveTo() lineTo() stroke() 三个方法，显示 moveTo 到指定的位置，然后调用 lineTo() 到另外一个指定的位置，然后通过 stroke() 描边线段可见

最后就是 setInterval 每一秒绘制一次，里面会先 clearRect() 擦除 canvas，然后重绘时钟

---

事件处理

我们可以给 canvas 绑定时间 使用 onEvent 或者 addEventListener

浏览器通过传递给监听器的鼠标坐标是串口坐标 window coordinate ，不是相对于 canvas 的相对坐标

我们需要知道相对于 canvas 的位置，不是整个窗口中的位置，要进行坐标转换

我们看一下下面的程序

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
    <div id="readout"></div>
    <canvas id="canvas" width="600" height="600"></canvas>
    <script src="index.js"></script>
  </body>
</html>
```

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const readout = document.getElementById("readout");
const spritesheet = new Image();

canvas.addEventListener("mousemove", e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY);

  drawBackground();
  drawSpritesheet();

  drawGuidelines(loc.x, loc.y);

  updateReadout(loc.x, loc.y);
});

function updateReadout(x, y) {
  readout.innerText = `(${x.toFixed(0)},${y.toFixed(0)})`;
}

function drawGuidelines(x, y) {
  context.strokeStyle = "rgba(0,0,230,0.8)";
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontalLine(y);
}

function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}

function drawHorizontalLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}

function drawBackground() {
  const verticalLineSpace = 12;
  let i = context.canvas.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "gray";
  context.lineWidth = 0.5;

  while (i > verticalLineSpace * 4) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
    i -= verticalLineSpace;
  }
}

function windowToCanvas(canvas, x, y) {
  // console.log(canvas, x, y);

  const bbox = canvas.getBoundingClientRect();

  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function drawSpritesheet() {
  context.drawImage(spritesheet, 0, 0);
}

drawBackground();

spritesheet.src = "./sprite.png";
spritesheet.onload = function(e) {
  drawSpritesheet();
};
```

这个程序在用户在 canvas 移动鼠标的时候，会绘制辅助线和显示当前坐标

windowToCanvas 是 把窗口坐标 转换成 canvas 坐标的方法，我们通过 getBoundingClientRect 方法获取 canvas 元素的边界框 bounding box，它是相对于整个窗口的，然后我们返回了 x y 属性，这个是鼠标相对于 canvas 的位置

当时它不是直接把 canvas 边界框的 x y 坐标从窗口中减去，因为 canvas 元素大小可能和绘图表面大小不相符，可以参考前面提到的，这里做了一个简单的转换

---

键盘事件
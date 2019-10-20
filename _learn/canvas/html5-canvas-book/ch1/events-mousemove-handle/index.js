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

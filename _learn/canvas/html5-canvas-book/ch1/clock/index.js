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

  context.stroke();
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

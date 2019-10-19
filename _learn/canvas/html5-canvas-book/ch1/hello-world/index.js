const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

context.font = '38pt Arial'
context.fillStyle = 'skyblue'
context.strokeStyle = 'green'

context.fillText('hello world', canvas.width / 2 - 140, canvas.height / 2)
context.strokeText('hello world', canvas.width / 2 - 140, canvas.height / 2)
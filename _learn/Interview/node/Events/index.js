const EventEmitter = require('events')

class Application extends EventEmitter {
  constructor() {
    super()
  }
}

const app = new Application()


// setImmediate() 和 process.nextTick() 方法切换到异步
app.on('hello', function (data) {

  console.log(data);
  setImmediate(() => {
    console.log('setImmediate', data, data)
  })

  process.nextTick(() => {
    console.log('nextTick', data, data, data)
  })
})

app.on('hello', function (data) { console.log(/*this*/ data, data) })

app.emit('hello', 'world')
console.log('hello');

// 移除 removeListener / off
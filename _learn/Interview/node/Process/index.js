// process 对象是一个 Global 全局对象，你可以在任何地方使用它，而无需 require。process 是 EventEmitter 的一个实例，所以 process 中也有相关事件的监听。使用 process 对象，可以方便处理进程相关操作。


console.log(process.argv)
console.log(process.execArgv) // Node 的命令行参数数组


// nodemon --harmony index.js --tips="helloworld"
// [
//   '/usr/local/bin/node',
//   '/Users/tangzexiong/Desktop/tencent/diary/_learn/Interview/node/Process/index.js',
//   '--tips=helloworld'
// ]
// [ '--harmony' ]

console.log(process.version)

console.log(process.pid)

console.log(process.cwd())

// process.exit((code)=>console.log(code))
// process.exit(123)

// process.nextTick()方法用于延迟回调函数的执行， nextTick 方法会将 callback 中的回调函数延迟到事件循环的下一次循环中，与 setTimeout(fn, 0)相比 nextTick 方法效率高很多，该方法能在任何 I/O 之前调用我们的回调函数。

console.log('start')
process.nextTick(() => {
  console.log('nextTick cb')
})
console.log('end')

// process.stderr 是一个指向标准错误流的可写流 Writable Stream。console.error 就是通过 process.stderr 实现的。

// process.stdin 是一个指向标准输入流的可读流 Readable Stream。

// process.stdout 是一个指向标准输出流的可写流 Writable Stream。console.log 就是通过 process.stdout 实现的

process.stdin.setEncoding('utf8')
process.stdout.setEncoding('utf8')

process.stdin.on('readable', () => {
  while((chunk = process.stdin.read()) !== null) {
    if (chunk==='\n') {
      process.stdin.emit('end')
      return
    }
    process.stdout.write(`收到数据: ${chunk}`)
  }
})

process.stdin.on('end', ()=> process.stdout.write('监听结束'))
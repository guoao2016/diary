// 读取
const fs = require('fs')

// fs.readFile('./rename.txt', 'utf8', (err, data) => {
//   console.log(err, data)
// })

// // const data = fs.readFileSync('./1.txt', 'utf8')
// // console.log(data)

// // fs.createReadStream用到了我们前面介绍的events eventEmitter.on() 方法来监听事件
// const stream = fs.createReadStream('./1.txt', 'utf8')
// stream.on('data', (data) => console.log(data))

// // 写入文件

// fs.writeFile('./2.txt', Math.random(), 'utf8', (err, ) => {
//   console.log(err)
// })

// fs.writeFileSync('./3.txt', Math.random(), 'utf8')

// const ws = fs.createWriteStream('./4.txt', 'utf8')
// ws.write(Math.random() + '')
// ws.end()

// // ------

// // 删除文件

// fs.unlink('./del-1.txt', err => console.log(err))

// // fs.unlinkSync('./del-2.txt')

// // 删除文件夹

// fs.rmdir('./rmdir', err => console.log(err))

// // fs.rmdirSync('./rmdir')

// // 新建文件夹

// fs.mkdir('./mkdir', err => console.log(err))
// // fs.mkdirSync('./mkdir-2')

// // 重命名 文件/文件夹

// // fs.renameSync('./1.txt', './rename.txt')
// fs.renameSync('./mkdir','./rename')

// 复制文件 文件夹
fs.copyFileSync('./2.txt', './copy-file.txt')

// 下面这个报错
// fs.copyFileSync('./rename', 'copy')


const stat = fs.statSync('./copy-file.txt')
console.log(stat.isDirectory(), stat.isFile())
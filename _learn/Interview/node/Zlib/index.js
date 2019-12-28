// Node.js 中的 Zlib 模块提供了流压缩与解压缩功能，Zlib 模块提供了对 Gzip/Gunzip、Deflate/Inflate、DeflateRaw/InflateRaw 类的绑定，这些类可以实现对可读流/可写流的压缩与解压

// deflate(RFC1951)是一种压缩算法，使用 LZ77 和哈弗曼进行编码。gzip(RFC1952)一种压缩格式，是对 deflate 的简单封装，gzip = gzip 头(10 字节) + deflate 编码的实际内容 + gzip 尾(8 字节)。在 HTTP 传输中，gzip 是一种常用的压缩算法，使用 gzip 压缩的 HTTP 数据流，会在 HTTP 头中使用 Content-Encoding：gzip 进行标识。

// HTTP Request Header 中 Accept-Encoding 是浏览器发给服务器,声明浏览器支持的解压类型

// Accept-Encoding: gzip, deflate, br

// HTTP Response Header 中 Content-Encoding 是服务器告诉浏览器 使用了哪种压缩类型

// Content-Encoding: gzip

const zlib = require('zlib')
const fs = require('fs')

// const gzip = zlib.createGzip()

// const inp = fs.createReadStream('../learn.png')
// const out = fs.createWriteStream('./learn.png.gz')

// inp.pipe(gzip).pipe(out)

// const gunzip = zlib.createGunzip()
// const inp = fs.createReadStream('./learn.png.gz')
// const out = fs.createWriteStream('./learn.png');
// inp.pipe(gunzip).pipe(out)

const http = require('http')
const filepath = './index.html'

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers['accept-encoding']

  if (acceptEncoding.includes('gzip')) {
    const gzip = zlib.createGzip()
    res.writeHead(200, {
      'Content-Encoding': 'gzip'
    })
    fs.createReadStream(filepath).pipe(gzip).pipe(res)
  } else {
    fs.createReadStream(filepath).pipe(res)
  }
})

server.listen(3000)
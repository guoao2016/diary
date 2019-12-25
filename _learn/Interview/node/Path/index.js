const path = require('path')

// 目录名字
console.log(path.dirname('/path/example/index.js'))

// 扩展名
console.log(path.extname('/path/example/index.js'))

// 是否绝对路径
console.log(path.isAbsolute('/path/example/index.js'))
console.log(path.isAbsolute('./path/example/index.js'))

// 拼接，主要是拼接
console.log(path.join('/path', 'example', 'index.js'))
console.log(path.join('/foo/bar', './baz'))
console.log(path.join('/foo/bar', '/tmp/file/'))
console.log(path.join('wwwroot', 'static_files/png/', '../gif/image.gif'))

// 将路径或路径片段的序列解析为绝对路径
console.log(path.resolve('/path', 'example', 'index.js'))
console.log(path.resolve('/foo/bar', './baz'))
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))
console.log(path.resolve('/foo/bar', '/tmp/file/'))

// 规范化
console.log(path.normalize('/path///example/index.js'))

// 解析路径
console.log(path.parse('/path/example/index.js'))

// 序列化
console.log(path.format({
  root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}))

// from 到 to 的相对路径
console.log(path.relative('/path/example/index.js', '/path'))
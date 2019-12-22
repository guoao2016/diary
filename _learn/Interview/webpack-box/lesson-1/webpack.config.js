const path = require('path')
const rimraf = require('rimraf')

const Config = require('webpack-chain');
const config = new Config()

const resolve = src => path.join(process.cwd(), src)

rimraf.sync('dist')

// module.exports = {
//   entry: './src/index.js',
//   mode: process.env.NODE_ENV,
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// }

config
  .entry('src/index')
  .add(resolve('src/index.js'))
  .end()
  .set('mode', process.env.NODE_ENV)
  .output.path(resolve('dist'))
  .filename('bundle.js')

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader('css-loader')

console.log(config.toConfig())

module.exports = config.toConfig()
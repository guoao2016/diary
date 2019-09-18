const path = require('path')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: (content) => {
      return /jquery|lodash/.test(content)
    },
    rules: [{
      test: /\.(le|c)ss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        }
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: loader => [require('autoprefixer')()
            // 可以加上更多其他的插件，比如 require('postcss-cssnext')()
          ]
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  }
}
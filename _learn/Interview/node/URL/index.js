const url = require('url')

const myUrl = new url.URL('https://github.com/cody1991#hello')

console.log(myUrl)

// URL 对象属性 除了 origin 和 searchParams 是只读的,其他都是可写的
// URL {
//   href: 'https://github.com/cody1991#hello',
//   origin: 'https://github.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'github.com',
//   hostname: 'github.com',
//   port: '',
//   pathname: '/cody1991',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: '#hello'
// }

console.log(myUrl.href)
console.log(myUrl.toString())
console.log(myUrl.toJSON())
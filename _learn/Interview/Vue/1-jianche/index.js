let car = {}
let val = 300

Object.defineProperty(car, 'price', {
  enumerable: true,
  configurable: true,
  get() {
    console.log('get')
    return val
  },
  set(newVal) {
    console.log('set')
    val = newVal
  }
})

console.log(car.price)

car.price = 200

console.log(car.price)
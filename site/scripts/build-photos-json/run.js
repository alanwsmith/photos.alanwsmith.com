const { listDir } = require('./listDir')
const configs = require('./configs')

const config = configs.dev

console.log('hello world')

console.dir(config)

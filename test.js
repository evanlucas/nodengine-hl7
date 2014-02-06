var Parser = require('./lib')
  , split = require('split')

var parser = new Parser()

process.stdin
  .pipe(split(/\r/))
  .pipe(parser)

parser.on('message', function(message) {
  console.log('Message:', message)
})

parser.on('segment', function(segment) {
  console.log('Segment:', segment)
})

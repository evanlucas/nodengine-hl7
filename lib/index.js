var Transform = require('stream').Transform
  , util = require('util')
  , segment = require('./segment')()

module.exports = Parser

function Parser() {
  if (!(this instanceof Parser))
    return new Parser()

  Transform.call(this)
}

util.inherits(Parser, Transform)

Parser.prototype._transform = function(data, encoding, done) {
  console.log('data', data.toString().replace(/\r/g, '\n')+'\n\n')
  var r = segment.parse(data)
  console.log('Segment:', r)
  this.push(data+'\n')
  done()
}


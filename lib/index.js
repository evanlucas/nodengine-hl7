//
// HL7 Parser
//
// Author:    Evan Lucas
// Filename:  index.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//

/**
 * Module dependencies
 */
var Transform = require('stream').Transform
  , util = require('util')
  , segment = require('./segment')()

module.exports = Parser

/**
 * Constructor
 */
function Parser() {
  if (!(this instanceof Parser))
    return new Parser()

  var self = this
  Transform.call(this)

  segment.on('message', function(msg) {
    self.emit('message', msg)
  })

  segment.on('segment', function(segment) {
    self.emit('segment', segment)
  })
}

util.inherits(Parser, Transform)

/**
 * Transform for parser
 *
 * **NOTE: The stream should have been pipe through `split()` already**
 *
 * @param {Buffer} data The segment as a buffer
 * @param {String} encoding The encoding of the buffer
 * @param {Function} cb function(err, res)
 * @api private
 */
Parser.prototype._transform = function(data, encoding, done) {
  //console.log('data', data.toString().replace(/\r/g, '\n')+'\n\n')
  //console.log('encoding', encoding+'\n\n')
  var r = segment.parse(data)
  this.push(data)
  done()
}

Parser.prototype._flush = function(done) {
  segment.getMessage()
  segment.on('message', function(msg) {
    self.emit('message', msg)
    done()
  })
}


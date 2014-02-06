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
  var opts = { objectMode: true }
  if (!(this instanceof Parser))
    return new Parser(opts)

  var self = this
  Transform.call(this, opts)

  this._messages = []
  this._current = []
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
  var self = this
  var res
  try {
    res = segment.parse(data)
  }
  catch (e) {
    self.emit('error', e)
    res = null
  }
  if (res) {
    if (segment.isHeader(res)) {
      this.emit('message', this.current)
      this._messages.push(this.current)
      this.current = [res]
    } else {
      this.current.push(res)
    }
    this.push(res)
  }
  done()
}

Parser.prototype._flush = function(done) {
  var self = this
  this.emit('messages', this._messages)
}

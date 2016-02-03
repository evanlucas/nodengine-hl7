'use strict'

var Transform = require('stream').Transform
  , util = require('util')
  , Segment = require('./segment')
  , Message = require('./message')
  , utils = require('./utils')

// MLP end frames
var FS = String.fromCharCode(0x1c)
  , CR = String.fromCharCode(0x0d)

exports.Message = Message
exports.Segment = Segment
exports.Parser = Parser
exports.utils = utils

/**
 * Constructor
 */
function Parser() {
  var opts = { objectMode: true }
  if (!(this instanceof Parser))
    return new Parser(opts)

  Transform.call(this, opts)

  this._messages = []
  this.current = null
}

util.inherits(Parser, Transform)

Parser.prototype._tryParseSegment = function _tryParseSegment(data, delims) {
  var self = this
  try {
    return new Segment(data, delims)
  } catch (err) {
    self.emit('error', err)
    return null
  }
}

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
  var delims = this.current
    ? this.current.delimiters()
    : null
  var segment = this._tryParseSegment(data, delims)

  if (!segment) return

  if (segment && segment.parsed) {
    var isHeader = utils.segmentIsHeader(segment)
    if (isHeader && this.current) {
      this.emit('message', this.current)
      var message = new Message()
      message.addSegment(segment)
      this._messages.push(message)
      this.current = message
    } else if (isHeader && !this.current) {
      this.current = new Message()
      this.current.addSegment(segment)
    } else {
      this.current.addSegment(segment)
    }

    /*
      If the message ended with FS+CR, this indicates the end of the message
      and it should be pushed over the transform stream now.
      http://www.hl7standards.com/blog/2007/05/02/hl7-mlp-minimum-layer-protocol-defined/
    */
    if (data.indexOf(FS + CR) !== -1) {
      this.emit('message', this.current)
      this.current = null
    }
  }
  done()
}

Parser.prototype._flush = function(done) {
  if (this.current && this.current.segments.length) {
    this.emit('message', this.current)
    this._messages.push(this.current)
    this.current = null
  }
  this.emit('messages', this._messages)
  done()
}

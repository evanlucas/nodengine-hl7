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

  var self = this
  Transform.call(this, opts)

  this._messages = []
  this.current = null
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
  var segment
  try {
    if (this.current) {
      segment = new Segment(data, this.current.delimiters())
    } else {
      segment = new Segment(data)
    }
  }
  catch (e) {
    self.emit('error', e)
    segment = null
    return
  }

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
  var self = this
  if (this.current && this.current.segments.length) {
    this.emit('message', this.current)
    this._messages.push(this.current)
    this.current = null
  }
  this.emit('messages', this._messages)
  done()
}

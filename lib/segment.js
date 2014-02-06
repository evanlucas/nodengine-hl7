//
// Segment parser for HL7 v2.3.1
//
// Author:    Evan Lucas
// Filename:  segment.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//

/**
 * Module depends
 */
var Buffer = require('buffer').Buffer
  , events = require('events')
  , path = require('path')
  , fs = require('fs')
  , util = require('util')
  , segmentsDir = path.join(__dirname, 'segments')
  , types = {}

/*!
 * Load our segment types
 */
fs.readdirSync(segmentsDir)
  .filter(function(file) {
    return path.extname(file) === '.js'
  })
  .forEach(function(file) {
    if (path.extname(file) === '.js') {
      var segType = path.basename(file).replace('.js', '').toUpperCase()
      types[segType] = require(path.join(__dirname, 'segments', file)).fields
    }
  })

module.exports = Segment

/**
 * Constructor
 */
function Segment() {
  if (!(this instanceof Segment))
    return new Segment()

  events.EventEmitter.call(this)
  this.message = []
  this.delimiters = {
    segment: '\r',
    field: '|',
    component: '^',
    subcomponent: '&',
    repetition: '~',
    escape: '\\'
  }
}

util.inherits(Segment, events.EventEmitter)

Segment.prototype.getMessage = function() {
  if (this.message.length) {
    this.emit('message', this.message)
  }
}
/**
 * Parses _data_ as a hl7 segment
 *
 * @param {Buffer|String} data The segment
 * @api public
 */
Segment.prototype.parse = function(data) {
  if (Buffer.isBuffer(data) && data.length > 1) { // account for trailing \r
    var s = data.slice(0, 3).toString()
    if (s === 'MSH') {
      var delims = data.slice(3, 7).toString()
      this.delimiters.segment = data.slice(-1).toString()
      this.delimiters.field = delims[0]
      this.delimiters.repetition = delims[1]
      this.delimiters.escape = delims[2]
      this.delimiters.subcomponent = delims[3]
      if (this.message.length)
        this.emit('message', this.message)
      this.message = []
    }
    if (types.hasOwnProperty(s)) {
      var seg = this._parseSegment(s, data)
      this.emit('segment', seg)
      this.message.push(seg)
      return seg
    } else {
      /**
       * TODO Remove this and add a default segment parser
       * This is mainly in place so we can see what default
       * segments we are missing
       */
      console.log(s, '['+data+']')
      throw new Error('Invalid segment type')
    }
  }
  return String(data)
}

Segment.prototype.types = types

Segment.prototype._parseSegment = function(segmentType, data) {
  var self = this
    , fieldDelim = self.delimiters.field
  if (types.hasOwnProperty(segmentType)) {
    data = String(data)
    var out = {}
    var comps = data.split(fieldDelim)
    var len = comps.length
    for (var i=0; i<len; i++) {
      out[types[segmentType][i]] = comps[i]
      console.log(out)
    }
    return out
  } else {
    return data
  }
}

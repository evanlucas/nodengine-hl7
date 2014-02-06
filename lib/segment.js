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
  , path = require('path')
  , fs = require('fs')
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

  this.delimiters = {
    segment: '\r',
    field: '|',
    component: '^',
    subcomponent: '&',
    repetition: '~',
    escape: '\\'
  }
}

/**
 * Parses _data_ as a hl7 segment
 *
 * @param {Buffer|String} data The segment
 * @api public
 */
Segment.prototype.parse = function(data) {
  if (data.length > 1) { // account for trailing \r
    var s = data.slice(0, 3)
    if (s === 'MSH') {
      var delims = data.slice(3, 7)
      this.delimiters.segment = data.slice(-1)
      this.delimiters.field = delims[0]
      this.delimiters.repetition = delims[1]
      this.delimiters.escape = delims[2]
      this.delimiters.subcomponent = delims[3]
    }
    if (types.hasOwnProperty(s)) {
      var seg = this._parseSegment(s, data)
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

Segment.prototype.isHeader = function(segment) {
  if (segment.hasOwnProperty('SegmentType')) {
    if (segment.SegmentType === 'MSH') return true
  }
  return false
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
    }
    return out
  } else {
    return data
  }
}

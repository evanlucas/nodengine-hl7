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
  , utils = require('./utils')
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
function Segment(data, delimiters) {
  if (!(this instanceof Segment))
    return new Segment(data, delimiters)

  if (delimiters) {
    this.delimiters = delimiters
  } else {
    this.delimiters = {
      segment: '\r',
      field: '|',
      component: '^',
      subcomponent: '&',
      repetition: '~',
      escape: '\\'
    }
  }

  this.parsed = this.parse(data)
}

/**
 * Parses _data_ as a hl7 segment
 *
 * @param {Buffer|String} data The segment
 * @api public
 */
Segment.prototype.parse = function(data) {
  if (data && data.length > 1) { // account for trailing \r
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
      var e = new Error('Invalid segment type')
      e.code = 'EINVSEGTYPE'
      e.raw = data
      throw new Error(e)
    }
  }
  //return String(data)
  return false
}

Segment.prototype.toArray = function() {
  var type = this.segmentType()
  if (!type) return []
  var out = []
  var keys = Object.keys(this.parsed)
  var len = keys.length
  for (var i=0; i<len; i++) {
    var key = keys[i]
    var idx = types[type].indexOf(key)
    if (idx === -1) continue
    out[idx] = this.parsed[key]
  }
  return out
}

Segment.prototype.isHeader = function() {
  return utils.segmentIsHeader(this)
}

Segment.prototype.segmentType = function() {
  if (this.parsed && this.parsed.SegmentType)
    return this.parsed.SegmentType
  return null
}

Segment.prototype.types = types

Segment.prototype._parseSegment = function(segmentType, data) {
  var self = this
    , fieldDelim = self.delimiters.field
  data = String(data)
  var out = {}
  var comps = data.split(fieldDelim)
  var len = comps.length
  var fieldsLen = types[segmentType].length
  for (var i=0; i<fieldsLen; i++) {
    var fieldName = types[segmentType][i]
    if (fieldName === 'EncodingCharacters') {
      out[fieldName] = fieldDelim+comps[i]
    } else {
      out[fieldName] = comps[i] || ''
    }
  }
/*
  for (var i=0; i<len; i++) {
    var field = types[segmentType][i]
    if (field === 'EncodingCharacters') {
      out[field] = fieldDelim+comps[i]
    } else {
      out[types[segmentType][i]] = comps[i]
    }
  }
*/
  return out
}

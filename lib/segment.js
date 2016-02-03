'use strict'

var path = require('path')
  , fs = require('fs')
  , segmentsDir = path.join(__dirname, 'segments')
  , utils = require('./utils')
  , types = {}

/*!
 * Load our segment types
 */
fs.readdirSync(segmentsDir)
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
      segment: '\r'
    , field: '|'
    , component: '^'
    , subcomponent: '&'
    , repetition: '~'
    , escape: '\\'
    }
  }

  this.parsed = this.parse(data)
}

/**
 * Registers a new variant
 *
 * Required Keys:
 *
 *  - `name` {String} The variant name
 *  - `fields` {Array} The fields this variant exposes
 *
 * @param {Object} variant The variant to register
 * @api public
 */
Segment.registerVariant = function(variant) {
  if (variant === null || typeof variant !== 'object')
    throw new TypeError('Variant must be an object')

  if (!variant.hasOwnProperty('name'))
    throw new Error('Variant must have a name')

  if (!variant.hasOwnProperty('fields'))
    throw new Error('Variant must have fields')

  var name = variant.name.toUpperCase()
  if (types.hasOwnProperty(name)) {
    types[name+'_'] = types[name]
  }
  types[name] = variant.fields
}

/**
 * Parses _data_ as a hl7 segment
 *
 * @param {Buffer|String} data The segment
 * @api public
 */
Segment.prototype.parse = function(data) {
  if (data && data.length > 1) { // account for trailing \r
    data = data.replace(/\u000b/g, '')
               .replace(/\u001c/g, '')
    this._raw = data
    var s = data.slice(0, 3)
    if (s === 'MSH' || s === 'BHS' || s === 'FHS') {
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
      var e = new Error('Invalid segment type: '+s)
      e.code = 'EINVSEGTYPE'
      e.raw = data
      throw e
    }
  }
  return false
}

Segment.prototype.toArray = function() {
  var type = this.segmentType()
  if (!type) return []
  var out = []
  var keys = Object.keys(this.parsed)
  var len = keys.length
  for (var i = 0; i < len; i++) {
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

Segment.prototype.toString = function() {
  return this._raw
}

Segment.prototype.types = types

Segment.prototype._parseSegment = function(segmentType, data) {
  var self = this
    , fieldDelim = self.delimiters.field
  data = String(data)
  var out = {}
  var comps = data.split(fieldDelim)
  var fieldsLen = types[segmentType].length
  for (var i = 0; i < fieldsLen; i++) {
    var fieldName = types[segmentType][i]
    if (fieldName === 'EncodingCharacters') {
      out[fieldName] = fieldDelim+comps[i]
    } else {
      out[fieldName] = comps[i] || ''
    }
  }
  return out
}

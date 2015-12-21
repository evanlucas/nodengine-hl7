'use strict'

var utils = require('./utils')
  , Segment = require('./segment')

// Expose exports
module.exports = Message

/**
 * Constructor
 *
 * @param {Array|Segment} segments A single Segment or an array of Segments
 * @api public
 */
function Message(segments) {
  if (!(this instanceof Message))
    return new Message(segments)

  this.header = null
  if (segments && Array.isArray(segments)) {
    var self = this
    this.segments = segments
    if (segments.length) {
      this.segmentTypes = segments.reduce(function(set, item) {
        if (utils.segmentIsHeader(item))
          self.header = item

        var t = item.parsed && item.parsed.SegmentType
        if (t && !~set.indexOf(t))
          set.push(t)
        return set
      }, [])
    } else {
      this.segmentTypes = []
    }
  } else if (segments instanceof Segment) {
    this.segments = [segments]
    if (utils.segmentIsHeader(segments)) {
      this.header = segments
    }
    this.segmentTypes = [segments.parsed.SegmentType]
  } else {
    this.segments = []
    this.segmentTypes = []
  }
}

/**
 * Does this message have any segments?
 *
 * @api public
 * @returns Boolean
 */
Message.prototype.hasSegments = function() {
  return this.segments.length !== 0
}

/**
 * Adds the given _segment_ to the message
 *
 * @param {Segment} segment The Segment to add to the message
 * @api public
 */
Message.prototype.addSegment = function(segment) {
  this.segments.push(segment)
  var t = segment.parsed.SegmentType
  if (!(~this.segmentTypes.indexOf(t))) {
    this.segmentTypes.push(t)
  }
  if (utils.segmentTypeIsHeader(t)) {
    this.header = segment
  }
}

Message.prototype.toString = function() {
  var delims = this.delimiters()
  return this.segments.join(delims.segment) + delims.segment
}

/**
 * Gets the header Segment of the Message
 *
 * @api public
 * @returns Segment
 */
Message.prototype.getHeader = function() {
  return this.header
}

/**
 * Gets the delimiters for the given message. These are taken from the MSH
 *
 * @api public
 * @returns Object
 */
Message.prototype.delimiters = function() {
  if (!this.header) return {
    segment: '\r',
    field: '|',
    component: '^',
    subcomponent: '&',
    repetition: '~',
    escape: '\\'
  }

  var chars = this.header.parsed.EncodingCharacters
  return {
    segment: '\r',
    field: chars[0] || '|',
    component: chars[1] || '^',
    subcomponent: chars[2] || '&',
    repetition: chars[3] || '~',
    escape: chars[4] || '\\'
  }
}

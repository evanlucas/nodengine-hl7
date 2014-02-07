//
// HL7 Parser - BulkMessage
//
// Author:    Evan Lucas
// Filename:  bulkmessage.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//

/**
 * Module dependencies
 */
var _ = require('underscore')
  , utils = require('./utils')
  , Message = require('./message')
  , Segment = require('./segment')

// Expose exports
module.exports = BulkMessage

/**
 * Constructor
 *
 * @param {Array|Segment} segments A Segment or an array of Segments
 * @api public
 */
function BulkMessage(segments) {
  if (!(this instanceof BulkMessage))
    return new BulkMessage(segments)

  if (segments && Array.isArray(segments)) {
    this.segments = segments
    this.segmentTypes = _.unique(
      _.pluck(this.segments, 'SegmentType')
    )
    var len = segments.length
    for (var i=0; i<len; i++) {
      if (utils.segmentIsHeader(segments[i])) {
        this.header = segments[i]
        break
      }
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
    this.header = null
  }
}

BulkMessage.prototype.hasSegments = function() {
  return this.segments.length !== 0
}

BulkMessage.prototype.addSegment = function(segment) {
  this.segments.push(segment)
  var t = segment.parsed.SegmentType
  if (!(~this.segmentTypes.indexOf(t))) {
    this.segmentTypes.push(t)
  }
  if (utils.segmentTypeIsHeader(t)) {
    this.header = segment
  }
}

BulkMessage.prototype.getHeader = function() {
  return this.header
}

BulkMessage.prototype.delimiters = function() {
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

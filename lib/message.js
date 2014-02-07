//
// HL7 Parser - Message
//
// Author:    Evan Lucas
// Filename:  message.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//

/**
 * Module dependencies
 */
var _ = require('underscore')
  , utils = require('./utils')
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

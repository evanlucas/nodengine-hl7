var _ = require('underscore')
  , utils = require('./utils')
  , Segment = require('./segment')

module.exports = Message

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

Message.prototype.hasSegments = function() {
  return this.segments.length !== 0
}

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

Message.prototype.getHeader = function() {
  return this.header
}

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
    field: chars[0],
    component: chars[1],
    subcomponent: chars[2],
    repetition: chars[3],
    escape: chars[4]
  }
}

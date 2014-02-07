var _ = require('underscore')
  , utils = require('./utils')
  , Message = require('./message')
  , Segment = require('./segment')

module.exports = BulkMessage

function BulkMessage(segments) {
  if (!(this instanceof BulkMessage))
    return new BulkMessage(segments)

  if (segments && Array.isArray(segments)) {
    this.segments = segments
    this.segmentTypes = _.unique(
      _.pluck(this.segments, 'SegmentType')
    )
  } else {
    this.segments = []
    this.segmentTypes = []
  }
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

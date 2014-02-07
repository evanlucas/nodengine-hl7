var utils = exports
  , Segment = require('./segment')

utils.segmentIsHeader = function(segment) {
  if (segment.segmentType) {
    return utils.segmentTypeIsHeader(segment.segmentType())
  }
  return false
}

utils.segmentTypeIsHeader = function(type) {
  return type === 'MSH'
}

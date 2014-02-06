var utils = exports

utils.segmentIsHeader = function(segment) {
  if (segment.hasOwnProperty('SegmentType')) {
    return utils.segmentTypeIsHeader(segment.SegmentType)
  }
  return false
}

utils.segmentTypeIsHeader = function(type) {
  return type === 'MSH'
}

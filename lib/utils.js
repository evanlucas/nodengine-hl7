var utils = exports

utils.segmentIsHeader = function(segment) {
  if (segment) {
    return segment.parsed.SegmentType === 'MSH'
  }
  return false
}

utils.segmentTypeIsHeader = function(type) {
  return type === 'MSH'
}

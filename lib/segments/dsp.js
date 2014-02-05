var segment = exports

segment.parse = function(data, delims) {
  data = data.toString()
  var out = {}
  var comps = data.split(delims.field)
  var len = comps.length
  for (var i=0; i<len; i++) {
    out[segment.fields[i]] = comps[i]
  }
  return out
}

segment.fields = [
    'SegmentType'
  , 'SetID'
  , 'DisplayLevel'
  , 'DataLine'
  , 'LogicalBreakPoint'
  , 'ResultID'
]

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
  , 'EncodingCharacters'
  , 'SendingApplication'
  , 'SendingFacility'
  , 'ReceivingApplication'
  , 'ReceivingFacility'
  , 'DateTime'
  , 'Security'
  , 'MessageType'
  , 'MessageControlID'
  , 'ProcessingID'
  , 'VersionID'
  , 'SequenceNumber'
  , 'ContinuationPointer'
  , 'AcceptAcknowledgementType'
  , 'ApplicationAcknowledgementType'
  , 'CountryCode'
  , 'CharacterSet'
  , 'PrincipalLanguage'
  , 'AlternateCharacterSetHandlingScheme'
]

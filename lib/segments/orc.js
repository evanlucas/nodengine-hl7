var segment = exports

segment.parse = function(data, delims) {
  data = String(data)
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
  , 'OrderControl'
  , 'PlacerOrderNumber'
  , 'FillerOrderNumber'
  , 'PlacerGroupNumber'
  , 'OrderStatus'
  , 'ResponseFlag'
  , 'QuantityTiming'
  , 'Parent'
  , 'DateTimeofTransaction'
  , 'EnteredBy'
  , 'VerifiedBy'
  , 'OrderingProvider'
  , 'Enterer’sLocation'
  , 'CallBackPhoneNumber'
  , 'OrderEffectiveDateTime'
  , 'OrderControlCodeReasonEnteringOrganization'
  , 'EnteringDevice'
  , 'ActionBy'
  , 'AdvancedBeneficiaryNoticeCodeOrderingFacilityName'
  , 'OrderingFacilityAddress'
  , 'OrderingFacilityPhoneNumberOrderingProviderAddress'
]

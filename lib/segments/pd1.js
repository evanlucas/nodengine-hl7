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
  , 'LivinDependency'
  , 'LivingArrangement'
  , 'PatientPrimaryFacility'
  , 'PatientPrimaryCareProviderNameID'
  , 'StudentIndicator'
  , 'Handicap'
  , 'LivingWill'
  , 'OrganDonor'
  , 'SeparateBill'
  , 'DuplicatePatient'
  , 'PublicityCode'
  , 'ProtectionIndicator'
]

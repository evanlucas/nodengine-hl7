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
    'SetID'
  , 'Name'
  , 'Relationship'
  , 'Address'
  , 'PhoneNumber'
  , 'BusinessPhoneNumber'
  , 'ContactRole'
  , 'StartDate'
  , 'EndDate'
  , 'NextOfKinJobTitle'
  , 'NextOfKinJobCodeClass'
  , 'NextOfKinEmployeeNumber'
  , 'Organization Name'
  , 'MaritalStatus'
  , 'Sex'
  , 'BirthDate'
  , 'LivingDependency'
  , 'AmbulatoryStatus'
  , 'Citizenship'
  , 'PrimaryLanguage'
  , 'LivingArrangement'
  , 'PublicityCode'
  , 'ProtectionIndicator'
  , 'StudentIndicator'
  , 'Religion'
  , 'MotherMaidenName'
  , 'Nationality'
  , 'EthnicGroup'
  , 'ContactReason'
  , 'ContactPersonName'
  , 'ContactPersonPhoneNumber'
  , 'ContactPersonAddress'
  , 'NextOfKinIdentifiers'
  , 'JobStatus'
  , 'Race'
  , 'Handicap'
  , 'ContactPersonSSN'
]

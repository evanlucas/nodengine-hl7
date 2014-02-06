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
  , 'PriorPendingLocation'
  , 'AccommdationCode'
  , 'AdmitReason'
  , 'TransferReason'
  , 'PatientValuables'
  , 'PatientValuablesLocation'
  , 'VisitUserCode'
  , 'ExpectedAdmitDateTime'
  , 'ExpectedDischargeDateTime'
  , 'EstimatedLengthOfInpatientStay'
  , 'ActualLengthOfInpatientStay'
  , 'VisitDescription'
  , 'ReferralSourceCode'
  , 'PreviousServiceDate'
  , 'EmploymentIllnessRelatedIndicator'
  , 'PurgeStatusCode'
  , 'PurgeStatusDate'
  , 'SpecialProgramCode'
  , 'RetentionIndicator'
  , 'ExpectedNumberOfInsurancePlans'
  , 'VisitPublicityCode'
  , 'VisitProtectionIndicator'
  , 'ClinicOrganizationName'
  , 'PatientStatusCode'
  , 'VisitPriorityCode'
  , 'PreviousTreatmentDate'
  , 'ExpectedDischargeDisposition'
  , 'SignatureOnFileDate'
  , 'FirstSimilarIllnessDate'
  , 'PatientChargeAdjustmentCode'
  , 'RecurringServiceCode'
  , 'BillingMediaCode'
  , 'ExpectedSurgeryDateTime'
  , 'MilitaryPartnershipCode'
  , 'MilitaryNonAvailabilityCode'
  , 'NewbornBabyIndicator'
  , 'BabyDetainedIndicator'
]

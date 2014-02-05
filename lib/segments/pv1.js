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
  , 'AssignedPatientLocation'
  , 'AdmissionType'
  , 'PreadmitNumber'
  , 'PriorPatientLocation'
  , 'AttendingDoctor'
  , 'ReferringDoctor'
  , 'ConsultingDoctor'
  , 'HospitalService'
  , 'TemporaryLocation'
  , 'PreadmitTestIndicator'
  , 'ReadmissionIndicator'
  , 'AdmitSource'
  , 'AmbulatoryStatus'
  , 'VIPIndicator'
  , 'AdmittingDoctor'
  , 'PatientType'
  , 'VisitNumber'
  , 'FinancialClass'
  , 'ChargePriceIndicator'
  , 'CourtesyCode'
  , 'CreditRating'
  , 'ContractCode'
  , 'ContractEffectiveDate'
  , 'ContractAmount'
  , 'ContactPeriod'
  , 'InterestCode'
  , 'TransferToBadDebtCode'
  , 'TransferToBadDebtDate'
  , 'BadDebtAgencyCode'
  , 'BadDebtTransferAmount'
  , 'BadDebtRecoveryAmount'
  , 'DeleteAccountIndicator'
  , 'DeleteAccountDate'
  , 'DischargeDisposition'
  , 'DischargedToLocation'
  , 'DietType'
  , 'ServicingFacility'
  , 'BedStatus'
  , 'AccountStatus'
  , 'PendingLocation'
  , 'PriorTemporaryLocation'
  , 'AdmitDateTime'
  , 'DischargeDateTime'
  , 'CurrentPatientBalance'
  , 'TotalCharges'
  , 'TotalAdjustments'
  , 'TotalPayments'
  , 'AlternateVisitID'
  , 'VisitIndicator'
  , 'OtherHealthcareProvider'
]

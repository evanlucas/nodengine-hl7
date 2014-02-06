var segment = exports

segment.parse = function(data, delims) {
  data = data.toString()
  var out = {}
  var comps = data.split(delims.field)
  var len = comps.length
  for (var i=0; i<len; i) {
    out[segment.fields[i]] = comps[i]
  }
  return out
}

segment.fields = [
    'SegmentType'
  , 'SetID'
  , 'PlacerOrderNumber'
  , 'FillerOrderNumber'
  , 'UniversalServiceID'
  , 'Priority'
  , 'RequestedDateTime'
  , 'ObservationDateTime'
  , 'ObservationEndDateTime'
  , 'CollectionVolume'
  , 'CollectorIdentifier'
  , 'SpecimenActionCode'
  , 'DangerCode'
  , 'RelevantClinicalInfo.'
  , 'SpecimenReceivedDateTime'
  , 'SpecimenSource'
  , 'OrderingProvider'
  , 'OrderCallbackPhoneNumber'
  , 'PlacerField1'
  , 'PlacerField2'
  , 'FillerField1'
  , 'FillerField2'
  , 'ResultsRptStatusChngDateTime'
  , 'ChargeToPractice'
  , 'DiagnosticServSectID'
  , 'ResultStatus'
  , 'ParentResult'
  , 'QuantityTiming'
  , 'ResultCopiesTo'
  , 'Parent'
  , 'TransportationMode'
  , 'ReasonForStudy'
  , 'PrincipalResultInterpreter'
  , 'AssistantResultInterpreter'
  , 'Technician'
  , 'Transcriptionist'
  , 'ScheduledDateTime'
  , 'NumberofSampleContainers'
  , 'TransportLogisticsOfCollectedSample'
  , 'CollectorsComment'
  , 'TransportArrangementResponsibility'
  , 'TransportArranged'
  , 'EscortRequired'
  , 'PlannedPatientTransportComment'
  , 'ProcedureCode'
  , 'ProcedureCodeModifier'
]

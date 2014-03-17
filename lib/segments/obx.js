//
// OBX Segment Definition
//
// Author:    Evan Lucas
// Filename:  segment.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//
exports.name = 'OBX'

exports.fields = [
    'SegmentType'
  , 'SetID'
  , 'ValueType'
  , 'ObservationIdentifier'
  , 'ObservationSubID'
  , 'ObservationValue'
  , 'Units'
  , 'ReferencesRange'
  , 'AbnormalFlags'
  , 'Probability'
  , 'NatureofAbnormalTest'
  , 'ObservationResultStatus'
  , 'DateLastObsNormalValues'
  , 'UserDefinedAccessChecks'
  , 'DateTimeoftheObservation'
  , 'ProducerID'
  , 'ResponsibleObserver'
  , 'ObservationMethod'
]

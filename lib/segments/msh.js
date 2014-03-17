//
// MSH Segment Definition
//
// Author:    Evan Lucas
// Filename:  segment.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//
exports.name = 'MSH'

exports.fields = [
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


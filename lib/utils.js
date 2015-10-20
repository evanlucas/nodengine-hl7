'use strict'

var utils = exports
  , Segment = require('./segment')

/**
 * Is the given _segment_ a header segment?
 *
 * @param {Segment} segment A Segment object
 * @api public
 */
utils.segmentIsHeader = function(segment) {
  if (segment.segmentType) {
    return utils.segmentTypeIsHeader(segment.segmentType())
  }
  return false
}

/**
 * Is the given segment _type_ a header segment?
 *
 * @param {String} type The segment type
 * @api public
 */
utils.segmentTypeIsHeader = function(type) {
  return !!~utils.headerSegmentTypes.indexOf(type)
}

/*!
 * Header types that define delimiters
 */
utils.headerSegmentTypes = [
    'MSH'
  , 'FHS'
  , 'BHS'
]

/*!
 * Returns the supported HL7 versions
 */
utils.supportedVersions = [
  '2.3.1'
]

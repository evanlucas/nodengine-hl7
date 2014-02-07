//
// HL7 Parser - Utilities
//
// Author:    Evan Lucas
// Filename:  utils.js
// Created:   2/6/14
// Copyright: Evan Lucas 2014
//

/**
 * Module dependencies
 */
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
  return type === 'MSH'
}

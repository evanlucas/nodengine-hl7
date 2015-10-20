'use strict'

var test = require('tap').test
  , utils = require('../').utils
  , Segment = require('../').Segment

test('segmentIsHeader', function(t) {
  t.plan(3)
  var d = 'MSH|^~\\&|||||||||||'
  var s = new Segment(d)
  t.equal(true, utils.segmentIsHeader(s), 'segment is header')
  d = 'ORC|fadfasdf|'
  s = new Segment(d)
  t.equal(false, utils.segmentIsHeader(s), 'segment is not header')
  t.equal(false, utils.segmentIsHeader('12345'), 'segment is not header')
})

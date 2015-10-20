'use strict'

var test = require('tap').test
  , fs = require('fs')
  , path = require('path')
  , Segment = require('../').Segment

test('constructor', function(t) {
  t.plan(2)
  var s = new Segment()
  t.type(s, Segment)

  s = Segment()
  t.type(s, Segment)
})

test('segmentType', function(t) {
  t.plan(1)
  var s = new Segment()
  t.equal(s.segmentType(), null)
})

test('headers', function(t) {
  t.plan(2)
  var d = 'MSH|^~\\&'
  var s = new Segment(d)
  t.equal(s.isHeader(), true)
  d = 'ORC|fadfasdf|'
  s = new Segment(d)
  t.equal(s.isHeader(), false)
})

test('types', function(t) {
  var s = new Segment()
  var keys = Object.keys(s.types)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    t.notEqual(s.types[key].indexOf('SegmentType'), -1)
  }
  t.end()
})

test('registering variant', function(t) {
  t.plan(2)
  var variant = require('./fixtures/pv1_variant')
  Segment.registerVariant(variant)
  var s = new Segment()
  var types = s.types
  t.ok(types.hasOwnProperty(variant.name))
  t.equal(types[variant.name][1], 'SetIDFORPV1')
})

test('invalid variants', function(t) {
  t.plan(3)
  t.throws(function() {
    Segment.registerVariant()
  }, /Variant must be an object/)

  t.throws(function() {
    Segment.registerVariant({})
  }, /Variant must have a name/)

  t.throws(function() {
    Segment.registerVariant({ name: 'Test' })
  }, /Variant must have fields/)
})

test('toArray()', function(t) {
  var p = path.join(__dirname, 'fixtures', 'test.hl7')
  var f = fs.readFileSync(p, 'utf8')
  var lines = f.split('\r')

  // MSH
  var mshdata = lines[0]
  var seg = new Segment(mshdata)
  t.equal(seg.parsed.SegmentType, 'MSH')
  var out = seg.toArray()
  var fields = seg.types[seg.segmentType()]
  var len = fields.length
  for (var i = 0; i < len; i++) {
    t.equal(seg.parsed[fields[i]], out[i])
  }

  // PID
  var mshdata = lines[1]
  var seg = new Segment(mshdata)
  t.equal(seg.parsed.SegmentType, 'PID')
  var out = seg.toArray()
  var fields = seg.types[seg.segmentType()]
  var len = fields.length
  for (var i = 0; i < len; i++) {
    t.equal(seg.parsed[fields[i]], out[i])
  }

  // NK1
  var mshdata = lines[2]
  var seg = new Segment(mshdata)
  t.equal(seg.parsed.SegmentType, 'NK1')
  var out = seg.toArray()
  var fields = seg.types[seg.segmentType()]
  var len = fields.length
  for (var i = 0; i < len; i++) {
    t.equal(seg.parsed[fields[i]], out[i])
  }

  // PV1
  var mshdata = lines[3]
  var seg = new Segment(mshdata)
  t.equal(seg.parsed.SegmentType, 'PV1')
  var out = seg.toArray()
  var fields = seg.types[seg.segmentType()]
  var len = fields.length
  for (var i = 0; i < len; i++) {
    t.equal(seg.parsed[fields[i]], out[i])
  }

  t.end()
})

test('toString()', function(t) {
  t.plan(2)
  var p = path.join(__dirname, 'fixtures', 'test.hl7')
  var f = fs.readFileSync(p, 'utf8')
  var lines = f.split('\r')
  var mshdata = lines[0]
  var seg = new Segment(mshdata)
  t.equal(seg.parsed.SegmentType, 'MSH')
  var out = seg.toString()
  t.equal(out, mshdata)
})

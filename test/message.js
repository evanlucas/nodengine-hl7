'use strict'

var test = require('tap').test
  , Message = require('../').Message
  , Segment = require('../').Segment
  , fs = require('fs')
  , path = require('path')
  , Parser = require('../').Parser
  , split = require('split')

test('message constructor', function(t) {
  t.plan(2)
  var m = new Message()
  t.type(m, Message)
  m = Message()
  t.type(m, Message)
})

test('message header', function(t) {
  t.plan(2)
  var m = new Message()
  t.equal(m.getHeader(), null)
  var m = new Message([])
  t.equal(m.getHeader(), null)
})

test('arguments', function(t) {
  var d1 = 'MSH|^~\\&'
  var s1 = new Segment(d1)
  var d2 = 'OBR|||||||'
  var s2 = new Segment(d2)
  var m = new Message([s1, s2])
  t.type(m, Message)
  t.equal(m.hasOwnProperty('segments'), true)
  for (var i = 0, len = m.segments.length; i < len; i++) {
    t.type(m.segments[i], Segment)
  }
  t.deepEqual(m.segmentTypes, ['MSH', 'OBR'])

  var d = 'MSH|^~\\&'
  var s = new Segment(d)
  var m = new Message(s)
  t.type(m, Message)
  t.end()
})

test('segments', function(t) {
  t.plan(2)
  var m = new Message()
  t.equal(m.hasSegments(), false)
  var d = 'MSH|^~\\&'
  var s = new Segment(d)
  var m = new Message(s)
  t.equal(m.hasSegments(), true)
})

test('toString()', function(t) {
  t.plan(3)
  var parser = new Parser()
  var test = path.join(__dirname, 'fixtures', 'test2.hl7')
  var contents = fs.readFileSync(test, 'utf8')
  fs.createReadStream(test)
    .pipe(split(/\r/))
    .pipe(parser)

  parser.on('error', t.fail)

  parser.on('message', function(msg) {
    t.type(msg, Message)
    var o = msg.toString() + '\n'
    t.equal(o, contents)
  })

  parser.on('finish', function() {
    t.ok('got finish event')
  })
})

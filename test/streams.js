'use strict'

var test = require('tap').test
  , Parser = require('../').Parser
  , path = require('path')
  , fs = require('fs')

test('emit 1 msg if 1 is written to parser', function(t) {
  var p = new Parser()

  p.on('message', function(msg) {
    var segs = msg.segmentTypes
    t.deepEqual(segs, ['MSH', 'PID', 'NK1', 'PV1'])
    t.end()
  })

  var test = path.join(__dirname, 'fixtures', 'test.hl7')
  var contents = fs.readFileSync(test, 'utf8').split('\r')
  for (var i = 0, len = contents.length; i < len; i++) {
    p.write(contents[i])
  }
})

test('emit 2 msgs if 2 are written to parser', function(t) {
  t.plan(4)
  var test = path.join(__dirname, 'fixtures', 'test.hl7')
  var test2 = path.join(__dirname, 'fixtures', 'test2.hl7')

  var contents = fs.readFileSync(test, 'utf8').split('\r')
  var contents2 = fs.readFileSync(test2, 'utf8').split('\r')

  contents = contents.concat(contents2)

  var p = new Parser()
  p.on('message', function(msg) {
    t.ok('got message event')
    var segs = msg.segmentTypes
    t.deepEqual(segs, ['MSH', 'PID', 'NK1', 'PV1'])
  })

  for (var i = 0, len = contents.length; i < len; i++) {
    p.write(contents[i])
  }
})

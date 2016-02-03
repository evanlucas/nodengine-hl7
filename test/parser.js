'use strict'

var fs = require('fs')
  , Parser = require('../').Parser
  , path = require('path')
  , split = require('split')
  , Message = require('../').Message
  , Segment = require('../').Segment
  , test = require('tap').test

test('constructor', function(t) {
  t.plan(2)
  var parser = new Parser()
  t.type(parser, Parser)

  parser = Parser()
  t.type(parser, Parser)
})

test('parse from file', function(t) {
  t.plan(1)
  var parser = new Parser()
  var test = path.join(__dirname, 'fixtures', 'test.hl7')
  fs.createReadStream(test)
    .pipe(split(/\r/))
    .pipe(parser)
  parser.on('finish', function() {
    t.ok('got finish event')
  })
})

test('parse file with multiple messages', function(t) {
  t.plan(101)
  var parser = new Parser()
  var test = path.join(__dirname, 'fixtures', 'out.hl7')
  fs.createReadStream(test)
    .pipe(split(/\r/))
    .pipe(parser)
  parser.on('message', function(m) {
    t.ok('got message')
  })
  parser.on('finish', function() {
    t.ok('got finish event')
  })
})

test('parse invalid file', function(t) {
  t.plan(2)
  var parser = new Parser()
  var test = path.join(__dirname, 'fixtures', 'invalid.hl7')
  fs.createReadStream(test)
    .pipe(split(/\r/))
    .pipe(parser)

  parser.on('error', function(err) {
    t.ok('got error event')
    t.equal(err.message, 'Invalid segment type: thi')
  })

  parser.on('finish', t.fail)
})

test('multiple messages', function(t) {
  t.plan(5)
  var parser = new Parser()
  var test = path.join(__dirname, 'fixtures', 'test.hl7')
  fs.createReadStream(test)
    .pipe(split(/\r/))
    .pipe(parser)

  parser.on('error', t.fail)

  parser.on('message', function(msg) {
    t.type(msg, Message)
    t.type(msg.getHeader(), Segment)
  })

  parser.on('finish', function() {
    t.ok('got finish event')
  })
})

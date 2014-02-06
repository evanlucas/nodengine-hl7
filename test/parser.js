var fs = require('fs')
  , should = require('should')
  , Parser = require('../')
  , path = require('path')
  , split = require('split')
  , through = require('through')
  , Message = require('../lib/message')

describe('HL7 parser', function() {
  describe('Parse from file', function() {
    it('should be able to parse', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'test.hl7')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)
      parser.on('finish', function() {
        done()
      })
    })
  })

  describe('Events', function() {
    it('should support multiple messages', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'test.hl7')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)

      var messageCount = 0

      parser.on('error', function(e) {
        throw e
      })

      parser.on('message', function(message) {
        message.should.be.instanceOf(Message)
        messageCount++
      })
      parser.on('finish', function() {
        messageCount.should.eql(2)
        done()
      })
    })

    it('should get a message event', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'test.hl7')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)

      var got = false

      parser.on('error', function(e) {
        throw e
      })

      parser.on('message', function(message) {
        message.should.be.instanceOf(Message)
        got = message
      })
      parser.on('finish', function() {
        should.exist(got)
        done()
      })
    })

    it('should get a segment event', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'test.hl7')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)

      var got = false

      parser.on('error', function(e) {
        throw e
      })

      parser.on('segment', function(segment) {
        got = segment
      })
      parser.on('finish', function() {
        should.exist(got)
        done()
      })
    })
  })
})

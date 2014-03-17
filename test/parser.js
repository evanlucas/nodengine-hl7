var fs = require('fs')
  , should = require('should')
  , Parser = require('../').Parser
  , path = require('path')
  , split = require('split')
  , through = require('through')
  , Message = require('../').Message
  , Segment = require('../').Segment

describe('HL7 parser', function() {
  describe('Construct', function() {
    it('should allow using new', function() {
      var parser = new Parser()
      parser.should.be.instanceOf(Parser)
    })

    it('should allow omitting new', function() {
      var parser = Parser()
      parser.should.be.instanceOf(Parser)
    })
  })

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

    it('should be able to parse a file with multiple messages', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'out.hl7')
        , count = 0
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)
      parser.on('message', function(m) {
        count++
      })
      parser.on('finish', function() {
        count.should.equal(100)
        done()
      })
    })

    it('should emit an error on an invalid file', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'invalid.hl7')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)

      parser.on('error', function(err) {
        done(err)
      })

      parser.on('finish', function() {
        done(new Error('Should have emitted an error'))
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
        done(e)
      })

      parser.on('message', function(message) {
        message.should.be.instanceOf(Message)
        message.getHeader().should.be.instanceOf(Segment)
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
        done(e)
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
        done(e)
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

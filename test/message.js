var should = require('should')
  , Message = require('../').Message
  , Segment = require('../').Segment
  , fs = require('fs')
  , path = require('path')
  , Parser = require('../').Parser
  , split = require('split')

describe('Message', function() {
  it('should support using new', function() {
    var m = new Message()
    m.should.be.instanceOf(Message)
  })

  it('should support not using new', function() {
    var m = Message()
    m.should.be.instanceOf(Message)
  })

  describe('Header', function() {
    it('should support no header', function() {
      var m = new Message()
      should.ok(m.getHeader() === null)
    })
  })

  describe('Arguments', function() {
    it('should support taking an array of Segments', function() {
      var d1 = 'MSH|^~\\&'
      var s1 = new Segment(d1)
      var d2 = 'OBR|||||||'
      var s2 = new Segment(d2)
      var m = new Message([s1, s2])
      m.should.be.instanceOf(Message)
      m.should.have.property('segments')
      for (var i = 0, len = m.segments.length; i < len; i++) {
        m.segments[i].should.be.instanceOf(Segment)
      }
      m.should.have.property('segmentTypes', ['MSH', 'OBR'])
    })

    it('should support taking a single Segment', function() {
      var d = 'MSH|^~\\&'
      var s = new Segment(d)
      var m = new Message(s)
      m.should.be.instanceOf(Message)
    })

    it('should support taking no Segments', function() {
      var m = new Message()
      m.should.be.instanceOf(Message)
    })
  })

  describe('Segments', function() {
    it('should support having no segments', function() {
      var m = new Message()
      m.hasSegments().should.eql(false)
    })

    it('should support having multiple segments', function() {
      var d = 'MSH|^~\\&'
      var s = new Segment(d)
      var m = new Message(s)
      m.hasSegments().should.eql(true)
    })
  })

  describe('toString()', function() {
    it('should have a toString function', function(done) {
      var parser = new Parser()
      var test = path.join(__dirname, 'fixtures', 'test2.hl7')
      var contents = fs.readFileSync(test, 'utf8')
      fs.createReadStream(test)
        .pipe(split(/\r/))
        .pipe(parser)

      var got = false

      parser.on('error', function(e) {
        done(e)
      })

      parser.on('message', function(message) {
        message.should.be.instanceOf(Message)
        var o = message.toString() + '\n'
        o.should.equal(contents)
        got = message
      })
      parser.on('finish', function() {
        should.exist(got)
        done()
      })
    })
  })
})

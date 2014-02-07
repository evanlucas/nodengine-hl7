var should = require('should')
  , fs = require('fs')
  , path = require('path')
  , Segment = require('../').Segment

describe('Segment', function() {
  describe('Construct', function() {
    it('should allow using new', function() {
      var s = new Segment()
      s.should.be.instanceOf(Segment)
    })
    it('should allow omitting new', function() {
      var s = Segment()
      s.should.be.instanceOf(Segment)
    })
  })

  describe('Headers', function() {
    it('should support getting the header', function() {
      var d = 'MSH|^~\\&'
      var s = new Segment(d)
      s.isHeader().should.eql(true)
      d = 'ORC|fadfasdf|'
      s = new Segment(d)
      s.isHeader().should.eql(false)
    })
  })

  describe('Types', function() {
    var s = new Segment()
    Object.keys(s.types).forEach(function(segment) {
      it(segment+' should have a SegmentType', function() {
        s.types[segment].indexOf('SegmentType').should.not.eql(-1)
      })
    })
  })
})

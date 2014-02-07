var should = require('should')
  , utils = require('../').utils
  , Segment = require('../').Segment

describe('Utilities', function() {
  describe('segmentIsHeader()', function() {
    it('should support passing a Segment', function() {
      var d = 'MSH|^~\\&'
      var s = new Segment(d)
      utils.segmentIsHeader(s).should.be.true
      d = 'ORC|fadfasdf|'
      s = new Segment(d)
      utils.segmentIsHeader(s).should.be.false
    })
    it('should support null', function() {
      utils.segmentIsHeader('12345').should.be.false
    })
  })
})
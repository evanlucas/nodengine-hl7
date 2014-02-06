var should = require('should')
  , fs = require('fs')
  , path = require('path')
  , Segment = require('../lib/segment')

describe('Segment', function() {
  describe('Types', function() {
    var s = new Segment()
    Object.keys(s.types).forEach(function(segment) {
      it(segment+' should have a SegmentType', function() {
        s.types[segment].indexOf('SegmentType').should.not.eql(-1)
      })
    })
  })
})

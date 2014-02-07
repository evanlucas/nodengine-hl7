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

  describe('Type', function() {
    it('should support getting the segment type', function() {
      var s = new Segment()
      should.equal(null, s.segmentType())
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

  describe('toArray()', function() {
    describe('MSH', function() {
      it('should return an array of fields', function() {
        var p = path.join(__dirname, 'fixtures', 'test.hl7')
        var f = fs.readFileSync(p, 'utf8')
        lines = f.split('\r')
        var mshdata = lines[0]
        var seg = new Segment(mshdata)
        var out = seg.toArray()
        var fields = seg.types[seg.segmentType()]
        fields.forEach(function(field, idx) {
          out[idx].should.eql(seg.parsed[field])
        })
      })
    })
  })
})

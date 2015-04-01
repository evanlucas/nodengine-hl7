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

  describe('Variant', function() {
    it('should support registering variants', function() {
      var variant = require('./fixtures/pv1_variant')
      Segment.registerVariant(variant)
      var s = new Segment()
      var types = s.types
      types.should.have.property(variant.name)
      types[variant.name][1].should.eql('SetIDFORPV1')
    })

    describe('Pass invalid variant', function() {
      it('requires the variant to be an object', function() {
        (function() {
          var v = Segment.registerVariant()
        }).should.throw('Variant must be an object')
      })
      it('requires the variant to have a name', function() {
        (function() {
          var v = Segment.registerVariant({})
        }).should.throw('Variant must have a name')
      })
      it('requires the variant to have fields', function() {
        (function() {
          var v = Segment.registerVariant({name:'Test'})
        }).should.throw('Variant must have fields')
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
        seg.parsed.should.have.property('SegmentType', 'MSH')
        var out = seg.toArray()
        var fields = seg.types[seg.segmentType()]
        fields.forEach(function(field, idx) {
          out[idx].should.eql(seg.parsed[field])
        })
      })
    })

    describe('PID', function() {
      it('should return an array of fields', function() {
        var p = path.join(__dirname, 'fixtures', 'test.hl7')
        var f = fs.readFileSync(p, 'utf8')
        lines = f.split('\r')
        var mshdata = lines[1]
        var seg = new Segment(mshdata)
        seg.parsed.should.have.property('SegmentType', 'PID')
        var out = seg.toArray()
        var fields = seg.types[seg.segmentType()]
        fields.forEach(function(field, idx) {
          out[idx].should.eql(seg.parsed[field])
        })
      })
    })

    describe('NK1', function() {
      it('should return an array of fields', function() {
        var p = path.join(__dirname, 'fixtures', 'test.hl7')
        var f = fs.readFileSync(p, 'utf8')
        lines = f.split('\r')
        var mshdata = lines[2]
        var seg = new Segment(mshdata)
        seg.parsed.should.have.property('SegmentType', 'NK1')
        var out = seg.toArray()
        var fields = seg.types[seg.segmentType()]
        fields.forEach(function(field, idx) {
          out[idx].should.eql(seg.parsed[field])
        })
      })
    })

    describe('PV1', function() {
      it('should return an array of fields', function() {
        var p = path.join(__dirname, 'fixtures', 'test.hl7')
        var f = fs.readFileSync(p, 'utf8')
        lines = f.split('\r')
        var mshdata = lines[3]
        var seg = new Segment(mshdata)
        seg.parsed.should.have.property('SegmentType', 'PV1')
        var out = seg.toArray()
        var fields = seg.types[seg.segmentType()]
        fields.forEach(function(field, idx) {
          out[idx].should.eql(seg.parsed[field])
        })
      })
    })
  })

  describe('toString()', function() {
    it('should return a reconstructed raw message', function() {
      var p = path.join(__dirname, 'fixtures', 'test.hl7')
      var f = fs.readFileSync(p, 'utf8')
      lines = f.split('\r')
      var mshdata = lines[0]
      var seg = new Segment(mshdata)
      seg.parsed.should.have.property('SegmentType', 'MSH')
      var out = seg.toString()
      out.should.equal(mshdata)
    })
  })
})

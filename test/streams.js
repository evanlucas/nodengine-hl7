var should = require('should')
  , Parser = require('../').Parser
  , split = require('split')
  , path = require('path')
  , fs = require('fs')
  , parser

describe('Streams', function() {
  beforeEach(function() {
    parser = new Parser()
  })
  
  it('should emit message once if one message is written to the parser', function(done) {    
    parser.on('message', function(message) {
      should.ok(message.segmentTypes.indexOf('MSH') !== -1, 'should contain the MSH segment')
      should.ok(message.segmentTypes.indexOf('PID') !== -1, 'should contain the MSH segment')
      should.ok(message.segmentTypes.indexOf('NK1') !== -1, 'should contain the MSH segment')
      should.ok(message.segmentTypes.indexOf('PV1') !== -1, 'should contain the MSH segment')
      
      done()
    })
    
    var test = path.join(__dirname, 'fixtures', 'test.hl7')    
    var contents = fs.readFileSync(test, 'utf8').split('\r')
    
    contents.forEach(function(piece) {
      parser.write(piece);
    });
  })
  
  it('should emit message twice if two messages are written to the parser', function(done) {    
    parser.on('message', function(message) {
      this.segmentCounts = (this.segmentCounts) ? this.segmentCounts :  {}
      this.messageCount = (this.messageCount) ? this.messageCount + 1 : 1
            
      message.segmentTypes.forEach(function(type) {
        this.segmentCounts[type] = (this.segmentCounts.hasOwnProperty(type) === false) ? 1 : this.segmentCounts[type] + 1
      }.bind(this))
      
      if (this.messageCount === 2) {
        should.equal(this.messageCount, 2)
        should.equal(this.segmentCounts.MSH, 2)
        should.equal(this.segmentCounts.PID, 2)
        should.equal(this.segmentCounts.NK1, 2)
        should.equal(this.segmentCounts.PV1, 2)
        
        done()
      }
    })
    
    var test = path.join(__dirname, 'fixtures', 'test.hl7')
    var test2 = path.join(__dirname, 'fixtures', 'test2.hl7')
    
    var contents = fs.readFileSync(test, 'utf8').split('\r')
    var contents2 = fs.readFileSync(test2, 'utf8').split('\r')
    
    contents.forEach(function(piece) {
      parser.write(piece);
    });
    
    contents2.forEach(function(piece) {
      parser.write(piece);
    });
  })
})

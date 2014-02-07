var should = require('should')
  , Message = require('../').Message

describe('Message', function() {
  it('should support using new', function() {
    var m = new Message()
    m.should.be.instanceOf(Message)
  })

  it('should support not using new', function() {
    var m = Message()
    m.should.be.instanceOf(Message)
  })
})

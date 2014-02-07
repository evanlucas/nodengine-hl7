var assert = require('assert'),
    example = require('../index');

describe('Basic Tests', function(){
    describe('#all()', function(){
        it('should equal 5', function(){
            example.all().should.equal(5);
        });
    });

    describe('#half()', function(){
        it('should equal 5', function(){
            example.half(5).should.equal(5);
        });
    });
});

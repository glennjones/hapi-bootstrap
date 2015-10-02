
var chai		= require('chai'),
	assert		= chai.assert,
	maths       = require('../lib/maths');

 
describe('maths', function(){

	it('basic addition', function(done){
		var result = 5 + 5;
		assert.equal(result, 10, '5 + 5 should = 10');
	});

});
const axios = require('axios');
const assert = chai.assert;
var i = 0;
function rpc(name, params){
	i++;
	return {
		jsonrpc:"2.0",
		id:i,
		method:name,
		params: params
	};
}
describe('json rpc server post', function () {
	it('call test method', function () {
		return axios.post('/jsonrpc', rpc("test", {}))
		.then(function (response) {
			assert.equal(10, response.data.result);
			return true; 
	 	})
	});
	it('call echo method', function () {
		return axios.post('/jsonrpc', rpc("echo", 123))
		.then(function (response) {
			assert.equal(123, response.data.result);
			return true; 
	 	})
	});
	it('call echo method batch ', function () {
		return axios.post('/jsonrpc', [rpc("echo", 321), rpc("test", {}), rpc("echo", {a:102})] )
		.then(function (response) {
			assert.equal(321, response.data[0].result);
			assert.equal(10,  response.data[1].result);
			assert.equal(102, response.data[2].result.a);
			return true; 
	 	})
	});
});
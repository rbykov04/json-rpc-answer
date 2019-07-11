var assert = require('chai').assert;

const jsonrpc = require('../index.js');


function next(){

}
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
function rpc_req(req){
	return {
		on:function(name, func){
			var data = Buffer.from(JSON.stringify(req))
			func(data);
		}
	}
}
function answer_get(){
	var resolve;
	var p = new Promise((res, reg) =>{
		resolve = res;
	});
	p.end = function(data){
		resolve(JSON.parse(data.toString()));
	}
	return p;
}
var middleware = jsonrpc.browser_sync_middleware('/jsonrpc', {
	test: function(params){
		return 10;
	},
	echo: function(params){
		return params;
	},
});
describe("jsonRpcServer", function() {

	it("call one method", function() {
		var res = answer_get();
		middleware.handle(rpc_req(rpc("echo", 123)), res ,next);
		return res.then(answer => {
			assert.equal(123, answer.result);
			return true;
		});
	});
	it("call unknow", function() {
		var res = answer_get();
		middleware.handle(rpc_req(rpc("echo1", 123)), res ,next);
		return res.then(answer => {
			assert.equal(-1, answer.result);
			return true;
		});
	});
	it("call batch ", function() {
		var res = answer_get();
		middleware.handle(rpc_req([rpc("echo", 123),  rpc("echo", 321)]), res ,next);
		return res.then(answer => {
			assert.equal(123, answer[0].result);
			assert.equal(321, answer[1].result);
			return true;
		});
	});

});
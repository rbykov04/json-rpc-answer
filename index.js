
function JsonRpcServer(methods){

	function handle(data, res){
		// console.log(data);
		var root = JSON.parse(data);

		function rpc_handler(req){
			// console.log("find " + req.method);
			var f = methods[req.method];
			if (!f){

				// console.log("method not found " + req.method);
				return {
					jsonrpc:"2.0",				
					id:req.id,
					result: -1
				};
			}

			// console.log("call " + req.method);
			var result = f(req.params);
			return {
				jsonrpc:"2.0",
				id:req.id,
				result: result
			};
		}
		if (Array.isArray(root)){
			var answer = [];
			root.forEach(req => answer.push(rpc_handler(req)));
			return Buffer.from(JSON.stringify(answer)) ;
		}
		res = rpc_handler(root);
		return Buffer.from(JSON.stringify(res)) ;
	}
	this.handle = handle;
}
module.exports.browser_sync_middleware = function (uri, methods){
	var server = new JsonRpcServer(methods);
	return {
		route: uri,
		handle: function (req, res, next) {
			req.on('data', function(data) {
				var answer = server.handle(data.toString(), res);
				res.end(answer);
			});
		}
	};
};

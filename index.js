
function JsonRpcServer(){
 	var methods ={
	};
	function handle(data, res){
		var root = JSON.parse(data);

		function rpc_handler(req){
			var f = methods[req.method];
			if (!f){
				return {
					jsonrpc:"2.0",				
					id:req.id,
					result: -1
				};
			}
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
	}
	this.handle = handle;
}
module.exports.JsonRpcAnswer =  JsonRpcServer;
module.exports.browser_sync_middleware = function (){
	var server = new JsonRpcServer();
	return {
		route: "/nbnform/jsonrpc",
		handle: function (req, res, next) {
			req.on('data', function(data) {
				var answer = server.handle(data.toString(), res);
				res.end(answer);
			});
		}
	};
};

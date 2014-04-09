var http = require('http');
var cache_manager = require('cache-manager');
var memory_cache = cache_manager.caching({store: 'memory', max: 100, ttl: 10 });

module.exports = {
	getInfo: function (username, req, res) {
		memory_cache.get('partha.mahajani', function(err, result) {
       		console.log("Cached result: " + result);
       		if (result) {
       			res.send(JSON.parse(result));
       		}
   		 });
    	var options = {
    		host : 'graph.facebook.com',
    		path : '/partha.mahajani',
    		method : 'GET'
  		}
  		var request = http.request(options, function(response) {
    		var body = ""
		    response.on('data', function(data) {
		    	body += data;
		    });
		    response.on('end', function() {
		    	memory_cache.set('partha.mahajani', body, function(err) {
    				if (err) { throw err; }
    				res.send(JSON.parse(body));
    			});
		    });
		});
		request.on('error', function(e) {
			console.log('Problem with request: ' + e.message);
		});
		request.end();
	}
};
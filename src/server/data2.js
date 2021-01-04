module.exports = function(qpp){
	api.get('/api/home',function(req,res){
		res.jsonp({name:'李四',age:11})
	})
	app.get('/api/list',function(req,res){
		res.jsonp({name:'张三',age:40})
	})
}
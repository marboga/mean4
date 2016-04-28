console.log('in config/routes.js')

var users = require('../controllers/users.js');
var buckets = require('../controllers/buckets.js');

module.exports = function(app){
	app.get('/users', function(req, res){
		console.log('getting all users, in server/routes')
		users.index(req, res)
	})
	app.get('/users/:id', function(req, res){
		console.log('getting one user, in server/routes')
		users.show(req, res)
	})
	app.post('/login', function(req, res){
		users.login(req, res)
	})
	app.post('/users/all', function(req, res){
		users.all(req, res)
	})
	app.post('/bucket/new', function(req, res){
		buckets.create(req, res)
	})
	app.get('/buckets/:id', function(req, res){
		console.log('in server routes')
		buckets.index(req, res)
	})
	app.post('/buckets/update', function(req, res){
		buckets.update(req, res)
	})



}
//RESTFUL syntax
//get all = index (/users) (get)
//get one = show (/users/:id)
//create = create (/users) (post)
//put/patch = update (/users/:id)
//delete = delete (/users/:id)

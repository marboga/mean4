console.log('in config/routes.js')

var models = require('../controllers/users.js'); // do this for each model

module.exports = function(app){
	app.get('/users', function(req, res){
		console.log('getting all users, in server/routes')
		users.index(req, res)
	})
	app.get('/users/:id', function(req, res){
		console.log('getting one user, in server/routes')
		users.show(req, res)
	})




}
//RESTFUL syntax
//get all = index (/users) (get)
//get one = show (/users/:id)
//create = create (/users) (post)
//put/patch = update (/users/:id)
//delete = delete (/users/:id)

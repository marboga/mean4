console.log('userFactory loaded');

MyApp.factory('userFactory', function($http){
	var factory = {}
	factory.user;


	factory.login = function(user, callback){
		console.log(user, "this is coming in to login factory");
		var newUser = {name: user}
		console.log('newUser', newUser)
		$http.post('/login', newUser).success(function(output){
			factory.user = output;
			console.log('factory user', factory.user)
			callback(factory.user);
		})
	}

	factory.index = function(callback){
		callback(factory.user);
	}

	factory.logout = function(){
		console.log('in factory, logging out')
		factory.user = undefined;
		$location.url('/');
	}

	factory.getAll = function(callback){
		$http.post('/users/all').success(function(output){
			factory.users = output;
			console.log('got all users from db')
			callback(factory.users)
		})
	}



	return factory;
})

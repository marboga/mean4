MyApp.config(function($routeProvider){

	$routeProvider

	.when('/', {
		templateUrl: './../views/login.html',
		controller: 'usersController'
	})

	.otherwise('/')
})

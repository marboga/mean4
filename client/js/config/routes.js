MyApp.config(function($routeProvider){

	$routeProvider

	.when('/', {
		templateUrl: './../views/index.html',
		controller: 'usersController'
	})
	.when('/dashboard', {
		templateUrl: './../views/dashboard.html',
		controller: 'bucketsController'
	})
	.when('/user/:id', {
		templateUrl: './../views/userpage.html',
		controller: 'pageController'
	})

	.otherwise('/')
})

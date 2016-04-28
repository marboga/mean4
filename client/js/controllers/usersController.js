console.log('usersController loaded');

MyApp.controller('usersController', function($scope, userFactory, bucketFactory, $location){
	$scope.currentuser = userFactory.user;
	console.log('current user: ', $scope.user)
	$scope.error = ""
	$scope.users = userFactory.users;
	$scope.buckets = bucketFactory.buckets;

	$scope.login = function(name){
		if (!name){
			$scope.error = "name is required."
			return false
		}
		if (name.length < 2){
			$scope.error = "name must be at least two characters."
			return false
		}
		console.log('login invoked, name ==', name)
		userFactory.login(name, function(data){
			if(!data.message){
				$scope.user = {name: data}
				$location.url('/dashboard')
			}
			if (data.message){
				$scope.error += data.message
				console.log(data.message)
				$location.url('/')
			}
		})
	}

	function getUser(){
		console.log('getuser invoked')
		userFactory.index(function(data){
			if (data !== undefined){
				$scope.user = data
			}
			if ($scope.user === undefined){
				$location.url('/')
			}
		})
	}
	getUser()

	function getAllUsers(){
		userFactory.getAll(function(data){
			if (data){
				$scope.users = data
			}
		})
	}
	console.log("all users==",$scope.users)
	getAllUsers()

	$scope.logout = function(){
		console.log('logging out')
		userFactory.logout(function(data){
			$scope.user = undefined
		})
	}

	$scope.createItem = function(user, new_item){
		console.log("trying to create new item",user, new_item)
		bucketFactory.create(user, new_item, function(data){
			console.log('bucket whoo')
		})
		getBuckets()
	}

	function getBuckets(){
		console.log('getting all the buckets for this user')
		var userid = $scope.currentuser._id
		console.log(userid)
		bucketFactory.getBuckets(userid, function(data){
			if (data){
				$scope.buckets = data
			}
		})
	}



})

console.log('bucketsController loaded')

MyApp.controller('bucketsController', function($scope, userFactory, bucketFactory, $location, $timeout){
	$scope.currentuser = userFactory.user;
	console.log('current user: ', $scope.user)
	$scope.error = ""
	$scope.users = userFactory.users;
	$scope.buckets = bucketFactory.buckets.bucket_items;

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
		console.log('retrieving all users')
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
			$location.url('/')
		})
	}

	function getBuckets(){
		console.log('getting all the buckets for this user')
		var userid = $scope.currentuser._id
		console.log("userID",userid)
		bucketFactory.getBuckets(userid, function(data){
			console.log('CAME BACK FROM SRVR buxx', data)
			if (data){
				$scope.buckets = data
				console.log("SCOPE BUCKETS", $scope.buckets.bucket_items)
			}
		})
	}
	getBuckets()

	$scope.createItem = function(user, new_item){
		if (!user){
			$scope.error += "please log in again"
		}
		if(!new_item){
			$scope.error += "all fields must be filled out."
			return false;
		}
		if(!new_item.title || !new_item.description){
			$scope.error += "all fields must be filled out."

		}
		if(new_item.title.length < 5){
			$scope.error += "title must be at least 5 chars"
			return false;
		}
		if(new_item.description.length < 10){
			$scope.error += 'description must be at least 10 chars'
			return false;
		}
		console.log("trying to create new item",user, new_item)
		bucketFactory.create(user, new_item, function(data){
			console.log('bucket whoo')
		})
		$timeout(getBuckets, 300)
	}

	$scope.toggleCompletion = function(id){
		console.log(id);
		bucketFactory.update($scope.currentuser, id, function(data){
			console.log('back here now')

		})
	}


})

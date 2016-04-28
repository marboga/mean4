console.log('pageController loaded')

MyApp.controller('pageController', function($scope, userFactory, bucketFactory, $location, $routeParams){
	$scope.currentuser = userFactory.user;
	console.log('current user: ', $scope.user)
	$scope.error = ""
	$scope.users = userFactory.users;
	$scope.pageUser = {};


	function getBucketOfPerson(){
		console.log('getting all the buckets for this user')
		var urlID = $routeParams.id
		console.log("urlID",urlID)
		bucketFactory.getBucketForPage(urlID, function(data){
			if (data){
				$scope.pageUser = data
				console.log("SCOPE pageuser BUCKETS", $scope.pageUser)
			}
		})
	}
	getBucketOfPerson()


















})

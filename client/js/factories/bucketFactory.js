console.log('bucketFactory loaded')

MyApp.factory('bucketFactory', function($http){
	var factory = {};
	factory.buckets = {};
	factory.pageUser = {}

	factory.create = function(incominguser, item, callback){
		item['_users'] = [incominguser, item.users]
		console.log(item)
		$http.post('/bucket/new', item).success(function(output){
			console.log('got back from factory, bucketparty', output)
			factory.buckets = output;
		})
	}

	factory.getBuckets = function(userid, callback){
		console.log("USER ID",userid)
		$http.get('/buckets/'+userid).success(function(output){
			factory.buckets = output;
			callback(factory.buckets)
		})
	}

	factory.getBucketForPage = function(urlID, callback){
		console.log("THIS ENGAGED")
		console.log("URL ID",urlID)
		$http.get('/buckets/'+urlID).success(function(output){
			factory.pageUser = output;
			callback(factory.pageUser)
		})
	}

	factory.update = function(user, id, callback){
		console.log('user', user, id, "id")
		var Updater = {user: user, drop: id}
		$http.post('/buckets/update', Updater).success(function(output){
			callback(output)
		})
	}

	return factory;
})

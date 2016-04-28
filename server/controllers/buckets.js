console.log('buckets controller loaded')

var mongoose = require('mongoose');
var Bucket = mongoose.model('Bucket')
var User = mongoose.model('User')


module.exports = {
	create: function(req, res){
		console.log("HERE IS REQ BODY HWILE CREATEING NEW BUCKET DROP",req.body)
		var bucket = new Bucket(req.body)
		bucket.save(function(err, bucket){
			if(err){
				console.log(err)
				res.json(err)
			}else{
				console.log('this is creator: ', req.body._users[0])
				User.findOne({_id: req.body._users[0]}, function(err, user){
					if (err){
						console.log(err)
						res.json(err)
					}else{
						console.log("creator:", user)
						user.bucket_items.push({_id: bucket._id})
						user.save(function(err){
							if(err){
								console.log(err)
								res.json(err)
							}else{
								if(req.body._users[1]){
									User.findOne({_id: req.body._users[1]}, function(err, user2){
										if(err){
											res.json(err)
										}else{
											user2.bucket_items.push({_id: bucket._id})
											user2.save(function(err){
												if (err){
													res.json(err)
												}else{
													console.log('did it all!!!')
													res.json(bucket)
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}
		})
	},

	index: function(req, res){
		console.log('in index fn', req.params.id)
		User.findOne({_id: req.params.id}).populate('bucket_items').exec( function(err, buckets){
			if (err){
				console.log(err)
				res.json(err)
			}else{
				console.log("buckets:",buckets)
				res.json(buckets)
			}
		})
	},

	update: function(req, res){
		console.log(req.body, "SERVER REQ BOD")
		Bucket.findOne({_id: req.body.drop}, function(err, bucket){
			if(err){
				console.log(err)
				res.json(err)
			}else{
				if (!bucket.completion){
					bucket.completion = true;
				}
				else{
					bucket.comletion = false;
				}
				bucket.save(function(err, bucketagain){
					if (err){
						console.log(err)
						res.json(err)
					}else{
						console.log(bucketagain)
						res.json(bucketagain)
					}
				})
			}
		})
	},

}

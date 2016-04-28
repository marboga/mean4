console.log('in bucket model')

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var BucketSchema = new mongoose.Schema({
	title: {type: String, required: true, minlength: 5},
	description: {type: String, required: true, minlength: 10},
	_users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	completion: {type: Boolean, default: false},
}, {timestamps: true})

mongoose.model('Bucket', BucketSchema);

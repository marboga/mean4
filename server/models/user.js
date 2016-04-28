console.log('user model loaded');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	bucket_items: [{type: Schema.Types.ObjectId, ref: 'Bucket'}]
}, {timestamps: true})

mongoose.model('User', UserSchema)

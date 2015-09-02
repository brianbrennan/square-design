//SETUP FOR THE PIC MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//------------Setting up the User Schema
var PicSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true
	},
	image: {
		type String,
		required: true
	}
});

//export the Model
module.exports = mongoose.model('User', UserSchema);
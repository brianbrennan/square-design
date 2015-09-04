//SETUP FOR THE PIC MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//------------Setting up the User Schema
var PicSchema = new Schema({
	author: String,
	email: {
		type: String,
		required: true,
		select: false
	},
	image: {
		type: String,
		required: true
	},
	visible: Boolean,
	likes: Number
});

//export the Model
module.exports = mongoose.model('Pic', PicSchema);
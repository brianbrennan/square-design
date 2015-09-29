//SETUP FOR THE PIC MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//------------Setting up the User Schema
var PicSchema = new Schema({
	author: String,
	email: {
		type: String,
		select: false,
		required: true
	},
	image: {
		type: Object,
		required:true
	},
	path: String,
	thumbnail: {
		type: Object
	},
	visible: Boolean,
	likes: Number
});

//export the Model
module.exports = mongoose.model('Pic', PicSchema);
//SETUP FOR THE USER MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//------------Setting up the User Schema
var UserSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true,
		select:false
	}
});

//------------Hashing Password Function

UserSchema.pre('save',function(next){
	var user = this;

	//hashing only if password has changed
	if(!user.isModified('password'))
		return next();

	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err)
			return next(err);

		user.password = hash;
		next();
	});
});

//------------User Schema Methods

UserSchema.methods.comparePassword = function(password){
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

//export the Model
module.exports = mongoose.model('User', UserSchema);
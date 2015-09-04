var User 		= require('../model/user'),
	Pic			= require('../model/pic'),
	jwt			= require('jsonwebtoken'),
	config		= require('../../config'),
	uberSecret 	= config.secret;

	//Authenticate route

module.exports = function(app, express){


	//Get instance of express router
	var userRouter = express.Router();

	userRouter.post('/authenticate',function(req, res){
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){
			if(err)
				throw err;

			if(!user){
				res.json({
					success:false,
					message: 'Authentication Failed: User not found'
				});
			} else if(user){

				var validPassword = user.comparePassword(req.body.password);

				console.log(user.password);

				if(!validPassword){
					res.json({
						success: false,
						message: 'Authentication Failed: Wrong Password'
					});
				} else {
					var token = jwt.sign({
						name: user.name,
						username: user.username
					}, uberSecret, {
						expiresInMinutes: 1440
					});

					res.json({
						success:true,
						message:'Token Sent',
						token:token
					});
				}
			}
		});
	});

	//API Router Middleware for authenticating Users
	userRouter.use(function(req, res, next){

		//check header for url parameters
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){

			jwt.verify(token, uberSecret, function(err, decoded){
				if(err){
					return res.status(403).send({
						success:false,
						message: 'Failed to authenticate token'
					});
				} else {
					req.decoded = decoded;

					next();
				}
			});
		} else {

			//if there is no token
			//return 403 code
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	});


	//USER ROUTES SET UP FOR API

	//get information for current user
	userRouter.get('/me', function(req, res){
			User.findOne({
				username: req.decoded.username
			}).exec(function(err, user){
				if(err)
					res.send(err);
				res.json(user);
			});
	});

	//routes for all of users in API
	userRouter.route('/')
		.post(function(req,res){//Command for creating a new User
			var user = new User();

			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.likes = [];

			user.save(function(err){
				if(err){
					if(err.code == 11000){
						return res.json({
							success: false,
							message: 'A User with that username already exists!'
						});
					}
					else
						return res.send(err);
				}

				res.json({
					message:'User Created!'
				});


			});
		})

		.get(function(req, res){//Command for getting all users

			User.find(function(err, users){
				if(err)
					res.send(err);

				res.json(users);
			});

		});

	//Routes for getting single user in API
	userRouter.route('/:user_id')
		.get(function(req,res){//Command for getting single user
			User.findById(req.params.user_id, function(err, user){
				if(err)
					res.send(err);

				res.json(user);
			});
		})

		.put(function(req, res){//Command for updating user
			User.findById(req.params.user_id, function(err, user){
				if(err)
					res.send(err);

				if(req.body.name)
					user.name = req.body.name;
				if(req.body.username)
					user.username = req.body.username;
				if(req.body.password)
					user.password = req.body.password;

				user.save(function(err){
					if(err)
						res.send(err);

					res.json({
						message: "User Updated!"
					});
				});
			});
		});

		// .delete(function(req,res){

		// 	User.findById(req.params.user_id, function(err, user){
		// 		console.log(user);
		// 		if(user.username == req.body.username && user.password == req.body.password){
		// 			User.remove({
		// 				_id: req.params.user_id
		// 			}, function(err, user){
		// 				if(err)
		// 					return res.send(err);

		// 				res.json({
		// 					message: 'Successfully Deleted'
		// 				});
		// 			});	
		// 		} else {
		// 			res.json({
		// 				message: 'Did not delete'
		// 			});
		// 		}
		// 	});
		// });

	userRouter.route('/addLike/:user_id/:pic_id')
		.put(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				user.likes.push(req.params.pic_id);

				user.save(function(err){
					if(err)
						res.send(err);

					res.json({
						message: "User Updated!"
					});
				});
			});
		});

	userRouter.route('/removeLike/:user_id/:pic_id')
		.put(function(req, res){
			User.findById(req.params.user_id, function(err, user){

				for(var i = 0; i > user.likes.length; i++;){
					if (user.likes[i] === req.params.pic_id) user.likes.splice(i, req.params.pic_id.length);
				}

				user.save(function(err){
					if(err)
						res.send(err);

					res.json({
						message: "Added Like!"
					});
				});
			});
		});

	return userRouter;
}
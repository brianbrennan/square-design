var User 		= require('../model/user'),
	jwt			= require('jsonwebtoken'),
	config		= require('../../config'),
	uberSecret 	= config.secret;



//Authenticate route

module.exports = function(app, express){


	//Get instance of express router
	var apiRouter = express.Router();

	apiRouter.post('/authenticate',function(req, res){
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
	apiRouter.use(function(req, res, next){

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

	//test route
	apiRouter.get('/',function(req,res){
		res.json({message:"api is active"});
	});


	//USER ROUTES SET UP FOR API

	//get information for current user
	apiRouter.get('/me', function(req, res){
		res.send(req.decoded);
	});

	//routes for all of users in API
	apiRouter.route('/users')
		.post(function(req,res){//Command for creating a new User
			var user = new User();

			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

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
	apiRouter.route('/users/:user_id')
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
		})

		.delete(function(req,res){
			User.remove({
				_id: req.params.user_id
			}, function(err, user){
				if(err)
					return res.send(err);

				res.json({
					message: 'Successfully Deleted'
				});
			});
		});
	return apiRouter;
}
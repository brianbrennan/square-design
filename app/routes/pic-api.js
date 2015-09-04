var Pic 		= require('../model/pic'),
	config		= require('../../config'),
	uberSecret 	= config.secret;

	//Authenticate route

module.exports = function(app, express){


	//Get instance of express router
	var picRouter = express.Router();

	picRouter.route('/')
		.get(function(req, res){
			Pic.find(function(err, pics){
				if(err)
					res.send(err);

				res.json(pics);
			});
		});

	return picRouter;
}
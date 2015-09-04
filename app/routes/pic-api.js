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
		})

		.post(function(req, res){
			var pic = new Pic();

			pic.author = req.body.author;
			pic.email = req.body.email;
			pic.image = req.body.image;
			pic.visible = false;
			pic.likes = 0;

			pic.save(function(err){
				if(err)
					return res.send(err);

				res.json({
					message:'Pic Uploaded!'
				});
			})

		});

	picRouter.route('/id/:pic_id')
		.get(function(req, res){
			Pic.findById(req.params.pic_id, function(err, pic){
				if(err)
					return res.send(err);

				res.json(pic);
			});
		})

	picRouter.route('/addLike/:pic_id')
		.put(function(req, res){
			Pic.findById(req.params.pic_id, function(err, pic){
				
				pic.likes++;
				pic.save(function(err){
					if(err)
						res.send(err);
					res.json({
						message: "Added Like to " + pic._id
					});
				});
			});
		});

	picRouter.route('/removeLike/:pic_id')
		.put(function(req, res){
			Pic.findById(req.params.pic_id, function(err, pic){
				
				pic.likes--;
				pic.save(function(err){
					if(err)
						res.send(err);
					res.json({
						message: "Added Like to " + pic._id
					});
				});
			});
		});

	return picRouter;
}
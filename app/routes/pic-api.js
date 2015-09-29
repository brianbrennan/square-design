var Pic 		= 	require('../model/pic'),
	config		= 	require('../../config'),
	cloudinary 	= 	require('cloudinary'),
	multer 		= 	require('multer'),
	upload 		= 	multer({dest: './uploads', inMemory: true}),
	uberSecret 	= 	config.secret;


//---------Cloudinary Configuration

cloudinary.config({ 
  cloud_name: 'bbrennan', 
  api_key: config.cloudinary_api_key, 
  api_secret: config.cloudinary_secret 
});

	//Authenticate route

module.exports = function(app, express){


	//Get instance of express router
	var picRouter = express.Router();

	picRouter.route('/')
		.get(function(req, res){
			Pic.find({visible: true}, function(err, pics){
				if(err)
					res.send(err);

				res.json(pics);
			});
		})

		.post( function(req, res){
			var pic = new Pic();

			pic.email = req.body.email;
			pic.visible = false;
			pic.likes = 0;

			cloudinary.uploader.upload(req.files.photo.path, function(result){

				pic.image = result;
				pic.path = result.secure_url;

				pic.thumbnail = cloudinary.url(result.secure_url,  {secure: true, width: 300, crop: 'scale' });

				pic.save(function(err){
					if(err)
						return res.send(err);
					res.sendFile('/public/index.html');
				});
			});
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
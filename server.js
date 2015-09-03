//ADDING PACKAGES TO EXPRESS APPLICATION

var express 			= require('express'),
	app 				= express(),
	bodyParser			= require('body-parser'),
	morgan				= require('morgan'),
	mongoose			= require('mongoose'),
	path				= require('path'),
	jwt					= require('jsonwebtoken'),
	User 				= require('./app/model/user'),
	config 				= require('./config'),
	cloudinary			= require('cloudinary'),
	apiRoutes			= require('./app/routes/api')(app, express);


//CONFIGURATION OF APPLICATION

//---------Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//---------Middleware for CORS requests

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With, \
Authorization');

	next();
});

//---------Log all requests to console

app.use(morgan('dev'));


//---------Set up Database Connection

mongoose.connect(config.database);

app.post('/registerUser', function(req, res) {
	var User = require('./app/model/user');
	var user = new User();      
	user.name = req.body.name;  
	user.username = req.body.username;
	user.password = req.body.password;

	user.save(function(err) {
		if (err) {
			if (err.code == 11000) 
				return res.json({ success: false, message: 'A user with that username already exists. '});
			else 
				return res.send(err);
		}
	});

	res.sendFile(__dirname + '/public/index.html');
});

app.use('/api',apiRoutes);
app.use(express.static(__dirname + '/public'));


//CATCHALL ROUTE FOR APPLICATION: MUST BE AFTER API ROUTES

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

//STARTING THE SERVER
app.listen(config.port);
console.log("Server Active at: http://localhost:" + config.port);
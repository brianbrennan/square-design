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
	nev					= require('email-verification'),
	userApiRoutes		= require('./app/routes/user-api')(app, express),
	picApiRoutes		= require('./app/routes/pic-api')(app, express);


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

//---------Cloudinary Configuration

cloudinary.config({ 
  cloud_name: 'bbrennan', 
  api_key: '252953896314781', 
  api_secret: 'u2LZWfNtORMaoyrvOBQlktk7rn8' 
});

//--------Email Verification Set Up

nev.configure({
    verificationURL: 'http://localhost:8080/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'tempusers',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'TheSiklops@gmail.com',
            pass: '!WebDesign13'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <TheSiklops@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
});

nev.generateTempUserModel(User);

//---------Set up Database Connection

mongoose.connect(config.database);

//---------Add Register User Route

app.post('/registerUser', function(req, res) {
	var User = require('./app/model/user');
	var newUser = User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		username: req.body.username,
        likes: []
	});

    newUser.save(function(err){
        if(err)
            res.send(err);
        res.json({message: "User Created!"});
    });
});

//--------Set Up API Routes

app.use('/api/users', userApiRoutes);
app.use('/api/pics', picApiRoutes);
app.use(express.static(__dirname + '/public'));




//CATCHALL ROUTE FOR APPLICATION: MUST BE AFTER API ROUTES

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

//STARTING THE SERVER
app.listen(config.port);
console.log("Server Active at: http://localhost:" + config.port);
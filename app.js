var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
var appEnv = cfenv.getAppEnv();
var watsonConversation = require('./src/integration/watsonConversation.js');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'inovationdaycognitive',
    resave: false,
    saveUninitialized: false
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');
//var mainRouter = require('./src/routes/mainRouter.js');
//to add other routers over here!

//app.use('/main', mainRouter);
//to register routes here!
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
    });
});

app.post('/askWatson', function(req, res) {
    console.log('here!!');
    console.log(req.body.message);
    watsonConversation.watsonConversationSendMessage(req.body.message, function (data){
      res.send({answer: data});
    });
  });

app.listen(appEnv.port, function (err) {
    console.log('listens on' + appEnv.url);
});

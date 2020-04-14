var express    = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(cookieSession({
	name: 'session',
	keys: ['niszx', 'xzsin']
}));
var http_port = process.env.PORT || 3000;
var server = app.listen(http_port, function(){
    console.log('Listening at http://127.0.0.1:' + http_port);    
});
app.use('/', express.static('public'));
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

var api_key = process.env.API_KEY;
var Client = require('node-rest-client').Client;
var client = new Client();
 
app.post('/send-notification', function(req, res){
    var args = {
        data: "title=Test&message=Test&url=https://katras.herokuapp.com",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization":"api_key=" + api_key}
    };
     
    client.post("https://api.pushalert.co/rest/v1/send", args, function (data, response) {
        // parsed response body as js object
        console.log(data.toString());
        // raw response
        // console.log(response);
    });
    res.send("Processing...");
});
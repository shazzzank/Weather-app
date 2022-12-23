const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.post('/', function(request, response){
	const cityName = request.body.cityName;
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName +
					 '&units=metric&APPID=db9410a2c441bdff13323e6203c8d469';
	https.get(url, function(res){
		res.on('data', function(data){
			const weatherData = JSON.parse(data);
			const weatherTemp = weatherData.main.temp;
			const weatherDesc = weatherData.weather[0].description;
			const weatherIcon = weatherData.weather[0].icon;
			const imageUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

			console.log(weatherTemp);
			console.log(weatherDesc);
			response.setHeader('Content-Type', 'text/html');
			response.write('<h1>Current weather in ' + cityName + ' is ' + weatherTemp + ' </h1>');
			response.write('<h2>Currently there is ' + weatherDesc + ' outside </h2>');
			response.write('<img src=' + imageUrl + ' alt="weather icon">');
			response.send();
		})
	});

});


app.listen(3000, function(){
	console.log('Server started at port 3000');
});



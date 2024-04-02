const express = require ('express');
const https = require('https');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req, res){
    res.sendFile(__dirname + "/index.html")
 
})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "ee9fc549b70bb5456acbb592df44f337"
    const unit = "metric"

    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"&lang=en", function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            console.log(temp);
            res.write("<h1>The temperature in "+ req.body.cityName +" is: " + temp +" degrees Celcius.</h1>");
            res.write("<h2> The weather is currently: " + weatherDescription + "</h2>");
            res.write("<img src ="  + iconUrl + " width='80' height='80'>")
            res.send();
        })
    });
})

app.listen(port,function(){
    console.log("server is running on port 3000.");
})

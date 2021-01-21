 const express = require("express");
 const bodyParser = require("body-parser");
 const https = require("https");
 const app = express();
 app.use(bodyParser.urlencoded({
     extended: true
 }))
 app.get("/", function (req, res) {
     res.sendFile(__dirname + "/index.html");
 })

 app.post("/", function (req, res) {
     console.log(req.body);
     var apiKey = "c4574fc672033c6e1077c06265af90fb";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&appid=" + apiKey + "&units=metric"
     https.get(url, function (response) {
         response.on("data", function (data) {
             const output = JSON.parse(data);
             res.write("<h1>The weather is " + output.weather[0].description + "</h1>");
             res.write("<p>The temperature " + output.main.temp + "C </p>");
             const imageUrl = "http://openweathermap.org/img/wn/" + output.weather[0].icon + "@2x.png";
             res.write("<img src=" + imageUrl + ">");
             res.send()
         })
     })
 })

 app.listen(3000, function () {
     console.log("server is running on 3000");
 })
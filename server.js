//setting up a server

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.static('Website'));

const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log(`The server is running locally on port:${port}`);
};
const projectData={};
const weatherData = [];

//POST ROUTE => app.js post data here and the callback function stores it at /add path
  /* "main":{
                "temp":306.15, //current temperature
                "pressure":1013,
                "humidity":44,
                "temp_min":306, //min current temperature in the city
                "temp_max":306 //max current temperature in the city
                }, */

app.post('/add', storeWeatherData);
function storeWeatherData(req, res){
    //console.log(req.body.name);
    newEntry = {
            temp: req.body.temp,
            pressure:req.body.pressure,
            humidity:req.body.humidity,
            temp_min:req.body.temp_min,
            temp_max:req.body.temp_max,
            name:req.body.name,
            visibility:req.body.visibility,
            timezone:req.body.timezone
    }        
    weatherData.push(newEntry);
    res.send(weatherData);
    //console.log(weatherData);
}

//GET ROUTE=> app.js get data from here

app.get('/get', getData)
function getData(req, res){
    //console.log(projectData)
    res.send(weatherData);
}

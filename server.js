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
const projectData={}


const weatherData = [];

//POST ROUTE

app.post('/add', storeWeatherData);


function storeWeatherData(req, res){
        newEntry = {
                temp: req.body.temp,
                pressure:req.body.pressure,
                humidity:req.body.humidity,
                temp_min:req.body.temp_min,
                temp_max:req.body.temp_max
        }

            /* "main":{
                "temp":306.15, //current temperature
                "pressure":1013,
                "humidity":44,
                "temp_min":306, //min current temperature in the city
                "temp_max":306 //max current temperature in the city
                }, */
        
    weatherData.push(newEntry);
    res.send(weatherData);
    console.log(weatherData);
}




//ALL ROUTE

app.get('/', getData)

function getData(req, res){
    res.send(weatherData);
}



/* app.post('/weatherData', function addData(req, res){
    data.push(req.body);
    console.log("data recived");
})
 */

const baseURL="http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&appid=e290b09f9a8816e3568a9e40b1fb9ef3&units=imperial";


document.getElementById('generate').addEventListener('click',generateZip);

function generateZip(){
    const zip=document.getElementById('zip').value;
    const url = baseURL+"zip="+zip+apiKey;
    getWeatherInfo(url)
    //after data recived from API then store data(post data) in server
    .then(function(data){
            console.log("hi Khushal");
            postData('/add',{ temp: data.temp,
                pressure:data.pressure,
                humidity:data.humidity,
                temp_min:data.temp_min,
                temp_max:data.temp_max,
                visibility:data.visibility,
                timezone:data.timezone,
                name:data.name       
            
            
            
            })  
                console.log("postData")      ;
    })
    .then (updateUI())
};

//Get weather information from weather api using url
const getWeatherInfo = async (url) =>{

    const res = await fetch(url)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error"+error);
    }
}

const postData = async (url = '' ,data ={}) =>{
    //console.log(data)
    const response = await fetch(url, {
        method:'POST',
        credientials:'same-origin',
        headers:{
            'Content-Type': 'application/json',        
        },
        body:JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
      catch(error) {
      console.log("error", error);
      }
  }

const updateUI = async() => {
    const request = await fetch('/');
    try{
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('pressure').innerHTML = allData[0].pressure;
        document.getElementById('temp-min').innerHTML = allData[0].temp_min;
        document.getElementById('temp-max').innerHTML = allData[0].temp_max;
        document.getElementById('humidity').innerHTML = allData[0].humidity;
        document.getElementById('visibility').innerHTML = allData[0].visibility;
        document.getElementById('timezone').innerHTML = allData[0].timezone;
        document.getElementById('name').innerHTML = allData[0].name;
    }
    catch(error){
            console.log("error",error);
    }
}

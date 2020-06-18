const baseURL="http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&appid=e290b09f9a8816e3568a9e40b1fb9ef3&units=imperial";

document.getElementById('generate').addEventListener('click',generateZip);


function generateZip(){
    const zip=document.getElementById('zip').value;
    const url = baseURL+"zip="+zip+apiKey;
    getWeatherInfo(url)
    //after data recived from API then store data(post data) in server
    .then(function(data){
            //console.log("hi Khushal");
            //console.log( data.name );
            document.getElementById('zip').value="";
            if(data.cod=="404"||data.message=="invalid zip code")
            
            {   document.getElementById('value').style.color="red";
                document.getElementById('temp').innerHTML ="Record Not Found!!!";
                document.getElementById('pressure').innerHTML ="Record Not Found!!!";
                document.getElementById('temp-min').innerHTML ="Record Not Found!!!";
                document.getElementById('temp-max').innerHTML ="Record Not Found!!!";
                document.getElementById('humidity').innerHTML ="Record Not Found!!!";
                document.getElementById('visibility').innerHTML ="Record Not Found!!!";
                document.getElementById('timezone').innerHTML ="Record Not Found!!!";
                document.getElementById('name').innerHTML ="Record Not Found!!!"; 
                //alert("City Not Found!!!");  
        }
            else{
                document.getElementById('value').style.color="royalblue";
                postData('/add',{   temp: data.main.temp,
                                    pressure:data.main.pressure,
                                    humidity:data.main.humidity,
                                    temp_min:data.main.temp_min,
                                    temp_max:data.main.temp_max,
                                    visibility:data.visibility,
                                    timezone:data.timezone,
                                    name:data.name         
            })
//after the above task get completed then updateUI function executes:
    .then (function(){
        updateUI()
    })}
    })
    
};

//Get weather information from weather api using url
const getWeatherInfo = async (url) =>{
    const res = await fetch(url)
    try{
        const data = await res.json();
        //console.log(data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }
}

//postData function defination:
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
        //console.log(newData);
        return newData;
    }
      catch(error) {
        alert("error"+error);
      }
  }

  //updateUI function defination:
const updateUI = async() => {
    const request = await fetch('get');
    try{
        const allData = await request.json();
        //console.log("updateUI working")
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
            alert("error"+error);
    }
}



var searchSubmit = $("#search-submit");
var searchFormEl = $("#search-form");
var pcUt = $("#pcUt");
var locationList = $('#locationList');


function getData(lat, lon, APIKey){

    var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey

    fetch(queryURL).
    then(function (response) {
        if (!response.ok) {
            console.log("bad response")
            alert('not a city')
            throw response.json()
        }
        return response.json()
    })
    .then(function (data){
        console.log(data)

        var tempK = data.current.temp;
        var tempF = Math.round(((tempK-273.15)*1.8)+32);
        var tempEl = $("#temp");
        tempEl.text('Temp: '+tempF + '°');
        
        var wind = Math.floor(data.current.wind_speed);
        var windEl = $('#wind');
        windEl.text('Wind: ' + wind + ' MPH');
        
        var humidity = data.current.humidity;
        var humidityEl = $('#humidity');
        humidityEl.text('Humidity: '+ humidity + '%')
        
        var uvi = data.current.uvi;
        var uviEl = $('#uv');
        uviEl.text('UV Index: ' + uvi)

        for(i = 1; i < 6; i ++){
            var dailyNum = i;
            
            var icon = data.daily[i].weather[0].icon;
            console.log(icon);
            var iconURL = 'http:openweathermap.org/img/w/'+icon+'.png';
            var iconEl = $('#'+i+'icon');

            var maxTemp = Math.floor((data.daily[i].temp.max-273.15)*1.8)+32;
            var minTemp = Math.floor((data.daily[i].temp.min-273.15)*1.8)+32;
            var temp = $("#"+i+"temp");
            temp.text('Temp: ' + maxTemp + "° / " + minTemp + '°');

            var wind_speed = Math.floor(data.daily[i].wind_speed);
            var wind = $('#'+i+'wind');
            wind.text("Wind: "+wind_speed+" MPH")
            
            var humidity = data.daily[i].humidity;
            var hum = $('#'+i+'hum');
            hum.text('Humidty: '+humidity+'%')
        }
    })
}


function getLatLon(city) {
    city.trim();
    
    var APIKey = 'bcfe542296f533b3e42b29e72545fb72'
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL).
        then(function (response) {
            if (!response.ok) {
                console.log("bad response")
                alert('not a city')
                throw response.json()
            }
            return response.json()
        })

        .then(function (data) {
            console.log(data)
            var lat = data.coord.lat;
            var lon = data.coord.lon;

           getData(lat, lon, APIKey)
        })
    }
    



function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = $("#search-input").val().trim();

    if (!searchInputVal) {
        alert("You need a search input value")
        console.error("You need a search input value")
        return
    };

    console.log(searchInputVal);

    var city = searchInputVal;
    console.log(city);
    
    getLatLon(city);
}




function listClick(event){
   var city = event.target.innerHTML;
    console.log(city)
   getLatLon(city)
}


locationList.on('click', listClick)
searchSubmit.on("submit", handleSearchFormSubmit);
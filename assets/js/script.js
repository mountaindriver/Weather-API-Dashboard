var searchSubmit = $("#search-submit");
var searchFormEl = $("#search-form");
var pcUt = $("#pcUt");


function getLatLon(city) {
    city.trim();
    
    var APIKey = 'bcfe542296f533b3e42b29e72545fb72'
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    console.log(queryURL)
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
            console.log('First API-----------')
            console.log(data);

            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat, lon);

           getData(lat, lon, APIKey)
        })
    }
    
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
        console.log('Second API-----------')
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
            var dailyNum = [i];
            console.log(dailyNum)
        
            // var maxTemp = data.daily.0;
            // var minTemp = data.daily.temp;

            // console.log (maxTemp)
        }
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


function pcUT() {
    var city = "park city";

    getLatLon(city)
}

pcUt.on("click", pcUT)
searchSubmit.on("submit", handleSearchFormSubmit);
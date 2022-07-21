var searchSubmit = $("#search-submit");
var searchFormEl = $("#search-form");
var pcUt = $("#pcUt");







function weatherSearch(city) {
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
            console.log(data)
        })
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = $("#search-input").val();

    if (!searchInputVal) {
        alert("You need a search input value")
        console.error("You need a search input value")
        return
    };

    console.log(searchInputVal);

    var city = searchInputVal;
    console.log(city);
    
    weatherSearch(city);
}


function pcUT() {
    var city = "park city";

    weatherSearch(city)
}

pcUt.on("click", pcUT)
searchSubmit.on("submit", handleSearchFormSubmit);
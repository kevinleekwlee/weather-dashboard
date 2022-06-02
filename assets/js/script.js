let citySearchHistory = $("#city-search-history");
let citiesArr = [];
let key = "fc0d32df4e392cc2267af7ef4a9992fc";

// Calls the variables for the current day forecast. 

let cityName = $("#cityName");
let temp = $("#temp");
let wind = $("#wind");
let humid = $("#humid");
let uv = $("#uv");

// Calls the variables for the future 5 days forecast. 

let futureD1 = $("#futureD1");
let futureD2 = $("#futureD2");
let futureD3 = $("#futureD3");
let futureD4 = $("#futureD4");
let futureD5 = $("#futureD5");

let futureTemp1 = $("#futureTemp1");
let futureTemp2 = $("#futureTemp2");
let futureTemp3 = $("#futureTemp3");
let futureTemp4 = $("#futureTemp4");
let futureTemp5 = $("#futureTemp5");

let futureWind1 = $("#futureWind1");
let futureWind2 = $("#futureWind2");
let futureWind3 = $("#futureWind3");
let futureWind4 = $("#futureWind4");
let futureWind5 = $("#futureWind5");

let futureHumid1 = $("#futureHumid1");
let futureHumid2 = $("#futureHumid2");
let futureHumid3 = $("#futureHumid3");
let futureHumid4 = $("#futureHumid4");
let futureHumid5 = $("#futureHumid5");

let icon1 = $("#icon1");
let icon2 = $("#icon2");
let icon3 = $("#icon3");
let icon4 = $("#icon4");
let icon5 = $("#icon5");

init();
displayDate();

// Displays the clock in the header that shows the current date and time. 

function displayDate() {
    setInterval(function() {
        var time = moment().format("MMM Do, YYYY, hh:mm:ss");
        $("#currentDay").text(time);        
    }, 1000);
}

// On page load, gets the key value pairs and calls the renderSearchHistory function.  

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities"));
    if (storedCities != null) {
        citiesArr = storedCities;
        renderSearchHistory();
    } else {
        return;
    }
}

// Stores the key value pairs to the local storage. 

function storeSearchHistory(){
    localStorage.setItem("searchedCities", JSON.stringify(citiesArr));
}

// Populates the search history into a viewable list. 

function renderSearchHistory() {
    citySearchHistory.empty();
    
    for (var i=0; i < citiesArr.length; i++) {
        let city = citiesArr[i];
        let li = $("<li>").text(city);

        li.attr("id","quickSearchCities")
        li.attr("data-city",city);
        li.attr("class","list-group-item");
        citySearchHistory.prepend(li);
    }    
}

// Event listener for the submit button. Calls functions with the value the user inputted in the textbox. 

$("#submitBtn").on("click",function(event){
    event.preventDefault();

    let city = $("#userInput").val().trim();

    if(city === ""){
        return;
    }

    citiesArr.push(city);

    storeSearchHistory();
    renderSearchHistory();
    clearTextInput();
    forecastWeather(city);
});

function clearTextInput() {
    $("input:text").val("");
}

// This API fetch populates the current forecast with the city name, temperature, wind speed, and humidity. 

function forecastWeather(cityInput){
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=metric&appid=" + key;

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          let cityNameValue = data.name;
          console.log(cityNameValue);
          let tempValue = data.main.temp;
          console.log(tempValue);
          let windValue = data.wind.speed;
          console.log(windValue);
          let humidValue = data.main.humidity;
          console.log(humidValue);

          cityName.text(cityNameValue);
          temp.text("Temp: " + tempValue + "°C");
          wind.text("Wind: " + windValue + " MPS");
          humid.text("Humidity: " + humidValue + "%");

          let coordLon = data.coord.lon;
          console.log(coordLon);
          let coordLat = data.coord.lat;
          console.log(coordLat);

          // This uses the weather API to extract the UV index fo the city. 

          let uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + key;

          fetch(uvUrl)
            .then(function (response){
                if (response.ok) {
                    console.log(response);
                    response.json().then(function(data){
                        console.log(data);
                        let uvValue = data.current.uvi;
                        console.log(uvValue);

                        uv.text("UV Index: " + uvValue);

                        // Changes the background colour behind the UV number depending on its level of severity. 

                        if(uvValue >= 0 && uvValue <= 2){
                            uv.attr("class","green")
                        } else if (uvValue > 2 && uvValue <= 5){
                            uv.attr("class","yellow")
                        } else if (uvValue > 5 && uvValue <= 7){
                            uv.attr("class","orange")
                        } else if (uvValue > 7 && uvValue <= 10){
                            uv.attr("class","red")
                        } else if (uvValue > 10){
                            uv.attr("class","purple")
                        }

                        let fiveUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + key + "&units=metric";

                        fetch(fiveUrl)
                            .then(function(response){
                                if (response.ok) {
                                    console.log(response);
                                    response.json().then(function(data){
                                        console.log(data);

                                        // Date for the next 5 days. 

                                        let futureD1Value = data.list[4].dt_txt.split(" ")[0];
                                        console.log(futureD1Value);
                                        futureD1.text(futureD1Value);

                                        let futureD2Value = data.list[12].dt_txt.split(" ")[0];
                                        console.log(futureD2Value);
                                        futureD2.text(futureD2Value);

                                        let futureD3Value = data.list[20].dt_txt.split(" ")[0];
                                        console.log(futureD3Value);
                                        futureD3.text(futureD3Value);

                                        let futureD4Value = data.list[28].dt_txt.split(" ")[0];
                                        console.log(futureD4Value);
                                        futureD4.text(futureD4Value);

                                        let futureD5Value = data.list[36].dt_txt.split(" ")[0];
                                        console.log(futureD5Value);
                                        futureD5.text(futureD5Value);

                                        // Temperature for each of the next 5 days. 

                                        let futureTemp1Value = data.list[4].main.temp;
                                        console.log(futureTemp1Value);
                                        futureTemp1.text("Temp: " + futureTemp1Value + "°C");

                                        let futureTemp2Value = data.list[12].main.temp;
                                        console.log(futureTemp2Value);
                                        futureTemp2.text("Temp: " + futureTemp2Value + "°C");

                                        let futureTemp3Value = data.list[20].main.temp;
                                        console.log(futureTemp3Value);
                                        futureTemp3.text("Temp: " + futureTemp3Value + "°C");

                                        let futureTemp4Value = data.list[28].main.temp;
                                        console.log(futureTemp4Value);
                                        futureTemp4.text("Temp: " + futureTemp4Value + "°C");

                                        let futureTemp5Value = data.list[36].main.temp;
                                        console.log(futureTemp5Value);
                                        futureTemp5.text("Temp: " + futureTemp5Value + "°C");

                                        // Wind speed for each of the next 5 days.

                                        let futureWind1Value = data.list[4].wind.speed;
                                        console.log(futureWind1Value);
                                        futureWind1.text("Wind: " + futureWind1Value + "MPS");

                                        let futureWind2Value = data.list[12].wind.speed;
                                        console.log(futureWind2Value);
                                        futureWind2.text("Wind: " + futureWind2Value + "MPS");

                                        let futureWind3Value = data.list[20].wind.speed;
                                        console.log(futureWind3Value);
                                        futureWind3.text("Wind: " + futureWind3Value + "MPS");

                                        let futureWind4Value = data.list[28].wind.speed;
                                        console.log(futureWind4Value);
                                        futureWind4.text("Wind: " + futureWind4Value + "MPS");

                                        let futureWind5Value = data.list[36].wind.speed;
                                        console.log(futureWind5Value);
                                        futureWind5.text("Wind: " + futureWind5Value + "MPS");

                                        // Humidity for each of the next 5 days.

                                        let futureHumid1Value = data.list[4].main.humidity;
                                        console.log(futureHumid1Value);
                                        futureHumid1.text("Humidity: " + futureHumid1Value + "%");

                                        let futureHumid2Value = data.list[12].main.humidity;
                                        console.log(futureHumid2Value);
                                        futureHumid2.text("Humidity: " + futureHumid2Value + "%");

                                        let futureHumid3Value = data.list[20].main.humidity;
                                        console.log(futureHumid3Value);
                                        futureHumid3.text("Humidity: " + futureHumid3Value + "%");

                                        let futureHumid4Value = data.list[28].main.humidity;
                                        console.log(futureHumid4Value);
                                        futureHumid4.text("Humidity: " + futureHumid4Value + "%");

                                        let futureHumid5Value = data.list[36].main.humidity;
                                        console.log(futureHumid5Value);
                                        futureHumid5.text("Humidity: " + futureHumid5Value + "%");

                                        // Add dynamic icons for each of the next 5 days. 

                                        let icon1Value = data.list[4].weather[0].icon;
                                        console.log(icon1Value);
                                        icon1.attr("src","http://openweathermap.org/img/wn/" + icon1Value + "@2x.png");

                                        let icon2Value = data.list[12].weather[0].icon;
                                        console.log(icon2Value);
                                        icon2.attr("src","http://openweathermap.org/img/wn/" + icon2Value + "@2x.png");

                                        let icon3Value = data.list[20].weather[0].icon;
                                        console.log(icon3Value);
                                        icon3.attr("src","http://openweathermap.org/img/wn/" + icon3Value + "@2x.png");

                                        let icon4Value = data.list[28].weather[0].icon;
                                        console.log(icon4Value);
                                        icon4.attr("src","http://openweathermap.org/img/wn/" + icon4Value + "@2x.png");

                                        let icon5Value = data.list[36].weather[0].icon;
                                        console.log(icon5Value);
                                        icon5.attr("src","http://openweathermap.org/img/wn/" + icon5Value + "@2x.png");
                                    })
                                }
                            })
                    })
                }
            })
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Could not connect to API');
    });
}

// Makes the search history list into clickable buttons that will immediately search when clicked. 

$(document).on("click", "#quickSearchCities", function(){
    let searchAgainCity = $(this).attr("data-city");
    forecastWeather(searchAgainCity);
})
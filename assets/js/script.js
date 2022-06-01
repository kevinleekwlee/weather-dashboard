let citySearchHistory = $("#city-search-history");
let citiesArr = [];
let key = "fc0d32df4e392cc2267af7ef4a9992fc";

let cityName = $("#cityName");
let temp = $("#temp");
let wind = $("#wind");
let humid = $("#humid");
let uv = $("#uv");

init();
displayDate();

function displayDate() {
    setInterval(function() {
        var time = moment().format("MMM Do, YYYY, hh:mm:ss");
        $("#currentDay").text(time);        
    }, 1000);
}

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities"));
    if (storedCities != null) {
        citiesArr = storedCities;
        renderSearchHistory();
    } else {
        return;
    }
}

function storeSearchHistory(){
    localStorage.setItem("searchedCities", JSON.stringify(citiesArr));
}

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
          //Add UV API 
          cityName.text(cityNameValue);
          temp.text(tempValue);
          wind.text(windValue);
          humid.text(humidValue);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Could not connect to API');
    });
}
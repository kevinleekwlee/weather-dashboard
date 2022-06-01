let citySearchHistory = $("#city-search-history");
let citiesArr = [];

init();

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
    console.log(cityInput);
}
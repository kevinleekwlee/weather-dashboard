let citySearchHistory = $("#city-search-history");
let citiesArr = [];

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities"));
    citiesArr = storedCities;

    renderSearchHistory();
}

function storeSearchHistory(){
    localStorage.setItem("searchedCities", JSON.stringify(citiesArr));
}

function renderSearchHistory() {
    for (var i=0; i < citiesArr.length; i++) {
        let city = citiesArr[i];
        let li = $("<li>").text(city);

        // List may need an id later
        li.attr("data-city",city);
        li.attr("class","list-group-item");
        citySearchHistory.prepend(li);
    }    

    $("#submitBtn").on("click",function(event){
        event.preventDefault();

        let city = $("#userInput").val().trim();

        citiesArr.push(city);

        console.log(citiesArr);
        console.log(event);

        storeSearchHistory();
        renderSearchHistory();
    });
}

init();
console.log(citiesArr);
console.log(citiesArr.length);
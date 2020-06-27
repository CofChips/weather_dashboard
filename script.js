$(document).ready(function () {

    var cityName = "";
    var listCities = [];
    var displayCity = $("#displayCity");
    var lat = "";
    var lon = "";
    var APIkey = "1f87a09bb72ee5eb76bdb96ee06f60f8";
    var forecastDate1 = $("#forecast1");
    var forecastDate2 = $("#forecast2");
    var forecastDate3 = $("#forecast3");
    var forecastDate4 = $("#forecast4");
    var forecastDate5 = $("#forecast5");

    var forecastDateAll = [forecastDate1, forecastDate2, forecastDate3, forecastDate4, forecastDate5];

    var forecastTemp1 = $("#temp1");
    var forecastTemp2 = $("#temp2");
    var forecastTemp3 = $("#temp3");
    var forecastTemp4 = $("#temp4");
    var forecastTemp5 = $("#temp5");

    var forecastTempAll = [forecastTemp1, forecastTemp2, forecastTemp3, forecastTemp4, forecastTemp5];

    var forecastHumid1 = $("#humidity1");
    var forecastHumid2 = $("#humidity2");
    var forecastHumid3 = $("#humidity3");
    var forecastHumid4 = $("#humidity4");
    var forecastHumid5 = $("#humidity5");

    var forecastHumidAll = [forecastHumid1, forecastHumid2, forecastHumid3, forecastHumid4, forecastHumid5];

    var forecastIcon1 = $("#iconDisplay1");
    var forecastIcon2 = $("#iconDisplay2");
    var forecastIcon3 = $("#iconDisplay3");
    var forecastIcon4 = $("#iconDisplay4");
    var forecastIcon5 = $("#iconDisplay5");

    var forecastIconAll = [forecastIcon1, forecastIcon2, forecastIcon3, forecastIcon4, forecastIcon5];

    var newCity = [];

    var integer15 = [1, 2, 3, 4, 5];
    var integer04 = [0, 1, 2, 3, 4];

    init();

    // populates cities buttons with localStorage if there are values
    function init() {
        var storedCities = JSON.parse(localStorage.getItem("cityList"));
        if (storedCities !== null) {
            newCity = storedCities;
        }
        repopulateCityList();
    }

    $("#buttonCitySearch").on("click",
        function populateTop(event) {
            event.preventDefault();
            cityName = $("#cityFormInput").val().trim();

            console.log(cityName);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid="+APIkey


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);


                var name = response.name;
                var icon = response.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                $("#iconDisplay").attr("src", iconURL);
                var windSpeed = response.wind.speed;
                $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
                var humidity = response.main.humidity;
                $("#humidityDisplay").text("Humidity: " + humidity + "%")
                var temperature = response.main.temp;
                $("#tempDisplay").text("Temperature: " + temperature + "\xB0" + "F")
                lat = response.coord.lat;
                lon = response.coord.lon;
                console.log("lat: " + lat);
                console.log("lon: " + lon);
                var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&" +
                    "exclude=minutely,hourly&units=imperial&appid="+APIkey;
                $.ajax({
                    url: query2URL,
                    method: "GET"
                }).then(function (response) {
                    console.log("all in one: " + JSON.stringify(response));
                    console.log("uvi: " + response.current.uvi)
                    var uvi = response.current.uvi;
                    var uviDisplay = $("<div>");
                    uviDisplay.text(uvi);
                    uviDisplay.addClass("text-center");
                    if (uvi < 3) {
                        uviDisplay.attr("style", "background-color:green;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if (uvi >= 3 && uvi < 6) {
                        uviDisplay.attr("style", "background-color:yellow;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: blue;");
                    }
                    else if (uvi >= 6 && uvi < 8) {
                        uviDisplay.attr("style", "background-color:orange;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if (uvi >= 8 && uvi < 11) {
                        uviDisplay.attr("style", "background-color:red;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else {
                        uviDisplay.attr("style", "background-color:purple;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    $("#todayWeather").append(uviDisplay)
                    // today
                    var timestampInMilliSecondsToday = response.current.dt * 1000;
                    var dateToday = new Date(timestampInMilliSecondsToday);
                    var formattedYearToday = dateToday.getFullYear();
                    var formattedDayToday = dateToday.getDate();
                    var formattedMonthToday = dateToday.getMonth();
                    var formattedFullToday = formattedMonthToday + 1 + "/" + formattedDayToday + "/" + formattedYearToday;
                    displayCity.text(name + " (" + formattedFullToday + ")");

                    // This generates forecast dates
                    var timestampInMilliSecondsAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].dt * 1000
                        timestampInMilliSecondsAll.push(num);
                    }
                    console.log(timestampInMilliSecondsAll)

                    var dateAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = new Date(timestampInMilliSecondsAll[i]);
                        dateAll.push(num);
                    }
                    console.log(dateAll);

                    var formattedYearAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getFullYear();
                        formattedYearAll.push(num);
                    }
                    console.log(formattedYearAll);

                    var formattedDayAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getDate();
                        formattedDayAll.push(num);
                    }
                    console.log(formattedDayAll);

                    var formattedMonthAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getMonth() + 1;
                        formattedMonthAll.push(num);
                    }
                    console.log(formattedMonthAll);

                    var formattedFullAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = formattedMonthAll[i] + "/" + formattedDayAll[i] + "/" + formattedYearAll[i];
                        formattedFullAll.push(num);
                    }
                    console.log(formattedFullAll);

                    // This generates forecast temp

                    var tempAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].temp.day;
                        tempAll.push(num);
                    }
                    console.log(tempAll);

                    // This generates forecast humidity

                    var humidAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].humidity;
                        humidAll.push(num);
                    }
                    console.log("humidity: " + humidAll);

                    // this generates forecast icons

                    var iconAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].weather[0].icon;
                        iconAll.push(num);
                    }
                    console.log("icons: " + iconAll);

                    var iconURLAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = "https://openweathermap.org/img/wn/" + iconAll[i] + "@2x.png";
                        iconURLAll.push(num);
                    }
                    console.log("icon URLs: " + iconURLAll);

                    // This adds new cities to the list
                    var addCity = $("<li>");
                    if (!newCity.includes(name)) {
                        addCity.text(name);
                        addCity.attr("data-value", name);
                        addCity.attr("id", "button" + name);
                        addCity.addClass("list-group-item newCity");
                        $("#savedCities").prepend(addCity);
                        newCity.push(name);
                        localStorage.setItem("cityList", JSON.stringify(newCity));
                        console.log(newCity);
                    }

                    // This populates data for the forecast - API data sometimes shows first forecast day as the current day
                    if (formattedFullToday === formattedFullAll[0]) {
                        for (var i = 0; i < 5; i++) {
                            forecastDateAll[i].text(formattedFullAll[i + 1])
                            forecastTempAll[i].text("Temperature: " + tempAll[i + 1] + "\xB0" + "F")
                            forecastHumidAll[i].text("Humidity: " + humidAll[i + 1] + "%")
                            forecastIconAll[i].attr("src", iconURLAll[i + 1])
                        }

                    }
                    else {
                        for (var i = 0; i < 5; i++) {
                            forecastDateAll[i].text(formattedFullAll[i])
                            forecastTempAll[i].text("Temperature: " + tempAll[i] + "\xB0" + "F")
                            forecastHumidAll[i].text("Humidity: " + humidAll[i] + "%")
                            forecastIconAll[i].attr("src", iconURLAll[i])
                        }
                    }



                    console.log(query2URL);
                })
            })
        })

    function repopulateCityList() {
        for (var i = 0; i < newCity.length; i++) {
            var currentIndex = newCity[i];
            var li = $("<li>");
            li.text(newCity[i]);
            li.addClass("list-group-item newCity");
            li.attr("data-value", newCity[i]);
            $("#savedCities").append(li);
        }
    }

    function loadCity(event) {
        var target = $(event.target);
        if (target.is("li")) {

            cityName = $(this).attr("data-value");

            console.log("city button city: " + cityName);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid="+APIkey


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                var name = response.name;
                var icon = response.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                $("#iconDisplay").attr("src", iconURL);
                var windSpeed = response.wind.speed;
                $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
                var humidity = response.main.humidity;
                $("#humidityDisplay").text("Humidity: " + humidity + "%")
                var temperature = response.main.temp;
                $("#tempDisplay").text("Temperature: " + temperature + "\xB0" + "F")
                lat = response.coord.lat;
                lon = response.coord.lon;
                console.log("lat: " + lat);
                console.log("lon: " + lon);
                var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&" +
                    "exclude=minutely,hourly&units=imperial&appid="+APIkey;
                $.ajax({
                    url: query2URL,
                    method: "GET"
                }).then(function (response) {
                    console.log("all in one: " + JSON.stringify(response));
                    console.log("uvi: " + response.current.uvi)
                    var uvi = response.current.uvi;
                    var uviDisplay = $("<div>");
                    uviDisplay.text(uvi);
                    uviDisplay.addClass("text-center");
                    if (uvi < 3) {
                        uviDisplay.attr("style", "background-color:green;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if (uvi >= 3 && uvi < 6) {
                        uviDisplay.attr("style", "background-color:yellow;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: blue;");
                    }
                    else if (uvi >= 6 && uvi < 8) {
                        uviDisplay.attr("style", "background-color:orange;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if (uvi >= 8 && uvi < 11) {
                        uviDisplay.attr("style", "background-color:red;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else {
                        uviDisplay.attr("style", "background-color:purple;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    $("#todayWeather").append(uviDisplay)
                    // today
                    var timestampInMilliSecondsToday = response.current.dt * 1000;
                    var dateToday = new Date(timestampInMilliSecondsToday);
                    var formattedYearToday = dateToday.getFullYear();
                    var formattedDayToday = dateToday.getDate();
                    var formattedMonthToday = dateToday.getMonth();
                    var formattedFullToday = formattedMonthToday + 1 + "/" + formattedDayToday + "/" + formattedYearToday;
                    displayCity.text(name + " (" + formattedFullToday + ")");

                    // This generates forecast dates
                    var timestampInMilliSecondsAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].dt * 1000
                        timestampInMilliSecondsAll.push(num);
                    }
                    console.log(timestampInMilliSecondsAll)

                    var dateAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = new Date(timestampInMilliSecondsAll[i]);
                        dateAll.push(num);
                    }
                    console.log(dateAll);

                    var formattedYearAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getFullYear();
                        formattedYearAll.push(num);
                    }
                    console.log(formattedYearAll);

                    var formattedDayAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getDate();
                        formattedDayAll.push(num);
                    }
                    console.log(formattedDayAll);

                    var formattedMonthAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = dateAll[i].getMonth() + 1;
                        formattedMonthAll.push(num);
                    }
                    console.log(formattedMonthAll);

                    var formattedFullAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = formattedMonthAll[i] + "/" + formattedDayAll[i] + "/" + formattedYearAll[i];
                        formattedFullAll.push(num);
                    }
                    console.log(formattedFullAll);

                    // This generates forecast temp

                    var tempAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].temp.day;
                        tempAll.push(num);
                    }
                    console.log(tempAll);

                    // This generates forecast humidity

                    var humidAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].humidity;
                        humidAll.push(num);
                    }
                    console.log("humidity: " + humidAll);

                    // This generates forecast icons

                    var iconAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = response.daily[i].weather[0].icon;
                        iconAll.push(num);
                    }
                    console.log("icons: " + iconAll);

                    var iconURLAll = [];
                    for (var i = 0; i < 6; i++) {
                        var num = "https://openweathermap.org/img/wn/" + iconAll[i] + "@2x.png";
                        iconURLAll.push(num);
                    }
                    console.log("icon URLs: " + iconURLAll);

                    // This populates data for the forecast - API data sometimes shows first forecast day as the current day
                    if (formattedFullToday === formattedFullAll[0]) {
                        for (var i = 0; i < 5; i++) {
                            forecastDateAll[i].text(formattedFullAll[i + 1])
                            forecastTempAll[i].text("Temperature: " + tempAll[i + 1] + "\xB0" + "F")
                            forecastHumidAll[i].text("Humidity: " + humidAll[i + 1] + "%")
                            forecastIconAll[i].attr("src", iconURLAll[i + 1])
                        }

                    }
                    else {
                        for (var i = 0; i < 5; i++) {
                            forecastDateAll[i].text(formattedFullAll[i])
                            forecastTempAll[i].text("Temperature: " + tempAll[i] + "\xB0" + "F")
                            forecastHumidAll[i].text("Humidity: " + humidAll[i] + "%")
                            forecastIconAll[i].attr("src", iconURLAll[i])
                        }
                    }
                    
                    console.log(query2URL);
                })
            })
        }
    }
    $(document).on("click", ".newCity", loadCity);



})
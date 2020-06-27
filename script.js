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
    var forecastTemp1 = $("#temp1");
    var forecastTemp2 = $("#temp2");
    var forecastTemp3 = $("#temp3");
    var forecastTemp4 = $("#temp4");
    var forecastTemp5 = $("#temp5");
    var forecastHumid1 = $("#humidity1");
    var forecastHumid2 = $("#humidity2");
    var forecastHumid3 = $("#humidity3");
    var forecastHumid4 = $("#humidity4");
    var forecastHumid5 = $("#humidity5");
    var forecastIcon1 = $("#iconDisplay1");
    var forecastIcon2 = $("#iconDisplay2");
    var forecastIcon3 = $("#iconDisplay3");
    var forecastIcon4 = $("#iconDisplay4");
    var forecastIcon5 = $("#iconDisplay5");
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
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4"


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#buttonCitySearch").clear();

                var name = response.name;
                var icon = response.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
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
                    "exclude=minutely,hourly&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4";
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
                    // uviDisplay.attr("style","width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;")
                    if(uvi < 3){
                        uviDisplay.attr("style","background-color:green;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if(uvi >=3 && uvi <6){
                        uviDisplay.attr("style","background-color:yellow;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: blue;");
                    }
                    else if(uvi >=6 && uvi <8){
                        uviDisplay.attr("style","background-color:orange;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if(uvi >=8 && uvi <11){
                        uviDisplay.attr("style","background-color:red;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else{
                        uviDisplay.attr("style","background-color:purple;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    $("#todayWeather").append(uviDisplay)

                    // today
                    var timestampInMilliSeconds = response.current.dt * 1000;
                    var date = new Date(timestampInMilliSeconds);
                    var formattedYear = date.getFullYear();
                    var formattedDay = date.getDate();
                    var formattedMonth = date.getMonth();
                    var formattedFull = formattedMonth + 1 + "/" + formattedDay + "/" + formattedYear;
                    displayCity.text(name + " (" + formattedFull + ")");
                    // forecast [0]
                    var timestampInMilliSeconds0 = response.daily[0].dt * 1000;
                    var date0 = new Date(timestampInMilliSeconds0);
                    var formattedYear0 = date0.getFullYear()
                    var formattedDay0 = date0.getDate();
                    var formattedMonth0 = date0.getMonth();
                    var formattedFull0 = formattedMonth0 + 1 + "/" + formattedDay0 + "/" + formattedYear0;
                    var temp0 = response.daily[0].temp.day;
                    var humid0 = response.daily[0].humidity;
                    var icon0 = response.daily[0].weather[0].icon;
                    console.log("icon0: " + icon0)
                    var iconURL0 = "http://openweathermap.org/img/wn/" + icon0 + "@2x.png"
                    console.log("forecast 0: " + formattedFull0);
                    // forecast [1]
                    var timestampInMilliSeconds1 = response.daily[1].dt * 1000;
                    var date1 = new Date(timestampInMilliSeconds1);
                    var formattedYear1 = date1.getFullYear()
                    var formattedDay1 = date1.getDate();
                    var formattedMonth1 = date1.getMonth();
                    var formattedFull1 = formattedMonth1 + 1 + "/" + formattedDay1 + "/" + formattedYear1;
                    var temp1 = response.daily[1].temp.day;
                    var humid1 = response.daily[1].humidity;
                    console.log("forecast 1: " + formattedFull1);
                    var icon1 = response.daily[1].weather[0].icon;
                    var iconURL1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png"
                    // forecast [2]
                    var timestampInMilliSeconds2 = response.daily[2].dt * 1000;
                    var date2 = new Date(timestampInMilliSeconds2);
                    var formattedYear2 = date2.getFullYear()
                    var formattedDay2 = date2.getDate();
                    var formattedMonth2 = date2.getMonth();
                    var formattedFull2 = formattedMonth2 + 1 + "/" + formattedDay2 + "/" + formattedYear2;
                    var temp2 = response.daily[2].temp.day;
                    var humid2 = response.daily[2].humidity;
                    console.log("forecast 2: " + formattedFull2);
                    var icon2 = response.daily[2].weather[0].icon;
                    var iconURL2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png"
                    // forecast [3]
                    var timestampInMilliSeconds3 = response.daily[3].dt * 1000;
                    var date3 = new Date(timestampInMilliSeconds3);
                    var formattedYear3 = date3.getFullYear()
                    var formattedDay3 = date3.getDate();
                    var formattedMonth3 = date3.getMonth();
                    var formattedFull3 = formattedMonth3 + 1 + "/" + formattedDay3 + "/" + formattedYear3;
                    var temp3 = response.daily[3].temp.day;
                    var humid3 = response.daily[3].humidity;
                    console.log("forecast 3: " + formattedFull3);
                    var icon3 = response.daily[3].weather[0].icon;
                    var iconURL3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png"
                    // forecast [4]
                    var timestampInMilliSeconds4 = response.daily[4].dt * 1000;
                    var date4 = new Date(timestampInMilliSeconds4);
                    var formattedYear4 = date4.getFullYear()
                    var formattedDay4 = date4.getDate();
                    var formattedMonth4 = date4.getMonth();
                    var formattedFull4 = formattedMonth4 + 1 + "/" + formattedDay4 + "/" + formattedYear4;
                    var temp4 = response.daily[4].temp.day;
                    var humid4 = response.daily[4].humidity;
                    console.log("forecast 4: " + formattedFull4);
                    var icon4 = response.daily[4].weather[0].icon;
                    var iconURL4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png"
                    // forecast [5]
                    var timestampInMilliSeconds5 = response.daily[5].dt * 1000;
                    var date5 = new Date(timestampInMilliSeconds5);
                    var formattedYear5 = date5.getFullYear()
                    var formattedDay5 = date5.getDate();
                    var formattedMonth5 = date5.getMonth();
                    var formattedFull5 = formattedMonth5 + 1 + "/" + formattedDay5 + "/" + formattedYear5;
                    var temp5 = response.daily[5].temp.day;
                    var humid5 = response.daily[5].humidity;
                    console.log("forecast 5: " + formattedFull5);
                    var icon5 = response.daily[5].weather[0].icon;
                    var iconURL5 = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png"
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
   
                    if (formattedFull === formattedFull0) {
                        forecastDate1.text(formattedFull1);
                        forecastDate2.text(formattedFull2);
                        forecastDate3.text(formattedFull3);
                        forecastDate4.text(formattedFull4);
                        forecastDate5.text(formattedFull5);
                        forecastTemp1.text("Temperature: " + temp1 + "\xB0" + "F");
                        forecastTemp2.text("Temperature: " + temp2 + "\xB0" + "F");
                        forecastTemp3.text("Temperature: " + temp3 + "\xB0" + "F");
                        forecastTemp4.text("Temperature: " + temp4 + "\xB0" + "F");
                        forecastTemp5.text("Temperature: " + temp5 + "\xB0" + "F");
                        forecastHumid1.text("Humidity: " + humid1 + "%");
                        forecastHumid2.text("Humidity: " + humid2 + "%");
                        forecastHumid3.text("Humidity: " + humid3 + "%");
                        forecastHumid4.text("Humidity: " + humid4 + "%");
                        forecastHumid5.text("Humidity: " + humid5 + "%");
                        forecastIcon1.attr("src", iconURL1)
                        forecastIcon2.attr("src", iconURL2)
                        forecastIcon3.attr("src", iconURL3)
                        forecastIcon4.attr("src", iconURL4)
                        forecastIcon5.attr("src", iconURL5)
                    }
                    else {
                        forecastDate1.text(formattedFull0);
                        forecastDate2.text(formattedFull1);
                        forecastDate3.text(formattedFull2);
                        forecastDate4.text(formattedFull3);
                        forecastDate5.text(formattedFull4);
                        forecastTemp5.text("Temperature: " + temp0 + "\xB0" + "F");
                        forecastTemp1.text("Temperature: " + temp1 + "\xB0" + "F");
                        forecastTemp2.text("Temperature: " + temp2 + "\xB0" + "F");
                        forecastTemp3.text("Temperature: " + temp3 + "\xB0" + "F");
                        forecastTemp4.text("Temperature: " + temp4 + "\xB0" + "F");
                        forecastHumid5.text("Humidity: " + humid0 + "%");
                        forecastHumid1.text("Humidity: " + humid1 + "%");
                        forecastHumid2.text("Humidity: " + humid2 + "%");
                        forecastHumid3.text("Humidity: " + humid3 + "%");
                        forecastHumid4.text("Humidity: " + humid4 + "%");
                        forecastIcon1.attr("src", iconURL0)
                        forecastIcon2.attr("src", iconURL1)
                        forecastIcon3.attr("src", iconURL2)
                        forecastIcon4.attr("src", iconURL3)
                        forecastIcon5.attr("src", iconURL4)
                    }



                    // $("#forecast ").text(formattedFull));


                    console.log(query2URL);
                })
            })
        })

        function repopulateCityList() {
            // $("#savedCities").HTML("");
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
        var target = $( event.target );
        if (target.is("li")) {
            
            cityName = $(this).attr("data-value");

            console.log("city button city: "+cityName);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4"


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                var name = response.name;
                var icon = response.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
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
                    "exclude=minutely,hourly&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4";
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
                    // uviDisplay.attr("style","width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;")
                    if(uvi < 3){
                        uviDisplay.attr("style","background-color:green;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if(uvi >=3 && uvi <6){
                        uviDisplay.attr("style","background-color:yellow;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: blue;");
                    }
                    else if(uvi >=6 && uvi <8){
                        uviDisplay.attr("style","background-color:orange;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else if(uvi >=8 && uvi <11){
                        uviDisplay.attr("style","background-color:red;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    else{
                        uviDisplay.attr("style","background-color:purple;width: 43px; height: 22px; position: absolute; bottom: 11%; left: 7.5%; color: white;");
                    }
                    $("#todayWeather").append(uviDisplay)
                    // $("#uviDisplay").text(uvi);
                    // today
                    var timestampInMilliSeconds = response.current.dt * 1000;
                    var date = new Date(timestampInMilliSeconds);
                    var formattedYear = date.getFullYear();
                    var formattedDay = date.getDate();
                    var formattedMonth = date.getMonth();
                    var formattedFull = formattedMonth + 1 + "/" + formattedDay + "/" + formattedYear;
                    displayCity.text(name + " (" + formattedFull + ")");
                    // forecast [0]
                    var timestampInMilliSeconds0 = response.daily[0].dt * 1000;
                    var date0 = new Date(timestampInMilliSeconds0);
                    var formattedYear0 = date0.getFullYear()
                    var formattedDay0 = date0.getDate();
                    var formattedMonth0 = date0.getMonth();
                    var formattedFull0 = formattedMonth0 + 1 + "/" + formattedDay0 + "/" + formattedYear0;
                    var temp0 = response.daily[0].temp.day;
                    var humid0 = response.daily[0].humidity;
                    var icon0 = response.daily[0].weather[0].icon;
                    console.log("icon0: " + icon0)
                    var iconURL0 = "http://openweathermap.org/img/wn/" + icon0 + "@2x.png"
                    console.log("forecast 0: " + formattedFull0);
                    // forecast [1]
                    var timestampInMilliSeconds1 = response.daily[1].dt * 1000;
                    var date1 = new Date(timestampInMilliSeconds1);
                    var formattedYear1 = date1.getFullYear()
                    var formattedDay1 = date1.getDate();
                    var formattedMonth1 = date1.getMonth();
                    var formattedFull1 = formattedMonth1 + 1 + "/" + formattedDay1 + "/" + formattedYear1;
                    var temp1 = response.daily[1].temp.day;
                    var humid1 = response.daily[1].humidity;
                    console.log("forecast 1: " + formattedFull1);
                    var icon1 = response.daily[1].weather[0].icon;
                    var iconURL1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png"
                    // forecast [2]
                    var timestampInMilliSeconds2 = response.daily[2].dt * 1000;
                    var date2 = new Date(timestampInMilliSeconds2);
                    var formattedYear2 = date2.getFullYear()
                    var formattedDay2 = date2.getDate();
                    var formattedMonth2 = date2.getMonth();
                    var formattedFull2 = formattedMonth2 + 1 + "/" + formattedDay2 + "/" + formattedYear2;
                    var temp2 = response.daily[2].temp.day;
                    var humid2 = response.daily[2].humidity;
                    console.log("forecast 2: " + formattedFull2);
                    var icon2 = response.daily[2].weather[0].icon;
                    var iconURL2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png"
                    // forecast [3]
                    var timestampInMilliSeconds3 = response.daily[3].dt * 1000;
                    var date3 = new Date(timestampInMilliSeconds3);
                    var formattedYear3 = date3.getFullYear()
                    var formattedDay3 = date3.getDate();
                    var formattedMonth3 = date3.getMonth();
                    var formattedFull3 = formattedMonth3 + 1 + "/" + formattedDay3 + "/" + formattedYear3;
                    var temp3 = response.daily[3].temp.day;
                    var humid3 = response.daily[3].humidity;
                    console.log("forecast 3: " + formattedFull3);
                    var icon3 = response.daily[3].weather[0].icon;
                    var iconURL3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png"
                    // forecast [4]
                    var timestampInMilliSeconds4 = response.daily[4].dt * 1000;
                    var date4 = new Date(timestampInMilliSeconds4);
                    var formattedYear4 = date4.getFullYear()
                    var formattedDay4 = date4.getDate();
                    var formattedMonth4 = date4.getMonth();
                    var formattedFull4 = formattedMonth4 + 1 + "/" + formattedDay4 + "/" + formattedYear4;
                    var temp4 = response.daily[4].temp.day;
                    var humid4 = response.daily[4].humidity;
                    console.log("forecast 4: " + formattedFull4);
                    var icon4 = response.daily[4].weather[0].icon;
                    var iconURL4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png"
                    // forecast [5]
                    var timestampInMilliSeconds5 = response.daily[5].dt * 1000;
                    var date5 = new Date(timestampInMilliSeconds5);
                    var formattedYear5 = date5.getFullYear()
                    var formattedDay5 = date5.getDate();
                    var formattedMonth5 = date5.getMonth();
                    var formattedFull5 = formattedMonth5 + 1 + "/" + formattedDay5 + "/" + formattedYear5;
                    var temp5 = response.daily[5].temp.day;
                    var humid5 = response.daily[5].humidity;
                    console.log("forecast 5: " + formattedFull5);
                    var icon5 = response.daily[5].weather[0].icon;
                    var iconURL5 = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png"
                    var addCity = $("<li>");
                    // if (!newCity.includes(name)) {
                    //     addCity.text(name);
                    //     addCity.attr("data-value", name.replace(/\s+/g, ''));
                    //     addCity.attr("id", "button" + name.replace(/\s+/g, ''));
                    //     addCity.addClass("list-group-item");
                    //     $("#savedCities").prepend(addCity);
                    //     newCity.push(name);
                    //     console.log(newCity);
                    // }

                    if (formattedFull === formattedFull0) {
                        forecastDate1.text(formattedFull1);
                        forecastDate2.text(formattedFull2);
                        forecastDate3.text(formattedFull3);
                        forecastDate4.text(formattedFull4);
                        forecastDate5.text(formattedFull5);
                        forecastTemp1.text("Temperature: " + temp1 + "\xB0" + "F");
                        forecastTemp2.text("Temperature: " + temp2 + "\xB0" + "F");
                        forecastTemp3.text("Temperature: " + temp3 + "\xB0" + "F");
                        forecastTemp4.text("Temperature: " + temp4 + "\xB0" + "F");
                        forecastTemp5.text("Temperature: " + temp5 + "\xB0" + "F");
                        forecastHumid1.text("Humidity: " + humid1 + "%");
                        forecastHumid2.text("Humidity: " + humid2 + "%");
                        forecastHumid3.text("Humidity: " + humid3 + "%");
                        forecastHumid4.text("Humidity: " + humid4 + "%");
                        forecastHumid5.text("Humidity: " + humid5 + "%");
                        forecastIcon1.attr("src", iconURL1)
                        forecastIcon2.attr("src", iconURL2)
                        forecastIcon3.attr("src", iconURL3)
                        forecastIcon4.attr("src", iconURL4)
                        forecastIcon5.attr("src", iconURL5)
                    }
                    else {
                        forecastDate1.text(formattedFull0);
                        forecastDate2.text(formattedFull1);
                        forecastDate3.text(formattedFull2);
                        forecastDate4.text(formattedFull3);
                        forecastDate5.text(formattedFull4);
                        forecastTemp5.text("Temperature: " + temp0 + "\xB0" + "F");
                        forecastTemp1.text("Temperature: " + temp1 + "\xB0" + "F");
                        forecastTemp2.text("Temperature: " + temp2 + "\xB0" + "F");
                        forecastTemp3.text("Temperature: " + temp3 + "\xB0" + "F");
                        forecastTemp4.text("Temperature: " + temp4 + "\xB0" + "F");
                        forecastHumid5.text("Humidity: " + humid0 + "%");
                        forecastHumid1.text("Humidity: " + humid1 + "%");
                        forecastHumid2.text("Humidity: " + humid2 + "%");
                        forecastHumid3.text("Humidity: " + humid3 + "%");
                        forecastHumid4.text("Humidity: " + humid4 + "%");
                        forecastIcon1.attr("src", iconURL0)
                        forecastIcon2.attr("src", iconURL1)
                        forecastIcon3.attr("src", iconURL2)
                        forecastIcon4.attr("src", iconURL3)
                        forecastIcon5.attr("src", iconURL4)
                    }



                    // $("#forecast ").text(formattedFull));


                    console.log(query2URL);
                })
            })
        }
    }
        $(document).on("click", ".newCity",loadCity);

function uviColor() {
    if(uvi < 3){
        uviDisplay.attr("style","background-color:green");
    }
    else if(uvi >=3 && uvi <6){
        uviDisplay.attr("style","background-color:yellow");
    }
    else if(uvi >=6 && uvi <8){
        uviDisplay.attr("style","background-color:orange");
    }
    else if(uvi >=8 && uvi <11){
        uviDisplay.attr("style","background-color:red");
    }
    else{
        uviDisplay.attr("style","background-color:purple");
    }
}

        // var timestampInMilliSeconds = 1593180342 * 1000;
        // var date = new Date(timestampInMilliSeconds);
        // var formattedYear "Humidity: "+= date.getFullYear()
        // var formattedDay = date.getDate();
        // var formattedMonth = date.getMonth();
        // var formattedFull = formattedMonth + 1 + "/" + formattedDay + "/" + formattedYear
        // console.log("date :" + date);
        // console.log("date formatted :" + formattedFu.attr("src",)


        // var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&"+
        //     "exclude=minutely,hourly&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4";


        // $("#buttonCitySearch").on("click",
        // function populateTop(event) {
        //     event.preventDefault();
        //     cityName = $("#cityFormInput").val();

        //     console.log(cityName);


        //     $.ajax({
        //         url: query2URL,
        //         method: "GET"
        //     }).then(function(response){
        //         console.log("all in one: "+response);
        //         // var name = response.name;
        //         // displayCity.text(name);
        //         // var windSpeed = response.wind.speed;
        //         // $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
        //         // var humidity = response.main.humidity;
        //         // $("#humidityDisplay").text("Humidity: "+humidity+"%")
        //         // var temperature = response.main.temp;
        //         // $("#tempDisplay").text("Temperature: "+temperature+"\xB0"+"F")
        //     })
        // })
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
        console.log("test");

        // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=a849ce81cd857db4bbacc8466ea673d4"


        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //     }).then(function(response){
        //         console.log(response);
        //     })

    
    })
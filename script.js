$(document).ready(function () {

    var cityName = "";
    var listCities = [];
    var displayCity = $("#displayCity");
    var APIkey = "1f87a09bb72ee5eb76bdb96ee06f60f8"

    $("#buttonCitySearch").on("click",
        function populateTop(event) {
            event.preventDefault();
            cityName = $("#cityFormInput").val();
            
            console.log(cityName);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4"


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                var name = response.name;
                displayCity.text(name);
                var icon = response.weather[0].icon;
                var iconURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                $("#iconDisplay").attr("src",iconURL);
                var windSpeed = response.wind.speed;
                $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
                var humidity = response.main.humidity;
                $("#humidityDisplay").text("Humidity: "+humidity+"%")
                var temperature = response.main.temp;
                $("#tempDisplay").text("Temperature: "+temperature+"\xB0"+"F")
            })
        })

        $("#buttonCitySearch").on("click",
        function populateTop(event) {
            event.preventDefault();
            cityName = $("#cityFormInput").val();
            
            console.log(cityName);
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                // var name = response.name;
                // displayCity.text(name);
                // var windSpeed = response.wind.speed;
                // $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
                // var humidity = response.main.humidity;
                // $("#humidityDisplay").text("Humidity: "+humidity+"%")
                // var temperature = response.main.temp;
                // $("#tempDisplay").text("Temperature: "+temperature+"\xB0"+"F")
            })
        })
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
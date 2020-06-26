$(document).ready(function () {

    var cityName = "";
    var listCities = [];
    var displayCity = $("#displayCity");
    var lat = "";
    var lon = "";
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
                var icon = response.weather[0].icon;
                var iconURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                $("#iconDisplay").attr("src",iconURL);
                var windSpeed = response.wind.speed;
                $("#windSpeedDisplay").text("Wind Speed: " + windSpeed + " mph")
                var humidity = response.main.humidity;
                $("#humidityDisplay").text("Humidity: "+humidity+"%")
                var temperature = response.main.temp;
                $("#tempDisplay").text("Temperature: "+temperature+"\xB0"+"F")
                lat = response.coord.lat;
                lon = response.coord.lon;
                console.log("lat: "+lat);
                console.log("lon: "+lon);
                var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&"+
                "exclude=minutely,hourly&units=imperial&appid=a849ce81cd857db4bbacc8466ea673d4";
                $.ajax({
                    url: query2URL,
                    method: "GET"
                }).then(function(response){
                    console.log("all in one: "+JSON.stringify(response));
                    console.log("uvi: "+response.current.uvi)
                    var uvi = response.current.uvi;
                    $("#uviDisplay").text("UV Index: "+uvi);
                    var timestampInMilliSeconds = response.current.dt*1000;
                    var date = new Date(timestampInMilliSeconds);
                    var formattedYear = date.getFullYear()
                    var formattedDay = date.getDate();
                    var formattedMonth = date.getMonth();
                    var formattedFull = formattedMonth+1+"/"+formattedDay+"/"+formattedYear
                    displayCity.text(name+" ("+formattedFull+")");

    
                console.log(query2URL);
            })})
        })

        var timestampInMilliSeconds = 1593180342*1000;
        var date = new Date(timestampInMilliSeconds);
        var formattedYear = date.getFullYear()
        var formattedDay = date.getDate();
        var formattedMonth = date.getMonth();
        var formattedFull = formattedMonth+1+"/"+formattedDay+"/"+formattedYear
        console.log("date :" +date);
        console.log("date formatted :" + formattedFull)


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
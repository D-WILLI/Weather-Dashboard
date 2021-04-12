/* 
how it works ->
User types in the name of a city 
User is shown 
    the city's current:
        weather conditions
        the temperature
        the humidity
        the wind speed
      +++  the UV index:
            color indicates if conditions are:
                favorable
                moderate
                severe
    5-Day Forecast:
      +++  displays the date
        an icon representation of weather conditions
        the temperature
        the humidity

++++
The city and result is listed in search history 
When the user clicks on city in search history 
The user is shown 
    the city current:
    5 Day Forecast:
*/

// this is the input selector 
var input = document.querySelector("#input");
// this is the button selector
var button = document.querySelector(".btn"); 

button.addEventListener("click", function(event){

    event.preventDefault();
    var city = input.value;

    localStorage.setItem("city-name", city);     

    var displayStorage = document.getElementById('savedData1');
    displayStorage.innerHTML = localStorage.getItem("city-name"); 
    
    geoLocation(city); 

})


function geoLocation(city, event) {

    var geoUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=02bf58d237919d96550c0fc88d7bba8e`
    fetch(geoUrl)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(data);  
    
    // this is where the Longitude is accessed and stored 
    var longitude = data[0].lon; 
    // this is where the Latitude is accessed and stored 
    var latitude = data[0].lat;
    // this is where the City name is accessed and stored 
    var name = data[0].name
   
    displayWeather(longitude, latitude, name)
})
}




function displayWeather(longitude, latitude, name) {

    var currentUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=02bf58d237919d96550c0fc88d7bba8e&units=imperial`
    
    
        fetch(currentUrl)
        .then(function (response){
            return response.json(); 
        })
        .then(function (data){
            console.log(data); 
    
    // this is where the current day is 
            
            // this is the current day section 
            var container  = document.createElement('div');
            
            // this is the name of the city displayed 
            var header = document.createElement('h3'); 
            header.textContent = name; 

            // this is where the current day is displayed
            var day = document.createElement('h5'); 
            day.textContent = moment().format('(MMM. D)') 

            // this is where the daily icons is imported and displayed 
            var icon = data.current.weather[0].icon ; 
            var urlIcon = document.createElement('img');
            urlIcon.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
            
            // this is where the current temperature is displayed
            var temp = document.createElement('p');
            temp.textContent =`Temperature: ${data.current.temp} F`;
            
            // this is where the daily humidity is displayed 
            var humidity = document.createElement('p'); 
            humidity.textContent = `Humidity: ${data.current.humidity} %`; 
            
            // this is where the daily wind speed is displayed 
            var wind = document.createElement('p'); 
            wind.textContent = `Wind Speed: ${data.current.wind_speed} MPH`; 
            
            // this is where the daily uv is displayed 
            var uv = document.getElementById('uvData'); 
            uv.textContent = `UV: ${data.current.uvi}`; 
            
            // uv conditions and colors 
            if (data.current.uvi <= 4 ){
                document.getElementById('uvData').style.backgroundColor="#00ff00";  
                console.log("favorable");
            } else if  ( data.current.uvi > 3 && data.current.uvi <= 6 ){
                document.getElementById('uvData').style.backgroundColor="#FFFF00";  
                console.log("moderate");
            } else {
                document.getElementById('uvData').style.backgroundColor="#EE4B2B";  
                console.log ("harmful");
            };
            
            // this is where the current weather info is gathered and displayed. 
            container.appendChild(urlIcon);
            container.appendChild(header);
            container.appendChild(day); 
            container.appendChild(temp);
            container.appendChild(humidity); 
            container.appendChild(wind); 
            container.appendChild(uv); 
           
            document.getElementById('currentWeather').append(container);
            
    // this is where the 5 day weather is displayed 
    
        // day 1 
            // icon of the weather
            var fiveDayIcon = data.daily[0].weather[0].icon;
            var icon1 = document.getElementById ('section2-A');
            icon1.src=`http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`

            // the date 
            var date1 = document.getElementById('section1-A');
            date1.innerHTML = moment().add(1, 'd').format('MMM. D')

            // get temperature 
            var temp1 =  document.getElementById ('section3-A'); 
            temp1.innerHTML = ` Temperature: ${data.daily[0].temp.day} F`;

            // get humidity 
            var humidity1 = document.getElementById ('section4-A'); 
            humidity1.innerHTML = `Humidity: ${data.daily[0].humidity} %`;

           
        // day 2
            // icon of the weather
            var fiveDayIcon = data.daily[1].weather[0].icon;
            var icon2 = document.getElementById ('section2-B');
            icon2.src=`http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`

            // the date
            var date2 = document.getElementById('section1-B');
            date2.innerHTML = moment().add(2, 'd').format('MMM. D')

            // get temperature 
            var temp2 =  document.getElementById ('section3-B'); 
            temp2.innerHTML = ` Temperature: ${data.daily[1].temp.day} F`;

            // get humidity 
            var humidity2 = document.getElementById ('section4-B'); 
            humidity2.innerHTML = `Humidity: ${data.daily[1].humidity} %`;
        
        
        // day 3
            // icon of the weather
            var fiveDayIcon = data.daily[2].weather[0].icon;
            var icon3 = document.getElementById ('section2-C');
            icon3.src=`http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`

            // the date
            var date3 = document.getElementById('section1-C');
            date3.innerHTML = moment().add(3, 'd').format('MMM. D');

            // get temperature 
            var temp3 =  document.getElementById ('section3-C'); 
            temp3.innerHTML = ` Temperature: ${data.daily[2].temp.day} F`;

            // get humidity 
            var humidity3 = document.getElementById ('section4-C'); 
            humidity3.innerHTML = `Humidity: ${data.daily[2].humidity} %`;
        
        
        // day 4
            // icon of the weather
            var fiveDayIcon = data.daily[3].weather[0].icon;
            var icon4 = document.getElementById ('section2-D');
            icon4.src=`http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`

            // the date
            var date4 = document.getElementById('section1-D');
            date4.innerHTML = moment().add(4, 'd').format('MMM. D');

            // get temperature 
            var temp4 =  document.getElementById ('section3-D'); 
            temp4.innerHTML = ` Temperature: ${data.daily[3].temp.day} F`;

            // get humidity
            var humidity4 = document.getElementById ('section4-D'); 
            humidity4.innerHTML = `Humidity: ${data.daily[3].humidity} %`;


        // day 5
            // icon of the weather
            var fiveDayIcon = data.daily[4].weather[0].icon;
            var icon5 = document.getElementById ('section2-E');
            icon5.src=`http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`

            // the date
            var date5 = document.getElementById('section1-E');
            date5.innerHTML = moment().add(5, 'd').format('MMM. D');

            // get temperature 
            var temp5 =  document.getElementById ('section3-E'); 
            temp5.innerHTML = ` Temperature: ${data.daily[4].temp.day} F`;

            // get humidity
            var humidity5 = document.getElementById ('section4-E'); 
            humidity5.innerHTML = `Humidity: ${data.daily[4].humidity} %`;
  
 
       
          

          
  
           

 
 




















           
    })
    
}

displayWeather(); 








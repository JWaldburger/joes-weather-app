const init = () => {
    let weatherButton = document.querySelector("#getWeather");
    weatherButton.addEventListener("click",  getWeatherDetails);
}

const getWeatherDetails = () => {
    let zipCode = document.querySelector("#zipCode").value;
    let coords = getCoordinates(zipCode);
}

const getWeather = (lat, lng) => {
    //console.log(`latitude: ${lat}`);
    //console.log(`longitude: ${lng}`);

    let url = "http://api.geonames.org/findNearByWeatherJSON";
    let method = "get";
    let userName = "JWaldburger";
    let params = `?username=${userName}&lat=${lat}&lng=${lng}`;//what params you are passing your user name, lat, lng
    let xhr = new XMLHttpRequest();
    xhr.open(method, url + params);
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState == 4) {
            //console.log(xhr.responseText);
            let weatherData = JSON.parse(xhr.responseText);
            let temp = weatherData.weatherObservation.temperature;
            let wind = weatherData.weatherObservation.windSpeed;
            let city = weatherData.weatherObservation.stationName;
            let farenheit = (temp * 9/5) + 32;
            let fixedFarenheit = farenheit.toFixed(0);

            document.getElementById("printCity").innerHTML = city;
            document.getElementById("printTemp").innerHTML = fixedFarenheit + " farenheit";
            document.getElementById("printWind").innerHTML = wind + " mph wind";

            //console.log(temp);
            //console.log(wind);
            //console.log(city);
            //console.log(farenheit);

            if(fixedFarenheit <= 34) {
                 document.querySelector("#icon").innerHTML = '<img src="images/cold_icon.png">';
            } else if (fixedFarenheit >= 84) {
                document.querySelector("#icon").innerHTML = '<img src="images/hot_icon.png">';
            } else {
                document.querySelector("#icon").innerHTML = '';

            }

            if(wind > 15) {
                document.querySelector("#icon").innerHTML = '<img src="images/wind_icon.png">';
            } else {
                document.querySelector("#icon").innerHTML = '';
            }

        }
    })
    xhr.send();
}


const getCoordinates = zipCode => {
    //for project this will be the service url
    let url = "http://api.geonames.org/postalCodeSearchJSON?username=JWaldburger&countrycode=US";
    let method = "get";
    let params = `&postalcode=${zipCode}`;
    let xhr = new XMLHttpRequest();

    xhr.open(method, url + params);
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState == 4) {

        //instructor help
        let locationData = JSON.parse(xhr.responseText);
        let latitude = locationData.postalCodes[0].lat;
        let longitude = locationData.postalCodes[0].lng;
        getWeather(latitude, longitude);

        }
    })
    xhr.send();
}


window.addEventListener("load", init);

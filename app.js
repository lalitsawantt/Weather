window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription= document.querySelector(".temperatureDescription");
    let temperatureDegree = document.querySelector(".temperatureDegree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/b6c568317fe34acf17e68514976c8229/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon }= data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    console.log(getLocation(lat,long, proxy));

                    // formula for celsius 
                    let celsius = (temperature - 32)*5/9;
                    //Set icons
                    setIcons(icon, document.querySelector(".icon"));

                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                }); 

    }); 
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log("hello, ", currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function getLocation(latitude, longitude, proxyServer){
        let locationApi = `${proxyServer}https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs`;
        fetch(locationApi)
            .then(response => {
                return response.json;
            })
    }
});



// https://api.darksky.net/forecast/b6c568317fe34acf17e68514976c8229/37.8267,-122.4233
// https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=41.8842%2C-87.6388%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs
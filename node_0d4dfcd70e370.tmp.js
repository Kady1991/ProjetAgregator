let https = require('https');
let parseString = require('xml2js').parseString;

// réalisations d'un simple serveur web avec express
const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/htdocs')); 
app.set('view engine', 'ejs'); 

app.listen(8080, function() {
    console.log('Listening on port 8080');
    });

app.get('/' , function(request, response) {
    // Fusion du ejs avec mes data
    response.render('index.ejs', dataToDisplay); 
    });

// on crée un objet qui contient toutes les données qui seront fusionnées avec le template
    let dataToDisplay = new Object();
    dataToDisplay.feedGeekWire = new Object();
    dataToDisplay.feedGeekWire.item = [];
    dataToDisplay.apiWeather = new Object();
    dataToDisplay.apiWeather = new Object();
    dataToDisplay.apiWeather.temperatures = [];
    
    
    //updateRSSGeekWire();
    updateWeather();
   
    
    // function updateRSSGeekWire() {
    //     // Envoyer une requête de type GET à l'adresse :
    //     // https://www.geekwire.com/feed/
    //     // Pour obtenir une réponse XML
    //     let request = {
    //         "host": "www.geekwire.com",
    //         "port": 443,
    //         "path": "/feed/"
    //         };
    //     https.get(request, receiveResponseCallback);
    //     setTimeout(updateRSSGeekWire, 10000);
        
    //     function receiveResponseCallback(response) { 
    //         let rawData = "";
    //         response.on('data', (chunk) => { rawData += chunk; }); 
    //         response.on('end', function() { 
    //             parseString(rawData, function (err, result) {
    //                 for(let i=0; i<result.rss.channel[0].item.length ; i++){  // itérer les items
    //                     let item = {
    //                         "title": result.rss.channel[0].item[i].title[0],
    //                         "link" : result.rss.channel[0].item[i].link[0],
    //                         "pubDate": result.rss.channel[0].item[i].pubDate[0]
    //                     }
    //                     dataToDisplay.feedGeekWire.item.push(item);
    //                     }
    //                 });
    //             });
    //         }
    // }
    
    // function updateWeather(){
    //     // Envoyer une requête de type GET à l'adresse :
    //     // https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m
    //     // Pour obtenir une réponse JSON
    //     let request = {
    //         "host": "api.open-meteo.com",
    //         "port": 443,
    //         "path": "/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m" 
    //         };
        
    //     https.get(request, receiveResponseCallback);
    //     setTimeout(updateWeather, 5000);
        
    //     function receiveResponseCallback(response) { 
    //         let rawData = "";
    //         response.on('data', (chunk) => { rawData += chunk; }); 
    //         response.on('end', function() { 
    //             // console.log(rawData); 
    //             let weather = JSON.parse(rawData);
    //             dataToDisplay.apiWeather.temperatures = weather.hourly.temperature_2m;
    //             });
    //         }
    // }

    function updateWeather(){
// Envoyer une requête de type GET à l'adresse :
// https://api.openweathermap.org/data/2.5/weather?lat=50.8474&lon=4.3773&appid=bc87b00bf5d1bd4d3a12
// Pour obtenir une réponse JSON
let https = require('https');

let request = {
    "host": "api.openweathermap.org",
    "port": 443,
    "path": "/data/2.5/weather?lat=50.8674&lon=4.3773&lang=fr&appid=bc87b00bf5d1bd4d3a12485a5ceb27c2" 
    };

https.get(request, receiveResponseCallback);
// !!!!! à decommenter setTimeout(updateWeather, 1800);

// console.log("requête envoyée");

// fonction pour appeler les API
function receiveResponseCallback(response) { 
    // console.log('Got response:' + response.statusCode);

    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        // console.log(rawData); 
        // []
        let weather = JSON.parse(rawData);
        // description et icone
        // console.log(weather.weather[0].main, weather.weather[0].description, weather.weather[0].icon);

        dataToDisplay.apiWeather.main = weather.weather[0].main;
        dataToDisplay.apiWeather.description = weather.weather[0].description;
        dataToDisplay.apiWeather.icon = weather.weather[0].icon;
        // horaire à convertir
        // console.log(weather.timezone)
        // new Date(timezone * 1000) --> FORMULE
        let moment =  (new Date(weather.timezone * 1000));
        let maintenant = moment.toLocaleDateString('fr-BE', {  day : "2-digit", month : "numeric", year : "numeric"});
        
        console.log(maintenant);
        dataToDisplay.apiWeather.timezone = weather.timezone;

        // commune
        // console.log("name : " + weather.name);
        dataToDisplay.apiWeather.name = weather.name;

        // température
        // console.log(Math.round(weather.main.temp-273.15))
        let temp = Math.round(weather.main.temp-273.15);
        dataToDisplay.apiWeather.temp = temp
    
        });

    }
}

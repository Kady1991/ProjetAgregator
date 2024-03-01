let https = require('https');
let parseString = require('xml2js').parseString;

// réalisations d'un simple serveur web avec express
const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/htdocs'));
app.set('view engine', 'ejs');

app.listen(8080, function () {
    console.log('Listening on port 8080');
});

app.get('/', function (request, response) {
    // Fusion du ejs avec mes data
    response.render('index.ejs', dataToDisplay);
});

// on crée un objet qui contient toutes les données qui seront fusionnées avec le template
let dataToDisplay = new Object();
dataToDisplay.feedGeekWire = new Object();
dataToDisplay.feedGeekWire.item = [];
dataToDisplay.apiWeather = new Object();
dataToDisplay.apiWeather.Brxl = new Object();
dataToDisplay.apiWeather.Mali = new Object();
dataToDisplay.apiWeather.FR = new Object();
dataToDisplay.blague = new Object();
dataToDisplay.apiWeather.Brxl.temperatures = [];
dataToDisplay.apiWeather.Mali.temperatures = [];
dataToDisplay.apiWeather.FR.temperatures = [];



//updateRSSGeekWire();
updateWeatherBrxl();
updateWeatherMali();
updateWeatherFR();
updateBlague();


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

function updateWeatherBrxl() {
    // Envoyer une requête de type GET à l'adresse :
    // https://api.openweathermap.org/data/2.5/weather?lat=50.8474&lon=4.3773&appid=bc87b00bf5d1bd4d3a12
    // Pour obtenir une réponse JSON
    let https = require('https');

    let request = {
        "host": "api.openweathermap.org",
        "port": 443,
        "path": "/data/2.5/weather?lat=50.8&lon=4.3&lang=fr&appid=bc87b00bf5d1bd4d3a12485a5ceb27c2"
    };

    https.get(request, receiveResponseCallback);
    // !!!!! à decommenter setTimeout(updateWeatherBrxl, 1800);

    // console.log("requête envoyée");

    // fonction pour appeler les API
    function receiveResponseCallback(response) {
        // console.log('Got response:' + response.statusCode);

        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            // console.log(rawData); 
            // []
            let weather = JSON.parse(rawData);
            // description et icone
            // console.log(weather.weather[0].main, weather.weather[0].description, weather.weather[0].icon);

            dataToDisplay.apiWeather.Brxl.main = weather.weather[0].main;
            dataToDisplay.apiWeather.Brxl.description = weather.weather[0].description;
            dataToDisplay.apiWeather.Brxl.icon = weather.weather[0].icon;
            // horaire à convertir
            // console.log(weather.timezone)
            // new Date(timezone * 1000) --> FORMULE
            let moment = (new Date(weather.timezone * 1000));
            let maintenant = moment.toLocaleDateString('fr-BE', { day: "2-digit", month: "numeric", year: "numeric" });

            console.log(maintenant);
            dataToDisplay.apiWeather.Brxl.timezone = weather.timezone;

            // commune
            // console.log("name : " + weather.name);
            dataToDisplay.apiWeather.Brxl.name = weather.name;

            // température
            // console.log(Math.round(weather.main.temp-273.15))
            let temp = Math.round(weather.main.temp - 273.15);
            dataToDisplay.apiWeather.Brxl.temp = temp

        });

    }
}

// MALI//

function updateWeatherMali() {
    // Envoyer une requête de type GET à l'adresse :
    // https://api.openweathermap.org/data/2.5/weather?lat=50.8474&lon=4.3773&appid=bc87b00bf5d1bd4d3a12
    // Pour obtenir une réponse JSON
    let https = require('https');

    let request = {
        "host": "api.openweathermap.org",
        "port": 443,
        "path": "/data/2.5/weather?lat=17.5&lon=-3.3&lang=fr&appid=bc87b00bf5d1bd4d3a12485a5ceb27c2"
    };

    https.get(request, receiveResponseCallback);
    // !!!!! à decommenter setTimeout(updateWeatherMali, 1800);

    // console.log("requête envoyée");

    // fonction pour appeler les API
    function receiveResponseCallback(response) {
        // console.log('Got response:' + response.statusCode);

        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            console.log(rawData);
            // []
            let weather = JSON.parse(rawData);
            // description et icone
            console.log(weather.weather);

            dataToDisplay.apiWeather.Mali.main = weather.weather[0].main;
            dataToDisplay.apiWeather.Mali.description = weather.weather[0].description;
            dataToDisplay.apiWeather.Mali.icon = weather.weather[0].icon;

            // horaire à convertir
            // console.log(weather.timezone)
            // new Date(timezone * 1000) --> FORMULE
            let moment = (new Date(weather.timezone * 1000));
            let maintenant = moment.toLocaleDateString('fr-BE', { day: "2-digit", month: "numeric", year: "numeric" });

            //console.log(maintenant);
            dataToDisplay.apiWeather.Mali.timezone = weather.timezone;

            // commune
            // console.log("name : " + weather.name);
            dataToDisplay.apiWeather.Mali.name = weather.name;

            // température
            // console.log(Math.round(weather.main.temp-273.15))
            let temp = Math.round(weather.main.temp - 273.15);
            dataToDisplay.apiWeather.Mali.temp = temp

        });

    }
}

// LA FRANCE //

function updateWeatherFR() {
    // Envoyer une requête de type GET à l'adresse :
    // https://api.openweathermap.org/data/2.5/weather?lat=50.8474&lon=4.3773&appid=bc87b00bf5d1bd4d3a12
    // Pour obtenir une réponse JSON
    let https = require('https');

    let request = {
        "host": "api.openweathermap.org",
        "port": 443,
        "path": "/data/2.5/weather?lat=48.85&lon=2.3&lang=fr&appid=bc87b00bf5d1bd4d3a12485a5ceb27c2"
    };

    https.get(request, receiveResponseCallback);
    // !!!!! à decommenter setTimeout(updateWeatherMali, 1800);

    // console.log("requête envoyée");

    // fonction pour appeler les API
    function receiveResponseCallback(response) {
        // console.log('Got response:' + response.statusCode);

        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            // console.log(rawData); 
            // []
            let weather = JSON.parse(rawData);
            // description et icone
            //console.log(weather);

            dataToDisplay.apiWeather.FR.main = weather.weather[0].main;
            dataToDisplay.apiWeather.FR.description = weather.weather[0].description;
            dataToDisplay.apiWeather.FR.icon = weather.weather[0].icon;
            // horaire à convertir
            // console.log(weather.timezone)
            // new Date(timezone * 1000) --> FORMULE
            let moment = (new Date(weather.timezone * 1000));
            let maintenant = moment.toLocaleDateString('fr-BE', { day: "2-digit", month: "numeric", year: "numeric" });

            //console.log(maintenant);
            dataToDisplay.apiWeather.FR.timezone = weather.timezone;

            // commune
            // console.log("name : " + weather.name);
            dataToDisplay.apiWeather.FR.name = weather.name;

            // température
            // console.log(Math.round(weather.main.temp-273.15))
            let temp = Math.round(weather.main.temp - 273.15);
            dataToDisplay.apiWeather.FR.temp = temp

        });

    }
}

// FIN DE LA FRANCE


function updateBlague() {
    setTimeout(updateBlague, 1000*10);
    // DEBUT BLAGUES DROLES

        // Envoyer une requête de type GET à l'adresse :
        // https://api.blablagues.net/?rub=blagues,videos,pepites,images
        // Pour obtenir une réponse JSON
        let https = require('https');

        let request = {
            "host": "api.blablagues.net",
            "port": 443,
            "path": "/?rub=blagues,videos,pepites,images"
        };

        https.get(request, receiveResponseCallback);
        // !!!!! à decommenter setTimeout(updateWeatherMali, 1800);

        // console.log("requête envoyée");

        // fonction pour appeler les API
        function receiveResponseCallback(response) {
            // console.log('Got response:' + response.statusCode);

            let rawData = "";
            response.on('data', (chunk) => { rawData += chunk; });
            response.on('end', function () {
                // console.log(rawData);
                // []
                let blaguesApi = JSON.parse(rawData);
                console.log( blaguesApi);
                dataToDisplay.blague.text = blaguesApi.data.content.text_head.replace(/<[^>]*>/g, '') + " " + blaguesApi.data.content.text.replace(/<[^>]*>/g, '');
                //console.log(dataToDisplay.blague.text);
                // console.log(blaguesApi);


                // dataToDisplay.apiWeather.FR.description = weather.weather[0].description;
                // dataToDisplay.apiWeather.FR.icon = weather.weather[0].icon;
                // // horaire à convertir
                // // console.log(weather.timezone)
                // // new Date(timezone * 1000) --> FORMULE
                // let moment =  (new Date(weather.timezone * 1000));
                // let maintenant = moment.toLocaleDateString('fr-BE', {  day : "2-digit", month : "numeric", year : "numeric"});

                // //console.log(maintenant);
                // dataToDisplay.apiWeather.FR.timezone = weather.timezone;

                // // commune
                // // console.log("name : " + weather.name);
                // dataToDisplay.apiWeather.FR.name = weather.name;

                // // température
                // // console.log(Math.round(weather.main.temp-273.15))
                // let temp = Math.round(weather.main.temp-273.15);
                // dataToDisplay.apiWeather.FR.temp = temp

            });
    }

}
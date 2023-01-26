const request = require('request');

function geocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmlraGlsLWJrIiwiYSI6ImNrdGl6dTN5ajAwaWMyb3V5MjN0NGo3ZzUifQ.0Kd5v4P5ISxhR75TyXVzrQ&limit=1'
    
    request({url, json: true}, (err, response) => {
        if (err) {
            callback('An error occured', response);
        } else {
            callback(null, response.body);
        }
    });
}

module.exports = geocode;
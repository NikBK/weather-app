const request = require('request');

function forecast(lat, long, callback) {
    const url = `http://api.weatherstack.com/current?access_key=4217300b268548725545ae2b248eaba0&query=${lat},${long}`

    request({url, json: true}, (err, response) => {
        if (err) {
            callback('Error has occured', null);
            return ;
        }
        const body = response.body;
        if (body.error) {
            callback('Error has occured', null);
        } else {
            callback(null, {
                img: body.current.weather_icons, 
                tempDetails: `At ${body.current.observation_time} the temperature was ${body.current.temperature}℃ `,
                weatherDescription: body.current.weather_descriptions
            })
        }
        // console.log(JSON.parse(resp.body));
    });
}

module.exports = forecast;
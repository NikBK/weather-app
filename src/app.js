const express = require('express');
const path = require('path');
const geocode = require('./geocode');
const forecast = require('./forecast');

const PORT = process.env.PORT || 5000;

const app = express();

const publicPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views/templates'));
app.use(express.static(publicPath));


app.get('/getWeather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide the address!'
        });
        return;
    }
    geocode(req.query.address, (err, response) => {
        if (err) {
            console.log(err);
            res.send({
                error: 'Error here'
            });
        }

        let place_name = response.features[0].place_name;
        let lat = response.features[0].center[1];
        let long = response.features[0].center[0]
        console.log(`The place is ${place_name}`);

        forecast(lat, long, (err, response) => {
            if (err) {
                console.log(err);
                res.send({
                    error: 'Error occured!'
                });
            }
            res.send({
                temp: response.tempDetails,
                img: response.img,
                place: 'The place is ' + place_name,
                weatherDescription: response.weatherDescription,
                map: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${long},${lat}30,0/300x200?access_token=pk.eyJ1IjoibmlraGlsLWJrIiwiYSI6ImNrdGl6dTN5ajAwaWMyb3V5MjN0NGo3ZzUifQ.0Kd5v4P5ISxhR75TyXVzrQ`
            });
        });
    });
})

app.get('/', (req, res) => {
    res.render('index', function (err, html) {
        if (err)
            res.status(500).send(err);
        else {
            res.send(html);
        }
    });
});





// http://localhost:5000/
// app.get('/', (req, res) => {
//     console.log('Request Came..');
//     res.send('Hello world');
// });

// http://localhost:5000/about
app.get('/about', (req, res) => {
    console.log('Request Came to about');
    res.send('<h1>About us</h1>');
});

// http://localhost:5000/json
app.get('/json', (req, res) => {
    console.log('Request Came to json');
    res.send({
        name: 'Nikhil',
        age: '22'
    });
});

// http://localhost:5000/XYZ   not a valid address
app.get('*', (req, res) => {
    console.log('Request Came to unknown page *');
    res.send('<h1>404 Resouce not found</h1>');
});


app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

let form = document.querySelector('form');
let input = document.querySelector('#inputText');
let tempPara = document.querySelector('#temp-result');
let placePara = document.querySelector('#place-result');
let img = document.querySelector('img');
let weatherDescription = document.querySelector('#weather-description');
let mapImg = document.querySelector('#map-img');
let bg = document.querySelector('#header-container');
let birds = document.getElementsByClassName('arrow-right');
let heading = document.getElementsByTagName('h1')[0];

let time = 0;

setInterval( () => {
    time += 1;
    if(time >= 20){
        time = 0;
    }
    if(time >= 10){
        bg.style.backgroundColor = 'black';
    }
    else{
        bg.style.backgroundColor = '#8bb3ce';
    }
}, 1000 )

form.addEventListener('submit', (e) => {
    e.preventDefault();
    tempPara.innerText = 'Loading weather details...';
    placePara.innerText = '';

    let address = input.value;
    let url = `${location.href}getWeather?address=${address}`;
    
    // let otherUrl = 'http://localhost:5000/getWeather?address=' + address;
    // console.log(otherUrl);
    // console.log(url);
    // console.log(url == ('http://localhost:5000/getWeather?address=' + address));

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                tempPara.innerText = data.error;
                img.setAttribute('src', "images/weatherPic.png");
                weatherDescription.innerText = "";
                mapImg.style.display = 'none';
                return;
            }
            placePara.innerText = data.place;
            tempPara.innerText = data.temp;
            img.setAttribute('src', data.img);
            mapImg.setAttribute('src', data.map);
            mapImg.style.display = 'block';
            weatherDescription.innerText = data.weatherDescription;
        });
});
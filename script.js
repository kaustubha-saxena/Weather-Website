const api = "5195e647002e4f456ddedfbd1b54eb22";
// const url="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
// const url2="http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}";
let temp = document.body.querySelector(".temp");
let img = document.body.querySelector(".weather-img");
let weather = document.body.querySelector(".weather");
let speed = document.body.querySelector(".speed")
let search = document.body.querySelector(".search");
let btn = document.body.querySelector(".button");
let humidity = document.body.querySelector(".humidity_value");
let city = "";
let data;
btn.addEventListener("click", () => {
    get_city();
})
function get_Data(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`).then((res) => {
        res.json().then((data) => {
            // console.log(data);
            temp.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
            let a = data.weather[0].main;
            img.src = `images/${a}.png`
            weather.innerHTML = data.weather[0].main;
            speed.innerHTML = Math.round(data.wind.speed * 3.6) + "Km/h";
            console.log(data.main.humidity)
            humidity.innerHTML = data.main.humidity + "%";
        })
    })
}
function get_city() {
    city = search.children[0].value;
    console.log(city)
    let response = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api}`)
    response.then((res) => {
        let data = res.json();
        data.then((d) => {
            get_Data(d[0].lat, d[0].lon);
        })
    })
}

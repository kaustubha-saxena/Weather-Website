const api = "5195e647002e4f456ddedfbd1b54eb22";
let temp = document.body.querySelector(".temp");
let img = document.body.querySelector(".weather-img");
let weather = document.body.querySelector(".weather");
let speed = document.body.querySelector(".speed")
let search = document.body.querySelector(".search");
let btn = document.body.querySelector(".button");
let humidity = document.body.querySelector(".humidity_value");
let reminder = document.body.querySelector(".tips")
let city = "";
let data;
btn.addEventListener("click", () => {
    get_city();
})
function get_Data(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`).then((res) => {
        res.json().then((data) => {
            console.log(data);
            temp.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
            let a = data.weather[0].main;
            img.src = `images/${a}.png`
            weather.innerHTML = data.weather[0].main;
            speed.innerHTML = Math.round(data.wind.speed * 3.6) + "Km/h";
            console.log(data.main.humidity)
            humidity.innerHTML = data.main.humidity + "%";
            if (data.main.humidity >= 85) {
                reminder.classList.remove("hide")
                reminder.children[1].innerHTML = `Don't forget your umbrella! Humidity at ${data.main.humidity}% with high chance of rain today. Stay dry!`
            }
            else {
                reminder.classList.add("hide")

            }
        })
    })
}
function get_city() {
    city = search.children[0].value;
    console.log(city)
    let response = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api}`)
    response.then((res) => {
        let data = res.json();
        data.then((d) => {
            get_Data(d[0].lat, d[0].lon);
        })
    })
}
search.children[0].value = "Bangalore";
get_city();

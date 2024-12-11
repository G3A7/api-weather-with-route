//api Key  363f0ee9576c4499974210006241012
const apiKeyForWeather = "363f0ee9576c4499974210006241012";
const apiKeyForCountry = "398938bba1d540c5a36778155acea436";
const row = document.querySelector(".custom-row");
const input = document.querySelector("#search");

// https://api.weatherapi.com/v1/current.json?key=363f0ee9576c4499974210006241012&q=London&aqi=no

async function getFirstWeather() {
  try {
    function getLocationUser() {
      return new Promise((res) => {
        navigator.geolocation.getCurrentPosition((position) => {
          res({
            x: position.coords.latitude,
            y: position.coords.longitude,
          });
        });
      });
    }
    const { x, y } = await getLocationUser();
    console.log(x, y);

    const resCountry = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${x}+${y}&key=${apiKeyForCountry}&language=en`
    );
    const dataCountry = await resCountry.json();
    console.log(dataCountry.results[0].components);

    const country = dataCountry?.results[0]?.components?.town;
    console.log(country);

    const resWeather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=363f0ee9576c4499974210006241012&q=${country}&days=3&aqi=no&alerts=no`
    );
    const dataWeather = await resWeather.json();
    // console.log(dataWeather)
    display(dataWeather);
  } catch (err) {
    console.log("Ahmed1", err, "Ahmed1");
  }
}
getFirstWeather();

input.addEventListener("input", (e) => {
  apiWeather(e.target.value);
  if (e.target.value == "") {
    getFirstWeather();
  }
});
async function apiWeather(country) {
  try {
    row.innerHTML = `  <div class="loader"></div>`;
    const resWeather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=363f0ee9576c4499974210006241012&q=${country}&days=3&aqi=no&alerts=no`
    );
    const dataWeather = await resWeather.json();
    display(dataWeather);
  } catch (err) {
    console.log("Ahmed", err, "Ahmed");
  }
}
// apiWeather("london");

function display(res) {
  // console.log(res);
  let date = new Date(res.current.last_updated);
  let blackBox = "";
  blackBox += `
  <div class="col-md-4">
            <div class="inner-weather">
              <div class="weather-title d-flex justify-content-between p-2">
                <span>${date.toString().split(" ")[0]}</span>
                <span>${date.toString().split(" ")[2]} ${date.toString().split(" ")[1]}</span>
              </div>
              <div class="weather-content">
                <h3>${res.location.name}</h3>
                <h4 class="h1">${res.current.temp_c}<sup>o</sup>c</h4>
                <div class="status">
                  <img id="img" src="https:${
                    res.current.condition.icon
                  }" class="w-100 d-block" alt="" />
                </div>
                <span class='status-text '>${res.current.condition.text}</span>
                <div class="icons d-flex  align-items-center gap-1">
                  <div class="icon">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${res.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-wind"></i> 
                    <span>${res.current.wind_kph}km/h</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-compass"></i>
                    <span>${res.current.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
  let days = res.forecast.forecastday;
  days = days.slice(1);
  days.forEach((e, i) => {
    let date = new Date(e.date);
    date.toString().split(" ")[0];
    blackBox += `
    <div class="col-md-4">
              <div class="inner-weather ${i == 0 ? "bg-card-2" : ""} text-center">
                <div class="weather-title ${
                  i == 0 ? "bg-card-2" : ""
                } d-flex justify-content-center p-2">
                  <span>${date.toString().split(" ")[0]}</span>
                </div>
                <div class="weather-content">
                <div class="status w-25 my-5 mx-auto">
                  <img id="img" src="https:${e.day.condition.icon}" class="w-100 d-block" alt="" />
                </div>
                  <h5 class='c-h5'>${e.day.maxtemp_c}<sup>o</sup>c</h5>
                  <h6 class='c-h6'>${e.day.mintemp_c}<sup>o</sup>c</h6>
                  <span class='status-text'>${e.day.condition.text}</span>
                </div>
              </div>
            </div>
    `;
  });

  row.innerHTML = blackBox;
}

// console.log(new Date("2024-12-11 00:30"));
// let c = new Date("2024-12-11 00:30");

// console.log(c.toString().split(' ')[1]);
// console.log(c.toString().split(' ')[2]);
// console.log(c.toString().split(' ')[0]);
// (async function getAPi() {
// const res = await fetch(
//   "http://api.weatherapi.com/v1/forecast.json?key=&q=cairo&days=2"
// );
// const data = await res.json();
// document
//   .querySelector("#img")
//   .setAttribute("src", `https:${data.forecast.forecastday[0].day.condition.icon}`);
// console.log(data); // درحه الحراره الحاليه
// console.log(data.forecast.forecastday[0].day.maxtemp_c);
// console.log(data.forecast.forecastday[0].day.mintemp_c);
// console.log(data.forecast.forecastday[0].day.condition.icon);
// console.log(data.forecast.forecastday[0].day.condition.text);
// api Key to detected country 398938bba1d540c5a36778155acea436
// function promiseLocation() {
//   let x, y;
//   return new Promise((res) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       x = position.coords.latitude;
//       y = position.coords.longitude;
//       res({ x, y });
//     });
//   });
// }
// const { x, y } = await promiseLocation();
// const res = await fetch(
//   `https://api.opencagedata.com/geocode/v1/json?q=${x}+${y}&key=${api_key}&language=en`
// );
// const data = await res.json();
// console.log(data);
// console.log(data.results[0].components._normalized_city);
// })();

/*

 blackBox += `
  <div class="col-md-4">
            <div class="inner-weather">
              <div class="weather-title d-flex justify-content-between p-2">
                <span>Tuesday</span>
                <span>10December</span>
              </div>
              <div class="weather-content">
                <h3>Cairo</h3>
                <h4 class="h1">22.1C</h4>
                <div class="status">
                  <img id="img" src="" class="w-100 d-block" alt="" />
                </div>
                <span>Sunny</span>
                <div class="icons d-flex align-items-center gap-2">
                  <div class="icon">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>20%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-wind"></i> 
                    <span>20%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-compass"></i>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;

 const default = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2`
  );

 <div class="col-md-4">
            <div class="inner-weather">
              <div class="weather-title d-flex justify-content-between p-2">
                <span>Tuesday</span>
                <span>10December</span>
              </div>
              <div class="weather-content">
                <h3>Cairo</h3>
                <h4 class="h1">22.1C</h4>
                <div class="status">
                  <img id="img" src="" class="w-100 d-block" alt="" />
                </div>
                <span>Sunny</span>
                <div class="icons d-flex align-items-center gap-2">
                  <div class="icon">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>20%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-wind"></i> 
                    <span>20%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-compass"></i>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
*/

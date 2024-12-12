const apiKeyForWeather = "363f0ee9576c4499974210006241012";
const apiKeyForCountry = "398938bba1d540c5a36778155acea436";
const row = document.querySelector(".custom-row");
const input = document.querySelector("#search");
const btnSearch = document.querySelector("#btn-search");
let flag = false;
function reset() {
  flag = false;
}
btnSearch.addEventListener("click", (e) => {
  flag = true;
  apiWeather(input.value);
});
function getLocationUser() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          x: position.coords.latitude,
          y: position.coords.longitude,
        });
      },
      () => {
        rej("Not Allowed me access Locations your please enable it 😊");
      }
    );
  });
}
async function getFirstWeather() {
  try {
    const { x, y } = await getLocationUser();
// console.log(x,y)
    const resCountry = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${x}+${y}&key=${apiKeyForCountry}&language=en`
    );
    // console.log(resCountry);
    if (!resCountry.ok) {
      throw new Error("Country Not Found");
    }
    const dataCountry = await resCountry.json();

    const country = dataCountry?.results[0]?.components?.town
      ? dataCountry?.results[0]?.components?.town
      : dataCountry?.results[0]?.components?.state;
    const resWeather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=363f0ee9576c4499974210006241012&q=${country}&days=3&aqi=no&alerts=no`
    );
    // console.log(resWeather);
    if (!resWeather.ok) {
      throw new Error("not found country with name that enter you 😐");
    }
    const dataWeather = await resWeather.json();
    display(dataWeather);
  } catch (err) {
    // console.log(err);
    if (err.toString().includes("Error")) {
      Swal.fire(err.toString().split(":")[1]);
    } else {
      Swal.fire(err);
    }
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
    // console.log(resWeather);
    if (resWeather.ok) {
      const dataWeather = await resWeather.json();
      console.log(dataWeather);
      display(dataWeather);
    }
    if (flag) {
      reset();
      throw new Error("not found country with name that enter you 😐");
    }
  } catch (err) {
    if(err.toString().includes("Error")){
      Swal.fire(err.toString().split(":")[1]);
    }
  }
}

function display(res) {
  let date = new Date(res?.current?.last_updated);
  let blackBox = "";
  blackBox += `
  <div class="col-md-4 dd">
            <div class="inner-weather">
              <div class="weather-title d-flex justify-content-between p-2">
                <span>${date.toString().split(" ")[0]}</span>
                <span>${date.toString().split(" ")[2]} ${date.toString().split(" ")[1]}</span>
              </div>
              <div class="weather-content">
              <span><b class=''text-white-50>country</b>:${res.location.country} </span>
                <h3>${res?.location?.name}</h3>
                <h4 class="h1">${res?.current?.temp_c}<sup>o</sup>c</h4>
                <div class="status">
                  <img id="img" src="https:${
                    res?.current?.condition?.icon
                  }" class="w-100 d-block" alt="" />
                </div>
                <span class='status-text mt-4'>${res?.current?.condition?.text}</span>
                <div class="icons d-flex mt-3 align-items-center gap-3">
                  <div class="icon">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${res?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-wind"></i> 
                    <span>${res?.current?.wind_kph}km/h</span>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-compass"></i>
                    <span>${res?.current?.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
  let days = res?.forecast?.forecastday;
  days = days?.slice(1);
  days?.forEach((e, i) => {
    let date = new Date(e?.date);
    date.toString().split(" ")[0];
    blackBox += `
    <div class="col-md-4 dd">
              <div class="inner-weather ${i == 0 ? "bg-card-2" : ""} text-center">
                <div class="weather-title ${
                  i == 0 ? "bg-card-t-2" : ""
                } d-flex justify-content-center p-2">
                  <span>${date?.toString().split(" ")[0]}</span>
                </div>
                <div class="weather-content">
                <div class="status my-5 mx-auto">
                  <img id="img" src="https:${
                    e.day?.condition?.icon
                  }" class="w-100 d-block" alt="" />
                </div>
                  <h5 class='c-h5'>${e.day?.maxtemp_c}<sup>o</sup>c</h5>
                  <h6 class='c-h6'>${e.day?.mintemp_c}<sup>o</sup>c</h6>
                  <span class='status-text'>${e.day?.condition?.text}</span>
                </div>
              </div>
            </div>
    `;
  });

  row.innerHTML = blackBox;
}

//api Key  363f0ee9576c4499974210006241012
// console.log(new Date("2024-12-11 00:30"));
// let c = new Date("2024-12-11 00:30");

// console.log(c.toString().split(' ')[1]);
// console.log(c.toString().split(' ')[2]);
// console.log(c.toString().split(' ')[0]);




(async function getAPi() {
  const res = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=363f0ee9576c4499974210006241012&q=cairo&days=2"
  );
  const data = await res.json();
  // document
  //   .querySelector("#img")
  //   .setAttribute("src", `https:${data.forecast.forecastday[0].day.condition.icon}`);
  console.log(data); // درحه الحراره الحاليه
  console.log(data.forecast.forecastday[0].day.maxtemp_c);
  console.log(data.forecast.forecastday[0].day.mintemp_c);
  console.log(data.forecast.forecastday[0].day.condition.icon);
  console.log(data.forecast.forecastday[0].day.condition.text);
})();

/*
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

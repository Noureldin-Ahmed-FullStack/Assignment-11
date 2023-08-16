var demo = new XMLHttpRequest()
var arr = []
var searchQuery = 'cairo'
var container = ``
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


demo.addEventListener('readystatechange', function () {
    if (demo.readyState == 4) {
        container = ``
        console.log(JSON.parse(demo.responseText));
        arr = JSON.parse(demo.responseText)
        // console.log(arr.forecast.forecastday[0].day.avgtemp_c)
        // console.log(arr.forecast.forecastday[0].day.avghumidity)
        // console.log(arr.forecast.forecastday[0].day.condition.text)
        // console.log(arr.forecast.forecastday[0].day.condition.icon)
        // console.log(arr.current.wind_dir)
        for (let index = 0; index < 3; index++) {
            console.log(arr.location.name)
            console.log(arr.forecast.forecastday[index].day.avgtemp_c)
            console.log(arr.forecast.forecastday[index].day.avghumidity)
            console.log(arr.forecast.forecastday[index].day.condition.text)
            console.log(arr.current.wind_dir)
            console.log(arr.current.wind_kph)
            console.log(arr.forecast.forecastday[index].day.condition.icon)
            var character = arr.current.wind_dir
            var dir
            switch (character) {
                case 'N':
                    dir = "North"
                    break;
                case 'E':
                    dir = "East"
                    break;
                case 'W':
                    dir = "West"
                    break;
                case 'S':
                    dir = "South"
                    break;
                default:
                    dir = character
                    break
            }



            var d = new Date(arr.forecast.forecastday[index].date)
            let day = weekday[d.getDay()];
            console.log(day)


            container += `
                
    <div class=" border bg-light col-md-4">
    <div class="bg-primary ">
      <h2 class="text-light text-center py-3">${day}</h2>
    </div>
    <div class="px-3">
      <div class="d-flex align-items-center ">
        <h6>${arr.location.name}</h6>
        <img src="https:${arr.forecast.forecastday[index].day.condition.icon}" alt="" width="90">
      </div>
      <h2 style="font-size: 60px;font-weight: 500;">${arr.forecast.forecastday[index].day.avgtemp_c}°C</h2>
      <p class="p-2 text-primary">${arr.forecast.forecastday[index].day.condition.text}</p>
    </div>
    <div class="d-flex p-3">          
      <span class="px-2"><img style="width: 20px;height: 20px;" src="Img/icon-umberella.png">
      ${arr.forecast.forecastday[index].day.avghumidity}%</span>
      <span class="px-2"><img style="width: 20px;height: 20px;" src="Img/icon-wind.png">
      ${arr.current.wind_kph}</span>
      <span class="px-2"><img style="width: 20px;height: 20px;" src="Img/compass.png">
      ${dir}</span>
    </div>
  </div>
            `


        }
        display()
    }

})
function display() {
    document.getElementById('MyRow').innerHTML = container
}

function init(){
    demo.open('get', 'https://api.weatherapi.com/v1/forecast.json?key=a8f4ff4038574f749e1213006231408&q='+searchQuery+'&days=3')
    demo.send()
}
init()
const searchInput = document.getElementById('MySearch');
function handleSearch() {
    searchQuery = searchInput.value.toLowerCase();
    console.log(searchQuery)
    init()
}
searchInput.addEventListener('keyup', handleSearch);


//http://api.weatherapi.com/v1/current.json?key=a8f4ff4038574f749e1213006231408&q=London
// a8f4ff4038574f749e1213006231408

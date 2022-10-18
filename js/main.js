var searchBtn = document.getElementById('searchbtn')

var todayCard = document.getElementById('today-card'),
    todayDate = document.getElementById('todayDate'),
    today = document.getElementById('today'),
    todaycity = document.getElementById('city'),
    todaydegree = document.getElementById('degree'),
    todayicon = document.getElementById('icon'),
    todaystatus = document.getElementById('status'),
    todayhumidty = document.getElementById('humidty'),
    todaywind = document.getElementById('wind'),
    todaycompass = document.getElementById('compass'),
    search = document.getElementById('search'),
    apiResponce,
    finalResult
// Next Days Wheather
var nextDay = document.getElementsByClassName('nextday'),
    nextDayIcon = document.getElementsByClassName('nextdayicon'),
    maxDegree = document.getElementsByClassName('max-degree'),
    minDegree = document.getElementsByClassName('min-degree'),
    nextDayStatus = document.getElementsByClassName('nextdaystatus'),

    MonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augeust', 'September', 'October', 'November', 'December'],
    daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

async function getWeather(currentCity = 'Cairo') {

    apiResponce = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f269981129ed454cb05135326221610&q=${currentCity}&days=3`)
    finalResult = await apiResponce.json()
    getCurrentWheather()
    getNextDayWeather()
    display()
}

getWeather()

function getCurrentWheather() {
    var date = new Date();
    today.innerHTML = daysName[date.getDay()];
    todayDate.innerHTML = `${MonthName[date.getMonth()]},${date.getDate()}`;
    todaycity.innerHTML = finalResult.location.name;
    todaydegree.innerHTML = `${finalResult.current.temp_c} <sup>o</sup>C`;
    todayicon.setAttribute('src', `https:${finalResult.current.condition.icon}`);
    todaystatus.innerHTML = finalResult.current.condition.text;
    todayhumidty.innerHTML = `${finalResult.current.humidity} <span>%</span>`;
    todaywind.innerHTML = `${finalResult.current.wind_kph}  <span> Km/h</span>`;
    todaycompass.innerHTML = finalResult.current.wind_dir;

    todaydegree.addEventListener('mouseenter', function () {

        todaydegree.innerHTML = `${finalResult.current.temp_f} <sup>o</sup>F`
    })
    todaydegree.addEventListener('mouseleave', function () {

        todaydegree.innerHTML = `${finalResult.current.temp_c} <sup>o</sup>C`
    })
}

function getNextDayWeather() {
    for (var i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = daysName[new Date(finalResult.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${finalResult.forecast.forecastday[i + 1].day.condition.icon}`)
        maxDegree[i].innerHTML = finalResult.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = finalResult.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayStatus[i].innerHTML = finalResult.forecast.forecastday[i + 1].day.condition.text;


    }



}

search.addEventListener('keyup', function () {
    currentCity = search.value;
    getWeather(currentCity)

})

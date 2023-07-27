const timeE1= document.getElementById('time');
const dateE1=document.getElementById('date');
const currentWeatherItemsE1=document.getElementById('current-weather-items');
const timezone= document.getElementById('time-zone');
const countryE1= document.getElementById('country');
const weatherForecastE1=document.getElementById('weather-forcast');
const currentTempE1=document.getElementById('current-temp');

const API_KEY='1060eecff6cccd9654417498a403c640'

const days=['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
setInterval(()=> {
    const time=new Date();
    const month=time.getMonth();
    const date =time.getDate();
    const day= time.getDay();
    const hour=time.getHours();
    const hoursin12hourformat= hour>=13 ? hour%12 : hour
    const minutes =time.getMinutes();
    const ampm=hour>=13 ? 'PM' : 'AM'

    timeE1.innerHTML = hoursin12hourformat +':'+minutes+`<span id="am-pm">
    ${ampm}
</span>`
dateE1.innerHTML=days[day] + ', ' + date+ ' ' +months[month]
},1000


);

getweatherdata();
function getweatherdata () {
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let{latitude,longitude}=success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherdata(data);
        })
    })

}

function showWeatherdata(data){
let{humidity,pressure,sunrise}=data.main;
let{speed}=data.wind;
currentWeatherItemsE1.innerHTML=
` <div class="weather-item">
<div>Humidity</div>
<div>${humidity}%</div>
</div>
<div class="weather-item">
<div>Pressure</div>
<div>${pressure}</div>
</div>
<div class="weather-item">
<div>Wind Speed</div>
<div>${speed}</div>
</div>
`;
}
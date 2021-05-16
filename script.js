const api = {
  key: "abfc92a96319d12ef70dd62c1015bde2",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
  if (evt.keyCode ==13){
    cityWeather(searchBox.value);
  }
}

async function cityWeather(cityName = "Toronto", country = "Canada") {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&units=metric&appid=79dadd3b33d816bcd23bc8a1bfb1cbd6`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const weatherCityName = weatherData.name;
    const weatherState = weatherData.sys.country;
    const weatherLocation = weatherCityName+", "+ weatherState;
    document.querySelector('.city').innerHTML=weatherLocation;
    const currentTemp = Math.round(weatherData.main.temp);
    document.querySelector('.temp').innerHTML=currentTemp+'°';
    const weather = weatherData.weather[0].main;
    const description = weatherData.weather[0].description;
    let emoj = weatherEmojiMaker(weather);
    document.querySelector('.weather').innerHTML=weather+" "+emoj;
    weatherEmojiMaker(weather);
    let nowDate = new Date(); 
    let date = nowDate.toDateString()
    document.querySelector('.date').innerHTML=date;
    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${Math.round(weatherData.main.temp_min)}°C / ${Math.round(weatherData.main.temp_max)}°C`;
    displayWeather();
  } catch (err) {
    console.error(err);
    alert("Search not found. Try again..");
  }
}

function weatherEmojiMaker(weather){
  if (weather == "Clouds"){
    weatherEmoji = '☁️';
    return weatherEmoji;
  } else if (weather == "Clear"){
    weatherEmoji = '☀️';
    return weatherEmoji;
  }
  else if (weather == "Rain"){
    weatherEmoji = '🌧️';
    return weatherEmoji;
  }
  else if (weather == "Drizzle"){
    weatherEmoji = '🌧️';
    return weatherEmoji;
  }
  else if (weather == "Thunderstorm"){
    weatherEmoji = '🌩️';
    return weatherEmoji;
  }
  else if (weather == "Snow"){
    weatherEmoji = '❄️';
    return weatherEmoji;
  }
  else if (weather == "Fog"){
    weatherEmoji = '🌫️';
    return weatherEmoji;
  }
  else {
    return weatherEmoji = '🌫️';
  }
};

cityWeather();

function displayWeather (){
  const data = document.getElementsByClassName('info');
  Array.from(data).forEach((div)=> {
  if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      div.offsetWidth;
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  });
}

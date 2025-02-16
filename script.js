const apiKey = '4ab434ff44164fb7970130846251602'; // Your WeatherAPI key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

async function fetchWeather(city) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      alert(data.error.message);
    } else {
      displayWeather(data);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  const { name, region, country } = data.location;
  const { temp_c, humidity, wind_kph, condition } = data.current;

  weatherInfo.innerHTML = `
    <h2>${name}, ${region}, ${country}</h2>
    <p>Temperature: ${temp_c}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${wind_kph} km/h</p>
    <p>Condition: ${condition.text}</p>
    <img src="${condition.icon}" alt="${condition.text}">
  `;
  weatherInfo.style.display = 'block';
}
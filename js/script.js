const cityInput = document.querySelector('#city-name');
const weatherButton = document.querySelector('.btn-weather');
const apiLink = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f4cb0a454cc412cc398b1d00e17a7fc7';
const outputCity = document.querySelector('.output-city span');
const outputWeather = document.querySelector('.output-weather span');
const outputTemp = document.querySelector('.output-temperature span');
const loader = document.querySelector('.load span');

weatherButton.addEventListener('click', () => {
    const cityValue = cityInput.value;

   if (cityValue == '') {
       alert("input the city name");
   } else {
       const fetchUrl = apiLink + '?q=' + cityValue + '&appid=' + apiKey;

       loader.removeAttribute('hidden');

       fetch(fetchUrl)
           .then(data => data.json())
           .then(data => {
               if (data.cod == 404) {
                   alert('Something went wrong!!!');
               } else {
                   outputCity.innerText = data.name;
                   outputWeather.innerHTML = data.weather[0].description;
                   outputTemp.innerHTML = ((data.main.temp - 273.15) > 0 ? "+" : "") + Math.round(data.main.temp - 273.15);
               };
           })
           .catch(error => alert('Something went wrong!!!'))
           .finally(() => {
               loader.setAttribute('hidden', 'hidden');
           })
   }
});
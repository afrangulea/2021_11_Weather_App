

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



const updateUI = (data) => {

  // const cityDetails = data.cityDetails;
  // const weather = data.weather;


  //destructure properties

  const { cityDetails, weather} = data;


  //update details template

  details.innerHTML = `
  <div class="text-muted text-uppercase text-center details">
  <h5 class="my-3">${cityDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  </div>
  `;


  //update images

  const iconSrc= `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);


  let timeSrc = null;
  timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  // if(weather.IsDayTime){
  //   timeSrc = 'img/day.svg';
  // }
  //   else{ timeSrc = 'img/night.svg';}
  time.setAttribute('src', timeSrc);



//remove d-none if present
if(card.classList.contains('d-none')){
  card.classList.remove('d-none');
}
};

const updateCity = async (city) => {
  // console.log(city);
const cityDetails = await getCity(city);
const weather = await getWeather(cityDetails.Key);

return {
  cityDetails: cityDetails,
  weather: weather
}

};

//handle data submitted into form
cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update UI with new city
    updateCity(city)
    .then(data=> updateUI(data))
    .catch(err => console.log(err));
    
});   
 



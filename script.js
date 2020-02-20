//Функционал:
//По вводу названия города или выбора города на карте отправлять 
//запрос на погодный АПИ и выводить на экран полученный ответ.

// ========================jquery==================
  var map;
  var geo;
      function initMap() {
        geo = new google.maps.Geocoder();
          var opt = {
            zoom: 8, 
          center : {
            lat: -34.397, 
            lng: 150.644
          }    
        }
        map = new google.maps.Map(document.getElementById('map'),opt);
      }
     
//============================
// var takeRequest = document.querySelector('#take-request');
// takeRequest.addEventListener('click', () => {
//   const obj = {};
//   obj.city = city.value;
//   obj.weather = weather.value;
//   obj.temperature = temperature.value;
//   obj.wind = wind.value;

//   //textarea.value = JSON.stringify(obj);
// });



//========spiner============
const spinner = document.querySelector('.spinner');

spinner.removeAttribute('hidden');
fetch('https://swapi.co/api/people/1')
  .then(data => data.json())
  .then(data => {
    document.querySelector('#output').innerText = JSON.stringify(obj);
  })
  .catch(error => console.log(new Error(error)))
  .finally(() => {
    console.log('Probe');
    spinner.setAttribute('hidden', 'hidden');
  })
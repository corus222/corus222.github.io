//Функционал:
//По вводу названия города или выбора города на карте отправлять 
//запрос на погодный АПИ и выводить на экран полученный ответ.
//==================button click=============
const city = document.querySelector('.input');
const btn = document.querySelector('.button');
const spinner = document.querySelector('.spinner');

btn.addEventListener('click', () => {
   const objCity = city.value;

console.log(objCity);

//====================fetch запрос на сервер погоды=========================
spinner.removeAttribute('hidden');
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=c10fec2705b215901a5708ab8bc2cd2f`)

.then(function  (resp) {return resp.json() }) //convert data to json
  .then(function (data) {
      console.log(data);
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temperature').innerHTML = Math.round(data.main.temp-273) + '&deg;';
      document.querySelector('.status').textContent = data.weather[0].main;
      document.querySelector('.wind').innerHTML = data.wind.speed + 'm/s' + data.wind.deg +'&deg;';
  })
  .catch(function () {
    //catch errors
  })
  .finally(() => {
    console.log('request finish ok');
    spinner.setAttribute('hidden', 'hidden');
  })
})
  
// ===========map insert==================

function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener('tap', function (evt) {
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
    logEvent('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
        ((coord.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(coord.lng.toFixed(4)) +
         ((coord.lng > 0) ? 'E' : 'W'));
         
         console.log(coord.lat);
         console.log(coord.lng);
         const coordLat = Math.abs(coord.lat.toFixed(0));
         const coordLng = Math.abs(coord.lng.toFixed(0));
         console.log(coordLat);
         console.log(coordLng);
         spinner.removeAttribute('hidden');
//==================API for coordinates==============================

fetch(`https:/api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLng}&appid=c10fec2705b215901a5708ab8bc2cd2f`)

.then(function  (resp) {return resp.json() }) //convert data to json
  .then(function (data) {
      console.log(data);
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temperature').innerHTML = Math.round(data.main.temp-273) + '&deg;';
      document.querySelector('.status').textContent = data.weather[0].main;
      document.querySelector('.wind').innerHTML = data.wind.speed + 'm/s' + data.wind.deg +'&deg;';
  })
  .catch(function () {
    //catch errors
  })
  .finally(() => {
    console.log('request finish ok');
    spinner.setAttribute('hidden', 'hidden');
  })
  });
}
//const lat = coordLat;
//console.log(coordLat);
//console.log(coordLng);
// Boilerplate map initialization code starts below:


//Step 1: initialize communication with the platform

var platform = new H.service.Platform({
  'apikey': '{w87CK2PGqu_DsWgSNdsZ0PBm8IT6xJj_KWNYONcK5Nc}'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 46.9654, lng: 31.9896},
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive"
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: create custom logging facilities
var logContainer = document.createElement('ul');
logContainer.className ='log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
map.getElement().appendChild(logContainer);

// Helper for logging events
function logEvent(str) {
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = str;
  logContainer.insertBefore(entry, logContainer.firstChild);
  


}

setUpClickListener(map);





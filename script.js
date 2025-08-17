const button = document.getElementById('get-location-button')



async function getData(lat,long){
   const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=862e76c24e2e4ffb893144912251608&q=${lat},${long}&aqi=yes`)

   return await promise.json();

  }
async function gotLocation(position){
  console.log(position)

  //get weather data
const result=await getData(position.coords.latitude,position.coords.longitude);
console.log(result);

  // ✅ Fix typo: latitude (not lattitude)
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;


  // show coordinates on page
  output.innerHTML = `
    <p><b>Latitude:</b> ${lat}</p>
    <p><b>Longitude:</b> ${lon}</p>
  `;
  //
  
//

  // show weather on page
  if (result && result.location) {
    output.innerHTML += `
      <h3>Weather Info</h3>
      <p><b>Location:</b> ${result.location.name}, ${result.location.region}</p>
      <p><b>Temperature:</b> ${result.current.temp_c} °C</p>
      <p><b>Condition:</b> ${result.current.condition.text}</p>
    `;
  } else {
    output.innerHTML += `<p>Unable to fetch weather data</p>`;
  }
}








function failedToGet(){
  console.log('There was some issue')
}

button.addEventListener('click',async () =>{
  navigator.geolocation.getCurrentPosition(gotLocation,failedToGet)
  

})
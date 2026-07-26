
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "56dbdcee68009f10af45a35605590c4f";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a City");
    }

});
async function getWeatherData(city){
  const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const response=await fetch(apiurl);
  console.log(response);
  if(!response.ok){
    throw new Error("Could not fetch data");
  }
  return await response.json();
}
function displayWeatherInfo(data){
    const {name:city,main: {temp,humidity},weather:[{description,id}] }=data;  
           
    card.textContent="";
    card.style.display = "flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${((temp-273.15)*(9/5) +32).toFixed(1)}°F`;
    humidityDisplay.textContent=`Humidity: ${humidity}`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("citydisplay");
    tempDisplay.classList.add("tempdisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatheremoji");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);


}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300):
            return "⚡️";
        case(weatherId>=300&& weatherId<400):
            return "🌧️";
        case(weatherId>=500&& weatherId<600):
            return "🌨️";
        case(weatherId>=600&& weatherId<700):
            return "❄️";
        case(weatherId>=700&& weatherId<800):
            return "🌁"; 
        case(weatherId===800):
            return "🌞";  
         case(weatherId>=801&& weatherId<810):
            return "☁️";  
        default:
            return "❓" ;

        }
    }


function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errordisplay");

    card.textContent= "";
    card.style.display= "flex";
    card.appendChild(errorDisplay)


}
 
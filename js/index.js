let cardOne = document.querySelector("#cardOne");
let cardTwo = document.querySelector("#cardTwo");
let cardThree = document.querySelector("#cardThree");


let actualDate = new Date();
let day = actualDate.getDate();
let month = actualDate.getMonth();
let year = actualDate.getFullYear();


let nameOfTheDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayOfTheWeek = actualDate.getDay();
let nameOfTheDay = nameOfTheDays[dayOfTheWeek];

let day2 = nameOfTheDays[(dayOfTheWeek + 1) % 7];
let day3 = nameOfTheDays[(dayOfTheWeek + 2) % 7];


let nameOfTheMonths = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];
let numberOfTheMonth = actualDate.getMonth();
let nameOfTheMonth = nameOfTheMonths[numberOfTheMonth];

//! Actual Weather (Day 1)
async function actualWeather(result) {
    let blackBox = "";
    blackBox += `<div class="card-header border-0 rounded-end-0 d-flex justify-content-between">

        <p id="day">${nameOfTheDay}</p>
        <p id="date">${day}${nameOfTheMonth}</p>

    </div>

    <div class="card-body text-success d-flex justify-content-between align-items-center">

        <div class="card-content">

            <h5>${result.location.name}</h5>
            <h1 class="text-white">${result.current.temp_c}<sup>o</sup>C</h1>
        </div>

        <div class="icon">
                    
                <img src="${result.current.condition.icon}" alt="">
                            </div>
                        </div>
                    
                        <div class="custom">
                            <p class="weatherCondation">${result.current.condition.text}</p>
                            <span><img src="./images/icon-umberella@2x.png" alt="">${result.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                            <span><img src="./images/icon-wind@2x.png" alt="">${result.current.wind_kph}km/h</span>
                            <span><img src="./images/icon-compass@2x.png" alt="">${result.current.wind_dir}</span>
                        </div> 
    </div>

`;
    cardOne.innerHTML = blackBox;
}

//! Day 2
async function secondCard(result) {
    let blackBox = "";
    blackBox += `
    <div class="card-header middle-card border-0 rounded-top-0 text-center">

             <p id="day">${day2}</p>
         </div>
    
         <div class="card-body text-success ">
    
             <div class="icon">
                 <img src="${result.forecast.forecastday[1].day.condition.icon}" alt="">
         </div>
    
         <div class="card-content">
             <h4 class="text-white" >${result.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h4>
             <small class="text-white" >${result.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
         </div>
     </div>
    
        <div class="custom mb-5">
            <p class="weatherCondation">${result.forecast.forecastday[1].day.condition.text}</p>
        </div>

`;

    cardTwo.innerHTML = blackBox;
}

//! Day 3
async function thirdCard(result) {
    let blackBox = "";
    blackBox += `
    <div class="card-header border-0 rounded-start-0 text-center">

         <p id="day">${day3}</p>

     </div>
     <div class="card-body text-success ">

         <div class="icon">

             <img src="${result.forecast.forecastday[2].day.condition.icon}" alt="">
    
         </div>

         <div class="card-content">
        
             <h4 class="text-white" >${result.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h4>
             <small class="text-white" >${result.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
         </div>
    
     </div>

     <div class="custom mb-5">
         <p class="weatherCondation">${result.forecast.forecastday[2].day.condition.text}</p>
     </div>
    
    `;

    cardThree.innerHTML = blackBox;
}

//! Display
async function display(callBack) {
    let myHttp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=de8028f121794cd381c81337233012&q=${callBack ? callBack : "egypt"}&days=3&aqi=no&alerts=no`);
    let result = await myHttp.json();
    // console.log(result);                                                                               
    await actualWeather(result);
    await secondCard(result);
    await thirdCard(result);
}

display();

//! Search
let searchBtn = document.getElementById("searchBtn").addEventListener('click', () => {
    let country = document.getElementById("countrySearch").value;
    display(country);
});
let input = document.getElementById("countrySearch").addEventListener('input', () => {
    let country = document.getElementById("countrySearch").value;

    display(country);
})










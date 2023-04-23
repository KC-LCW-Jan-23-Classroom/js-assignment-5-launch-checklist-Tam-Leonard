// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star} </li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src= "${imageUrl}"> `;
}

function validateInput(userInput) {
    if (userInput === '') {
        return 'Empty';
    } else if (isNaN(userInput)) {
    return 'Not a Number';
    } else if (!isNaN(Number(userInput))) {
        return 'Is a Number';
    }
 }

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let launchStatus = document.getElementById('launchStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   

   if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
    alert('All fields required!');
   } else if(validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
    alert('Enter valid info for each of the fields!');
   } else {
    list.style.visablity = "visable";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }
   
   if(Number(fuelLevel) < 10000){
    list.style.visablity = "visable";
    fuelStatus.innerHTML  = 'Fuel level too low for launch';
    launchStatus.innerHTML = 'Shuttle not ready for launch';
    launchStatus.style.color = '#FF0000';
   } else if(Number(cargoLevel) > 10000){
    list.style.visablity = "visable";
    cargoStatus.innerHTML  = 'Too much mass for the shuttle to take off';
    launchStatus.innerHTML = 'Shuttle not ready for launch';
    launchStatus.style.color = '#FF0000';
   } else if(Number(fuelLevel) >= 10000 && Number(cargoLevel) <= 10000) {
    launchStatus.innerHTML = 'Shuttle is ready for launch';
    launchStatus.style.color = '#00FF00';
  }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then( function(response) {
       return response.json();
     });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

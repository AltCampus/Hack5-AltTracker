const teamName = document.querySelector("#team-name");
const taskName = document.querySelector("#task-name");
const teamMembers = document.querySelector("#team-members");
const memberSubmit = document.querySelector("#member-submit");
const submitTeam = document.querySelector(".submit__btn");
const eventBtn = document.querySelector(".event__btn");
const eventName = document.querySelector("#event-name");
const addMoreTeams = document.querySelector(".team__btn__more");
const displayMembers = document.querySelector(".member-lists");

let event = {
  event_name: "",
  teams: []
};

var newArr = [];


function addEvent(e) {
  e.preventDefault();
  var eventBlock = document.querySelector(".event");  
  
  event.event_name = eventName.value;
  event.date = String(new Date());
  eventBlock.style.display = "none";

  var teamBlock = document.querySelector(".input-team");
  teamBlock.style.display = "block";  
}


function addTeams(e) {
  
  e.preventDefault();
  
  var eventNameDisplay = document.querySelector('.event-name-display');
  eventNameDisplay.textContent = event.event_name + " Event";
  
  let team = teamName.value;
  let tName = taskName.value;  
  
  
  event.teams.push({teamMembers: newArr, team_name: team , team_task: tName, done: false });

  newArr = [];

  teamName.value = "";
  taskName.value = "";

}

function addMembers(e) {
  e.preventDefault();
  var newDiv = document.createElement("div");
  var i = document.createElement("i");
  
  newDiv.textContent = teamMembers.value;
  i.className = "fas fa-user-minus";

  newArr.push(teamMembers.value);
  displayMembers.appendChild(newDiv);
  displayMembers.appendChild(i);
  
  teamMembers.value = "";
}

function submitEvent(e) {
  e.preventDefault();

  fetch('http://192.168.0.118:4001/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });

  fetch('http://192.168.0.118:4001/').then(d => d.json()).then(d => console.log(d));

  console.log("Submitted: " + event);
  
}

addMoreTeams.addEventListener("click", addTeams);
eventBtn.addEventListener("click", addEvent);
memberSubmit.addEventListener("click", addMembers);
submitTeam.addEventListener("click", submitEvent);
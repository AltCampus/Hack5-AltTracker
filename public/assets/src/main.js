const teamName = document.querySelector("#team-name");
const taskName = document.querySelector("#task-name");
const teamMembers = document.querySelector("#team-members");
const memberSubmit = document.querySelector("#member-submit");
const submitTeam = document.querySelector(".input-team__btn");
const eventBtn = document.querySelector(".event__btn");
const eventName = document.querySelector("#event-name");
const addMoreTeams = document.querySelector(".team__btn");
const displayMembers = document.querySelector(".member-lists");

let event = {
  eName: "",
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
  eventNameDisplay.textContent = event.eName;
  
  let team = teamName.value;
  let tName = taskName.value;  

  
  event.teams.push({teamMembers: newArr, team_name: team , team_task: tName, done:false });

  newArr = [];

  // teamName.value = "";
  // taskName.value = "";

}

function addMembers(e) {
  e.preventDefault();
  var h4 = document.createElement("h4");
  
  h4.textContent = teamMembers.value;
  newArr.push(teamMembers.value);  
  displayMembers.appendChild(h4);
  
  teamMembers.value = "";
}

addMoreTeams.addEventListener("click", addTeams);
eventBtn.addEventListener("click", addEvent);
memberSubmit.addEventListener("click", addMembers);
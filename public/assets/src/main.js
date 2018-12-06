const teamName = document.querySelector("#team-name");
const taskName = document.querySelector("#task-name");
const teamMembers = document.querySelector("#team-members");
const memberSubmit = document.querySelector("#member-submit");
const submitTeam = document.querySelector(".submit__btn");
const eventBtn = document.querySelector(".event__btn");
const eventName = document.querySelector("#event-name");
const addMoreTeams = document.querySelector(".team__btn__more");
const displayMembers = document.querySelector(".member-lists");
const eventBlock = document.querySelector(".event");  
const teamBlock = document.querySelector(".input-team");
const ongoingEvents = document.querySelector(".ongoing-events");

var newArr = [];

let event = {
  event_name: "",
  teams: []
};

function addEvent(e) {
  e.preventDefault();
  
  
  event.event_name = eventName.value;
  event.date = String(new Date());
  
  teamBlock.style.display = "block";  
  eventBlock.style.display = "none";
  ongoingEvents.style.display = "none";

  var eventNameDisplay = document.querySelector('.event-name-display');
  eventNameDisplay.textContent = event.event_name + " Event";
}


function addTeams(e) {
  
  e.preventDefault();
  
  
  let team = teamName.value;
  let tName = taskName.value;  
  
  console.log(newArr);
  
  event.teams.push({teamMembers: newArr, team_name: team , team_task: tName, done: false });

  
  teamName.value = "";
  newArr = [];
}

function addMembers(e) {
  e.preventDefault();
  var newDiv = document.createElement("div");
  // var i = document.createElement("i");
  
  newDiv.textContent = teamMembers.value;
  // i.className = "fas fa-user-minus";

  newArr.push(teamMembers.value);
  displayMembers.appendChild(newDiv);
  // displayMembers.appendChild(i);
  
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

  console.log("Submitted: ", event);

  teamBlock.style.display = "none";  
  eventBlock.style.display = "block";
  ongoingEvents.style.display = "block";  
}

addMoreTeams.addEventListener("click", addTeams);
eventBtn.addEventListener("click", addEvent);
memberSubmit.addEventListener("click", addMembers);
submitTeam.addEventListener("click", submitEvent);
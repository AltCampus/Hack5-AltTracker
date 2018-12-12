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
const displayEventList = document.querySelector("#display__events")
var eventList = [];
var newArr = [];

let event = {
  event_name: "",
  teams: []
};

function addEvent(e) {
  e.preventDefault();
    
  if ( /^ *$/.test(eventName.value)) return;

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

  displayMembers.textContent = "";
  
  let team = teamName.value;
  let tName = taskName.value;  

  event.teams.push({teamMembers: newArr, team_name: team , team_task: tName, done: false });

  console.log("add teams ", event);
  
  teamName.value = "";
  taskName.value = "";
  newArr = [];
}

function addMembers(e) {
  e.preventDefault();
  var parentDiv = document.createElement("div")
  var childSpan = document.createElement("span");
  var childI = document.createElement("i");
  
  childSpan.textContent = teamMembers.value;
  parentDiv.className = "member-display-list";
  childSpan.className = "member-list-in"
  childI.className = "delete-member far fa-window-close";
  
  newArr.push(teamMembers.value);
  
  displayMembers.appendChild(parentDiv);
  parentDiv.appendChild(childSpan);
  parentDiv.appendChild(childI);
  
  var memberDelete = document.querySelectorAll(".delete-member");

  for (item of memberDelete) {
    item.addEventListener("click", removeMember);
  }

  teamMembers.value = "";
}

function removeMember(e) {  
  var deleteIndex = newArr.indexOf(this.previousElementSibling.innerText);
  var node = e.target.parentNode;

  newArr.splice(deleteIndex, 1);
  node.parentNode.removeChild(node);
}

function submitEvent(e) {
  e.preventDefault();

  let team = teamName.value;
  let tName = taskName.value;  
  event.teams.push({teamMembers: newArr, team_name: team , team_task: tName, done: false });

  
  fetch('http://192.168.43.69:4001/api/event', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  }).then(d => d.json()).then(d => {
    eventList = [];
    eventList = d; 
    displayEvent(eventList)
  });  
  
  displayMembers.textContent = "";
  teamName.value = "";
  taskName.value = "";
  eventName.value = "";

  teamBlock.style.display = "none";  
  eventBlock.style.display = "block";
  ongoingEvents.style.display = "block";  
}



fetch('http://192.168.43.69:4001/api/events').then(d => d.json()).then(d => {eventList = d; displayEvent(eventList)});
function displayEvent(d){
  displayEventList.textContent = "";
  d.forEach(v=>{
    var li = document.createElement("li");
    var a = document.createElement("a");

    li.className = "ongoing-events__list";    
    li.appendChild(a);

    a.textContent = `${v.event_name}`;
    displayEventList.appendChild(li);
  });
}


addMoreTeams.addEventListener("click", addTeams);
eventBtn.addEventListener("click", addEvent);
memberSubmit.addEventListener("click", addMembers);
submitTeam.addEventListener("click", submitEvent);
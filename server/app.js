const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


const port = 4001;

mongoose.connect('mongodb://localhost/altTracker',{ useNewUrlParser: true },  function(err, connection) {
  if(err) throw err
  else console.log('Connected to mongodb')
});

const event = new mongoose.Schema({
	event_name: String,
	teams: [
		{
				team_name: String,
				teamMembers: [String],
				team_task: String
		}
	]  
})

const Event = mongoose.model('Event', event);


app.get('/', (req, res) => {
	Event.find({}, (err, data) => {
			return res.send(data)
	}) 
})

app.post('/', (req, res) => {
	const data = req.body;
	const newEvent = new Event(data);
	
	newEvent.save((err, data) => {
			if(err) throw err;
			Event.find({}, (err, data) => {
					return res.send(data)
			})
	})
})

app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})
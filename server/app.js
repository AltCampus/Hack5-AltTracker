const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

function errLog(req, res, next) {
	let errStr = `Method - ${req.method} , URL - ${req.url}, Date - ${new Date()} \n`;

	fs.appendFile('err.text', errStr, (err, done) => {
		if(err) throw err;
	})
	next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(errLog)


const port = 4001;

mongoose.connect('mongodb://localhost/altTracker',{ useNewUrlParser: true },  function(err, connection) {
  if(err) throw err
  else console.log('Connected to mongodb')
});

const event = new mongoose.Schema({
	event_name: String,
	date : String,
	teams: [
		{
			team_name: String,
			teamMembers: [String],
			team_task: String,
			done : Boolean
		}
	]  
})

const Event = mongoose.model('Event', event);

app.get('/', (req, res) => {
	Event.find({}, (err, data) => {
		if(err) return res.sendStatus(404);
		return res.json(data)
	}) 
})

app.post('/', (req, res) => {
	const data = req.body;
	const newEvent = new Event(data);
	
	newEvent.save((err, data) => {
			if(err) {
				return res.sendStatus(404);
			} else {
				Event.find({}, (err, data) => {
					return res.json(data)
				})
			}
	})
})

app.get('/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);

	Event.findOne({_id : id}, (err, data) => {
		if(data) {
			res.json(data)
		}else {
			res.sendStatus(404);
		}
	})

})

app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})
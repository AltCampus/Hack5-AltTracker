const express = require("express");
const app = express();
const mongoose = require('mongoose');

const port = 4400;

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
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
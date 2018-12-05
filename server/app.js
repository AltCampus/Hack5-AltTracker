const express = require("express");
const app = express();

const port = 4400;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(express.static('out'));

app.use(cors());

app.get("/NCEAStudy/Contact", function (req, res) {
    res.send("very cool");
})

app.get("/NCEAStudy/QuizTemplate", function (req, res) {
    // Gets the json file full of juicy question data


    res.send("Quiz Template");
})

app.listen(3000)

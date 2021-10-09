const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

function getFileText(pageName) {
    return fs.readFileSync("out/testData/" + pageName + ".json", {encoding: "utf-8", flag: "r"});
}

function loadTestData(){
    return getFileText("questions");
}

app.use(express.static('out'));

app.use(cors());

app.get("/NCEAStudy/Contact", function (req, res) {
    res.send("very cool");
})

app.get("/NCEAStudy/QuizTemplate", function (req, res) {
    // Gets the json file full of juicy question data
    let data = loadTestData();



    //res.send("Quiz Template");
    res.json(JSON.parse(data));
})

app.listen(8080)

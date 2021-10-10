const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path =require('path');

const port = 3000;

function getFileText(pageName) {
    return fs.readFileSync("out/testData/" + pageName + ".json", {encoding: "utf-8", flag: "r"});
}

function loadTestData() {
    return getFileText("questions");
}

app.use(cors());
app.use(express.static("out/"))

app.get("/questions", function (req, res) {
    // Gets the json file full of juicy question data
    let data = loadTestData();

    console.log(data);

    res.json(JSON.parse(data));
})

app.get("/quiz_template", function (req, res) {
    res.sendFile(path.join(__dirname + "/../out/quiz_template.html"));
})

app.get("/subjects", function (req, res) {
    res.sendFile(path.join(__dirname + "/../out/subjects.html"));

});

app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname + "/../out/contact.html"));

});

console.log("Home Page:  http:/localhost:" + port + "/subjects")

app.listen(port)



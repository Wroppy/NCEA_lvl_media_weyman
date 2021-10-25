const express = require('express');
const app = express();
const cors = require('cors');
const {join} = require('path');

const port = 3000;

const h = require("./helper");
const helpers = new h();

app.use(cors());
app.use(express.static("out/"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Sends the contact.html page when requested
app.get("/contact", function (req, res) {
    res.sendFile(join(__dirname + "/../out/contact.html"));
});

// When data has been sent here, it will email me the name and body
app.post("/contact_email", function (req, res) {
    console.log(req.body);
    const promise = helpers.sendEmail(req.body.name, req.body.message);

    // Sends promise to client
    promise.then(response => {
        res.json({response})
    });
});

app.get("/subjects", function (req, res) {
    res.sendFile(join(__dirname + "/../out/subjects/subjects.html"));
});

// Creates get and post requests for the quizzes
const PAGES = ["algebra", "test", "calculus"]
for (let page of PAGES) {
    // Sends the client html pages
    let url = "/subjects/" + page
    app.get(url, function (req, res) {
        res.sendFile(join(__dirname + "/../out/subjects/quiz_template.html"));
    })

    // Sends the client question data
    let questionUrl = url + "_questions"
    app.get(questionUrl, function (req, res) {
        // Returns a json file
        let data = helpers.getJsonData(page);
        res.json(JSON.parse(data.toString()));
    })
}

app.get("/custom", function (req, res) {
    res.sendFile(join(__dirname + "/../out/custom/custom.html"));
});

app.get("/template_navbar", function (req, res) {
    let navbarPages = [
        {"text": "Subjects", "icon": "icon-books_black", "url": "subjects"},
        {"text": "Custom", "icon": "icon-cards_question_black", "url": "custom"},
        {"text": "Contact", "icon": "icon-envelope_black", "url": "contact"}
    ];
    res.json(JSON.parse(JSON.stringify({"data": navbarPages})));
});

app.get("/custom/create", function (req, res) {
    res.sendFile(join(__dirname + "/../out/custom/create_quiz.html"));
});

console.log("Home Page: http://localhost:" + port + "/subjects/");

app.listen(port)



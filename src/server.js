const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mailer = require('nodemailer');

const port = 3000;

function sendEmail(name, message) {
    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'weymanbusiness@gmail.com',
            pass: 'zavojufrehscdqbw',
        }
    });

    let mailOptions = {
        from: 'weymanbusiness@gmail.com',
        to: 'weymanbusiness@gmail.com',
        subject: name,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function getFileText(pageName) {
    return fs.readFileSync("out/testData/" + pageName + ".json", {encoding: "utf-8", flag: "r"});
}

function loadTestData() {
    return getFileText("questions");
}

app.use(cors());
app.use(express.static("out/"));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

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

// Sends the contact.html page when requested
app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname + "/../out/contact.html"));
});

// When data has been sent here, it will email me the name and body
app.post("/contact", function (req, res) {
    console.log(req.body);
    sendEmail(req.body.name, req.body.message);
    res.json({"message": "message"})

});


console.log("Home Page:  http://localhost:" + port + "/subjects")

app.listen(port)



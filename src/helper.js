// This file contains some nessesary helper functions for the website
// This is split out in order to reduce the amount of code in the server.js file, as it should only handle the server

const mailer = require("nodemailer");
const fs = require("fs");

module.exports = class Helpers {
    constructor() {
        this.characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.charactersLength = this.characters.length;
        this.password = JSON.parse(this.getStuff()).password;
    }

    // Returns an 8 character keycode
    getGeneratedCode() {
        const keycodeLength = 8;

        let keycode = "";
        for (let i = 0; i < keycodeLength; i++) {
            let randomChar = this.characters[this.getRandomInt(0, this.charactersLength)];
            keycode += randomChar;
        }

        return keycode;
    }

    // Gets a random integer given the min and max. The maximum is exclusive
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Sends an email to myself.
    // Does not work on school wifi
    // https://www.w3schools.com/nodejs/nodejs_email.asp
    // Returns a promise
    sendEmail(name, message) {
        let transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'weymanbusiness@gmail.com',
                pass: this.password
            }
        });

        let mailOptions = {
            from: 'weymanbusiness@gmail.com',
            to: 'weymanbusiness@gmail.com',
            subject: name,
            text: message
        };

        // Returns a promise object that uses the transporter to send an email.
        return new Promise(function (resolve) {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    resolve(false);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }

            });
        });

    }

    // Returns json data given the filename
    getQuestionData(fileName) {
        return fs.readFileSync("out/data/questions/" + fileName + ".json", {encoding: "utf-8", flag: "r"});
    }

    // Returns json data of custom quizzes
    getCustomQuizData() {
        return fs.readFileSync("out/data/custom_quizzes.json", {encoding: "utf-8", flag: "r"})
    }

    // Gets the password
    getStuff() {
        return fs.readFileSync("token.json", {encoding: "utf-8", flag: "r"});
    }

    // Adds the quiz data to the custom quizzes file
    addQuizToData(quizData) {
        let customQuizzes = JSON.parse(fs.readFileSync("out/data/custom_quizzes.json", {encoding: "utf-8", flag: "r"}));

        customQuizzes[this.getGeneratedCode()] = quizData;

        fs.writeFileSync("out/data/custom_quizzes.json", JSON.stringify(customQuizzes))
    }


}

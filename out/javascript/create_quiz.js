function main() {
    const questionTabClasses = "nt-custom__sidebar-tab nt-custom__question-button";
    let questions = []

// let questions = [{"question": null, "answers": [null, null, null, null], "answer": 0}]

    function questionTabClicked(i) {
        // Updates the question
        updateQuestion();

        // Changes the .active class to set a hover effect on the clicked question tab
        setActiveTab(i)

        // Updates the question title, and answers
        updateQuestionDisplay(i);
    }

    // Gives the add and create divs a function when clicked
    // This is used in conjunction with removeButtonFunctions()
    function giveButtonFunctions() {
        document.getElementById("nt-custom__add-question").onclick = addQuestionButtonClicked;

        document.getElementById("nt-custom__create-quiz").onclick = createQuizButtonClicked;
    }

    // Removes the functions from the buttons
    // Will most likely be called the server is processing the quiz data send
    // This is used in conjunction with giveButtonFunctions()
    function removeButtonFunctions() {
        document.getElementById("nt-custom__add-question").onclick = ()=>{};

        document.getElementById("nt-custom__create-quiz").onclick = ()=>{};
    }

    // Gets question text data that the user has inputted into its textarea
    // Returns a string
    function getQuestionText() {
        let questionText = document.getElementById("nt-create__question-text-box").value.trim();
        if (questionText.length === 0) {
            questionText = null;
        }
        return questionText;
    }

    // Gets the answer text from each input box and pushes it to an array
    // Returns array of strings
    function getAnswers() {
        // Gets each answer from the inputs
        let inputs = document.getElementsByClassName("nt-custom__answer-input");
        let answers = [];
        for (let i = 0; i < inputs.length; i++) {
            let text;
            if (inputs.item(i).value.trim().length === 0) {
                text = null
            } else {
                text = inputs.item(i).value.trim();
            }
            answers.push(text);
        }
        return answers;
    }

    // Gets the index of the radio button that has been checked as the answer
    // Returns an integer
    function getAnswer() {
        let answer = null;
        let radioButtons = document.getElementsByClassName("nt-radio-button");
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                answer = i;
            }
        }
        return answer;
    }

    // Updates the question fields, including the textarea, answer inputs, and the answer radio button
    function updateQuestion() {
        // When this is called, the .active class should not have been changed
        // Gets the correct index of the element from the list
        let e = document.querySelector(".nt-sidebar__question-tabs .active");
        let sideBarTabs = document.getElementsByClassName("nt-custom__question-button");
        let i = Array.from(sideBarTabs).indexOf(e);

        let questionText = getQuestionText();
        let answers = getAnswers();
        let answer = getAnswer();

        // Updates the data of the question in the array
        let question = questions[i]
        question.question = questionText;
        question.answers = answers;
        question.answer = answer;

    }


    function updateQuestionDisplay(i) {
        let question = questions[i];

        // Gets the data values
        let questionText = question.question;
        let answers = question.answers;
        let answer = question.answer;

        // Gets the elements
        let textArea = document.getElementById("nt-create__question-text-box")
        let inputs = document.getElementsByClassName("nt-custom__answer-input");
        let radioButtons = document.getElementsByClassName("nt-radio-button");

        // Changes the text field
        if (questionText === null) {
            textArea.value = "";
        } else {
            textArea.value = questionText;
        }

        // Changes the inputs
        for (let i = 0; i < inputs.length; i++) {
            if (answers[i] === null) {
                inputs[i].value = "";
                continue;
            }
            inputs[i].value = answers[i];
        }

        // Changes the radio buttons
        if (answer === null) {
            // Resets all radio buttons
            for (let button of radioButtons) {
                button.checked = false;
            }
        } else {
            radioButtons[answer].checked = true;
        }

    }

    // Adds an empty question to the array
    function addQuestionToArray() {
        let question = {question: null, answers: [null, null, null, null], answer: null}
        questions.push(question);
    }

    // Adds a question to the quiz sidebar
    function addQuestionButtonClicked() {
        const index = document.getElementsByClassName("nt-custom__question-button").length;
        addQuestionTab(index);
    }

    // Adds a question tab to the sidebar given the question number
    function addQuestionTab(i) {
        // Creates an element
        let e = document.createElement("div");
        e.className = questionTabClasses;
        e.innerHTML = "Question " + (i + 1);

        document.getElementById("nt-sidebar__question-tabs").appendChild(e);

        // Allows it to change questions when clicked on
        e.onclick = () => questionTabClicked(i)

        addQuestionToArray();

    }

    // Changes the active to different one which is given by its index
    function setActiveTab(i) {
        // May be a possibility there is no active class
        // Try catch is just there to stop some bugs
        try {
            // Removes the previous active tab
            let previousActive = document.querySelector(".nt-sidebar__question-tabs .active");
            previousActive.className = questionTabClasses;
        } catch {
        } finally {
            let e = document.getElementsByClassName("nt-custom__question-button").item(i)
            e.className = questionTabClasses + " active";
        }
    }

    // Redirects the user to the quiz they made
    function redirectUsers(url) {
        // Splits it into its components slices everything except the last /, then joins it back together
        let urlStart = window.location.href.split("/").slice(0, -1).join("/");

        // Redirects the user's url
        window.location.href = urlStart + "/" + url;
    }

    // Is called when the user wants to create the quiz
    async function createQuizButtonClicked() {
        // Updates the array of questions in order to get most recent quiz data
        updateQuestion();

        // Checks if the quiz data is valid
        if (!isQuizDataValid()) {
            alert("You have some uncompleted questions")
            return;
        }

        // Posts data to page   
        let data = {"data": questions};
        const response = await fetch(window.location.origin + "/custom/create/send_data", {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}

        });

        removeButtonFunctions()
        alert("Creating Quiz Please Wait. You will be redirected");

        const text = await response.json();

        console.log(text)
        if (text.success) {
            redirectUsers(text.url);
            return;
        }

        giveButtonFunctions();


    }

    // Checks if the quiz data is valid
    function isQuizDataValid() {
        for (let question of questions) {
            // Checks if each box of the question has been filled
            if (question.question === null) {
                return false
            }

            // Checks if the inputs are valid
            for (let answer of question.answers) {
                if (answer === null) {
                    return false
                }
            }

            // checks if there is an answer
            if (question.answer === null) {
                return false;
            }
        }
        return true;
    }


    // Removes whitespace from textarea
    document.getElementById("nt-create__question-text-box").innerText = "";

    addQuestionTab(0);
    setActiveTab(0);

    giveButtonFunctions();
}

main();
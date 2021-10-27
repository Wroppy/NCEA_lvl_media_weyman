function main() {
    const questionTabClasses = "nt-custom__sidebar-tab nt-custom__question-button";
    let questions = []

// let questions = [{"question": null, "answers": [null, null, null, null], "answer": 0}]

    function questionTabClicked(i) {
        console.log((i + 1) + " button clicked.");

        updateQuestion();

        setActiveTab(i)

        updateQuestionDisplay(i);
    }

    // Gets question text data
    function getQuestionText() {

        let questionText = document.getElementById("nt-create__question-text-box").value.trim();
        if (questionText.length === 0) {
            questionText = null;
        }
        return questionText;
    }

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

    function updateQuestion() {

        // When this is called, the .active class should not have been changed
        // Gets the correct index of the element from the list
        let e = document.querySelector(".nt-sidebar__question-tabs .active");
        let sideBarTabs = document.getElementsByClassName("nt-custom__question-button");
        let i = Array.from(sideBarTabs).indexOf(e);

        let questionText = getQuestionText();
        let answers = getAnswers();
        let answer = getAnswer();

        let question = questions[i]
        question.question = questionText;
        question.answers = answers;
        question.answer = answer;

    }

    function updateQuestionDisplay(i) {
        let question = questions[i];

        let questionText = question.question;
        let answers = question.answers;
        let answer = question.answer;

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

    function addQuestionToArray() {
        let question = {question: null, answers: [null, null, null, null], answer: null}
        questions.push(question);
    }

    function addQuestionButtonClicked() {

        const index = document.getElementsByClassName("nt-custom__question-button").length;
        addQuestionTab(index);
    }

    function addQuestionTab(i) {
        // Creates an element
        let e = document.createElement("div");
        e.className = questionTabClasses;
        e.innerHTML = "Question " + (i + 1);

        document.getElementById("nt-sidebar__question-tabs").appendChild(e);

        e.onclick = () => questionTabClicked(i)

        addQuestionToArray();

    }

    function setActiveTab(i) {

        // May be a possibility there is no active class
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

    function createQuizButtonClicked() {
        updateQuestion();
        if (!isQuizDataValid()){
            alert("You have some uncompleted questions")
            return;
        }

        // Posts data to page
        let data = {"data": questions};


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

    document.getElementById("nt-custom__add-question").onclick = addQuestionButtonClicked;

    document.getElementById("nt-custom__create-quiz").onclick = createQuizButtonClicked;
}

main();
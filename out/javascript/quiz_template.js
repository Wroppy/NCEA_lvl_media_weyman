async function name() {
    const response = await fetch(window.location.origin + "/questions");
    const text = await response.json();
    console.log(text.questions);
    return text.questions;
}

async function main() {

    // Changes the side bar's active state
    // return null;
    function changeActiveElement(num) {
        try {
            document.getElementById("active").id = "";
        } catch {
        }

        // Selects the appropriate element in the side bar and sets it to active id
        document.getElementsByClassName("nt-quiz__sidebar-tab")[num].id = "active";

    }

    // Sets the question text top the question
    // return null;
    function changeQuestionText(num) {
        // Sets the question text top the question
        document.getElementById("nt-question-text").textContent = questions[num].question;

    }

    // Sets the answer elements given the question number
    // return null;
    function changeAnswerTexts(num) {

        for (let i = 0; i < answerLabels.length; i++) {
            answerLabels[i].textContent = questions[num].question_choice[i];

        }
    }

    // Changes the question given the number
    // return null;
    function changeQuestion(num) {
        changeActiveElement(num);

        changeQuestionText(num);

        changeAnswerTexts(num)
    }

    // This function changes the question displayed when the side tabs have been clicked
    // return null;
    function sideTabClicked(index) {
        // Hides the results tab and displays the questions tab
        document.getElementById("nt-quiz__question-box").className = "nt-quiz__question-box show";
        document.getElementById("nt-quiz__result-box").className = "nt-quiz__result-box hide";

        changeQuestion(index);
        changeAnswerInputSelected(index);
    }

    // This function changes the array of user answers
    // return null;
    function changeAnswerValue(num) {
        let questionNumber = document.getElementById("active").dataset.index;
        userAnswers[questionNumber] = num;
    }

    // This function changes the answerInput element to the user's previously selected one
    // return null;
    function changeAnswerInputSelected() {
        // Gets the active question number
        let userQuestionNumber = document.getElementById('active').dataset.index;

        // Gets the user's question input
        let userAnswer = userAnswers[userQuestionNumber];
        // Checks if the user has not changed the answer
        if (userAnswer == null) {
            uncheckAllRadioButton();
            return;
        }
        // Selects the radio button
        answerInputs[userAnswer].checked = true;
    }

    // Unchecks all radio buttons
    // return null;
    function uncheckAllRadioButton() {
        for (let radioButton of answerInputs) {
            radioButton.checked = false;
        }
    }

    // Changes the list of user answers
    // return null;
    function radioButtonClicked(index) {
        changeAnswerValue(index);
    }

    // Calculates the result of the quiz
    // Returns an array: [Score out of Total, How many not attempted]
    function calculateResult(){
        let correct = 0
        let notAttempted = 0

        for (let i=0; i< userAnswers.length; i++){
            const userAnswer = userAnswers[i]
            if (userAnswer == null){
                notAttempted++;
                continue;
            }
            const answer = questions[i].answer;

            if (userAnswer === answer){
                correct++;
            }
        }
        return [correct, notAttempted];
    }

    // Is called when the results page is clicked on.
    // It displays the user's score
    function resultPageClicked(){
        let totalQuestionNum = questions.length;

        // Calculates the results
        let results = calculateResult();

        let resultText = "You got " + results[0] + " out of " + (totalQuestionNum - results[1]);
        let attemptedText = "Not Attempted: " + results[1];

        // Changes the score
        document.getElementById("nt-quiz__result-correct").innerText = resultText;
        document.getElementById("nt-quiz__result-not-attempted").innerText = attemptedText;

        // Hides the question box and shows the results
        document.getElementById("nt-quiz__question-box").className = "nt-quiz__question-box hide";
        document.getElementById("nt-quiz__result-box").className = "nt-quiz__result-box show";
    }

    let questions = await name();
    let answerLabels = document.getElementsByClassName("nt-quiz__answer-label");
    let answerInputs = document.getElementsByClassName("nt-radio-button");

    // Creates a global variable of an array consisting of 20 nulls
    let userAnswers = Array.from({length: 20}, () => null);

    console.log(questions);

    // For each question, it adds a side tab to it
    for (let i = 0; i < questions.length; i++) {
        let questionNumber = i + 1;
        // Creates the question side tabs
        let e = document.createElement("div");
        e.innerHTML = "Question " + questionNumber;
        e.className = "nt-quiz__sidebar-tab";
        document.getElementById("nt-quiz__sidebar").appendChild(e);

        // Sets the onclick event to change the question
        e.onclick = e => sideTabClicked(i);
        console.log(questions[i]);

        // Assigns the div a data set
        e.dataset.index = i.toString();
    }

    // Sets it to question 0
    changeQuestion(0);

    // Assigns the answer inputs to a click event
    for (let i = 0; i < answerInputs.length; i++) {
        answerInputs[i].onclick = e => radioButtonClicked(i);
    }

    // Creates the results page element
    e = document.createElement("div");
    e.className = "nt-quiz__result";
    e.innerHTML = "Results";
    e.id = "nt-quiz__result";
    document.getElementById("nt-quiz__sidebar").appendChild(e);

    // When clicked it shows the results element
    e.onclick = resultPageClicked;
}

main()



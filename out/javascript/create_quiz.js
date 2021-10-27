function main() {
    const questionTabClasses = "nt-custom__sidebar-tab nt-custom__question-button";
    let questions = []

// let questions = [{"question": null, "answers": [null, null, null, null], "answer": 0}]

    function questionTabClicked(i) {
        console.log((i + 1) + " button clicked.");

        updateQuestion();

        setActiveTab(i)
    }

    // Gets question text data
    function getQuestionText() {

        let questionText = document.getElementById("nt-create__question-text-box").value;
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
            if (inputs.item(i).value.length === 0) {
                text = null
            } else {
                text = inputs.item(i).value;
            }
            answers.push(text);
        }
        return answers;
    }

    function getAnswer(){
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

        console.log(questions);
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


    // Removes whitespace from textarea
    document.getElementById("nt-create__question-text-box").innerText = "";

    addQuestionTab(0);
    setActiveTab(0);

    document.getElementById("nt-custom__add-question").onclick = addQuestionButtonClicked;
}

main();
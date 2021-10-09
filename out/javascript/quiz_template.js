async function name() {
    const response = await fetch("http://localhost:8080/NCEAStudy/QuizTemplate");
    const text = await response.json();
    console.log(text);
    return text.questions


}

async function main() {
    function changeActiveElement(num) {
        try {
            document.getElementById("active").id = "";
        } catch {
        }

        // Selects the appropriate element in the side bar and sets it to active id
        document.getElementsByClassName("nt-quiz__sidebar-tab")[num].id = "active";

    }


    function changeQuestionText(num) {
        // Sets the question text top the question
        document.getElementById("nt-question-text").textContent = questions[num].question;

    }

    function changeAnswerTexts(num){
        // Sets the answer elements to the right text
        for (let i = 0; i < answerLabels.length; i++) {
            answerLabels[i].textContent = questions[num].question_choice[i];

        }
    }

    // Changes the question given the number
    function changeQuestion(num){
        changeActiveElement(0);

        changeQuestionText(0);

        changeAnswerTexts(0)
    }


    let questions = await name();
    let answerElements = document.getElementsByClassName("nt-quiz__answer");
    let answerLabels = document.getElementsByClassName("nt-quiz__answer-label")


    console.log(questions)

    for (let i=0; i<questions.length; i++) {
        // Creates the necessary side tabs
        const e = document.createElement("div");
        e.innerHTML = "Question " + questions[i].question_number;
        e.className = "nt-quiz__sidebar-tab";
        document.getElementById("nt-quiz__sidebar").appendChild(e);

        // Sets the onclick event to change the question


        console.log(questions[i]);
    }

    // Sets it to question 0
    changeQuestion(0);




}

main()



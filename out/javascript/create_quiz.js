function questionTabClicked(index) {
    console.log((index + 1) + " button clicked.");
}

function addQuestionButtonClicked() {
    const index = document.getElementsByClassName("nt-custom__create-quiz-button").length;
    addQuestionTab(index);
}

function addQuestionTab(index) {
    let e = document.createElement("div");
    e.className = "nt-custom__sidebar-tab nt-custom__create-quiz-button";
    e.innerHTML = "Question " + (index + 1);

    document.getElementById("nt-sidebar__question-tabs").appendChild(e);

    questionTabClicked(index)

}

function main() {

    // Removes whitespace from textarea
    document.getElementById("nt-create__question-text-box").innerText = "";

    addQuestionTab(0);

    document.getElementById("nt-custom__add-question").onclick = addQuestionButtonClicked;
}

main();
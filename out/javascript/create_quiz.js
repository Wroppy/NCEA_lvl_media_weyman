const questionTabClasses = "nt-custom__sidebar-tab nt-custom__question-button";
let questions = []
// let questions = [{"question": null, "answers": [null, null, null, null], "answer": 0}]

function questionTabClicked(i) {
    console.log((i + 1) + " button clicked.");

    setActiveTab(i)
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

function main() {

    // Removes whitespace from textarea
    document.getElementById("nt-create__question-text-box").innerText = "";

    addQuestionTab(0);
    setActiveTab(0);

    document.getElementById("nt-custom__add-question").onclick = addQuestionButtonClicked;
}

main();
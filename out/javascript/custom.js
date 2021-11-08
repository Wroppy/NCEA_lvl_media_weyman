// Redirects the user to the quiz they made
function redirectUsers(url) {
    let urlStart = window.location.origin;

    // Redirects the user's url
    window.location.href = urlStart + "/custom/" + url;
}

// Creates the elements to display an individual quiz
// Returns an element
function addQuizTab(quizInfo) {
    let author = quizInfo.author;
    let quizName = quizInfo.quizName;
    let quizDescription = quizInfo.description;
    let questionNumber = quizInfo.questionLength;
    let url = quizInfo.url;


    // Creates the quiz tab element and appends it to the window
    let quizTab = document.createElement("div");
    quizTab.className = "nt-custom__user-quiz-tab";

    let authorElement = document.createElement("div");
    authorElement.className = "nt-user-quiz-tab__author nt-user-quiz-tab__content";
    let authorSpan = document.createElement("span");
    authorSpan.innerHTML = author;
    authorElement.appendChild(authorSpan);

    let quizNameElement = document.createElement("div");
    quizNameElement.className = "nt-user-quiz-tab__quiz-name nt-user-quiz-tab__content";
    let quizNameSpan = document.createElement("span");
    quizNameSpan.innerHTML = quizName;
    quizNameSpan.className = "nt-custom__quiz-name";
    quizNameElement.appendChild(quizNameSpan);

    let descriptionElement = document.createElement("div");
    descriptionElement.className = "nt-user-quiz-tab__preview-headers nt-user-quiz-tab__content";
    let descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML = quizDescription;
    descriptionElement.appendChild(descriptionSpan);

    let quizLengthElement = document.createElement("div");
    quizLengthElement.className = "nt-user-quiz-tab__question-num nt-user-quiz-tab__content";
    let quizLengthSpan = document.createElement("span");
    quizLengthSpan.innerHTML = questionNumber.toString() + " Questions";
    quizLengthElement.appendChild(quizLengthSpan);

    quizTab.appendChild(authorElement);
    quizTab.appendChild(quizNameElement);
    quizTab.appendChild(descriptionElement);
    quizTab.appendChild(quizLengthElement);

    quizTab.onclick = () => redirectUsers(url);

    document.querySelector(".nt-custom__user-quiz-wrapper").appendChild(quizTab);


}

// Add quiz displays to the display box
function addQuizTabs(tabsData) {
    for (let tabData of tabsData) {
        addQuizTab(tabData);
    }
}

// Filters the quizzes based on the input text box
function filterQuizzes() {
    let searchBar = document.getElementById("nt-custom__search-bar");
    textFilter = searchBar.value.toUpperCase();

    let customQuizTabs = document.getElementsByClassName("nt-custom__user-quiz-tab");
    let quizNames = document.getElementsByClassName("nt-custom__quiz-name");

    // Filters
    for (let i = 0; i < customQuizTabs.length; i++) {
        if (quizNames[i].innerHTML.toUpperCase().indexOf(textFilter) > -1) {
            customQuizTabs[i].style.display = "";
        }else{
            customQuizTabs[i].style.display = "none";
        }
    }
}

async function main() {
    // let quiz = {
    //     author: "Weyman Wong",
    //     quizName: "Testing",
    //     description: "description test",
    //     questionLength: 4,
    //     url: "1"
    // }
    //
    // addQuizTab(quiz);

    // Gets the quiz data
    let response = await fetch(window.location.origin + "/custom/quizTabsData");
    let data = await response.json();
    addQuizTabs(data.data);

    // Sets events to filter the user quizzies out
    let filterSearchBar = document.getElementById("nt-custom__search-bar");
    filterSearchBar.oninput = filterQuizzes;

    let filterButton = document.getElementById("nt-custom__filter-button");
    filterButton.onclick = filterQuizzes;
}

main();

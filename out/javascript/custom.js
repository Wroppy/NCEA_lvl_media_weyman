// Redirects the user to the quiz they made
function redirectUsers(url) {
    // Splits it into its components slices everything except the last /, then joins it back together
    let urlStart = window.location.href.split("/").slice(0, -1).join("/");

    // Redirects the user's url
    window.location.href = urlStart + "/" + url;
}

function addQuizTab(quiz) {
    let author = quiz.author;
    let quizName = quiz.quizName;
    let quizDescription = quiz.description;
    let questionNumber = quiz.questions.length;
    let url = quiz.url;


    let e = 1;
}


function main() {
    let quiz = {
        author: "Weyman Wong",
        quizName: "Testing",
        description: "description test",
        questions: [
            {},
            {}
        ],
        url: "1"
    }

    addQuizTab(quiz);
}

main();

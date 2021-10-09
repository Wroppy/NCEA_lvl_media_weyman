async function name() {
    const response = await fetch("http://localhost:8080/NCEAStudy/QuizTemplate");
    const text = await response.json();
    console.log(text);
    return text.questions


}

async function main() {

    let questions = await name();

    console.log(questions)
    for (let question of questions) {
        console.log(question);

    }
}

main()



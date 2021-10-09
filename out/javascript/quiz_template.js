async function name() {
    const response = await fetch("http://localhost:8080/NCEAStudy/QuizTemplate");
    const text = await response.text();
    alert(text)
}

name();




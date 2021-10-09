async function name() {
    const response = await fetch("http://localhost:3000/NCEAStudy/QuizTemplate");
    const text = await response.text();
    //alert(text)
}

name();




async function main() {
    // Clears the text error and the name input from the page
    function clearInputs() {
        document.getElementById("nt-contact__name").value = "";
        document.getElementById("nt-contact__text-field").value = "";
    }

    async function messageButtonClicked() {
        // Gets the name and the message from the input and textareas
        let name = document.getElementById("nt-contact__name").value;
        let message = document.getElementById("nt-contact__text-field").value;

        // Checks that a name has been inputted
        if (name.length < 2) {
            alert("Name must be filled in");
            return;
        }

        // Checks that a message has been inputted
        if (message.length < 2) {
            alert("Message must be filled in")
            return;
        }

        let response = await fetch("http://localhost:3000/contact", {
            body: JSON.stringify({name, message}),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}

        });
        const text = await response.json();
        console.log(text);

        // if (text.success) {
        //     clearInputs();
        // } else {
        //     throw new Error;
        // }


    }

    // When clicked it will run a few checks then send the email
    document.getElementById("nt-contact__button").onclick = messageButtonClicked;
}

main();
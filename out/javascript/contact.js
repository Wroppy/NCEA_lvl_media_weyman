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

        // Sends the name and the message of the text to the server to send the email
        let response = await fetch("http://localhost:3000/contact_email", {
            body: JSON.stringify({name, message}),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}

        });

        // Gets the response from the server and sees if there was an error during it
        const text = await response.json();
        if (text.response) {
            clearInputs();
            alert("Email Sent!");
        } else {
            alert("Something occurred during the process. Please check your internet connection.");
        }


    }

    // When clicked it will run a few checks then send the email
    // Will not work on school wifi
    document.getElementById("nt-contact__button").onclick = messageButtonClicked;
}

main();
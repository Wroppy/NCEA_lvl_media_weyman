// I didnt want to copy and paste urls

async function getNavbarHeaders() {
    // Gets list of pages
    let response = await fetch(window.location.origin + "/template_navbar");
    let navbarData = await response.json();

    console.log(navbarData)

    let navbar = document.getElementsByClassName("nt-navbar").item(0);

    // Creates a nav bar button element and appends it to the nav bar
    for (let linkData of navbarData.data){
        let navButton = document.createElement("div");
        navButton.className = "nt-navbar__button";
        navButton.dataset.page = linkData.url;

        let navLink = document.createElement("a");
        navLink.href = window.location.origin + "/" + linkData.url;

        let icon = document.createElement("span");
        icon.className = linkData.icon;

        let text = document.createElement("span");
        text.textContent = linkData.text;

        navLink.appendChild(icon);
        navLink.appendChild(text);

        navButton.appendChild(navLink);
        navbar.appendChild(navButton)
    }

    // Changes the active element to the page

    // Gets the page the client is on
    let url = window.location.href;
    // "http://localhost:3000/subjects/calculus" -> "subjects"
    let page = url.split("/").at(3);
    const className = "nt-navbar__button";
    // Changes the appropriate button to active
    for (let e of document.getElementsByClassName(className)){
        console.log(e.dataset.page);
        if (e.dataset.page !== page){
            continue;
        }

        e.className = className + " active";
        break;

    }

}

getNavbarHeaders();
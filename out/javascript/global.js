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
}

getNavbarHeaders();
let dropDownBox = document.getElementsByClassName("nt-content__subject-boxes");
let dropdowns = document.getElementsByClassName("nt-subject__dropdown")
let dropDownButtons = document.getElementsByClassName("nt-subject__dropdown-button")

// Expands or restricts the dropdwon boxes
function changeDropdowns(i) {
    let elementClasses = dropdowns[i].className
    let dropdownButtonClasses = dropDownButtons[i].className
    elementClasses = elementClasses.toString()

    // Checks whether it is hidden or not
    if (elementClasses.includes("show")) {
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("show", "hide")
        dropDownButtons[i].className = dropdownButtonClasses.replace("icon-pointer_down_black", "icon-pointer_left_black")
    } else {
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("hide", "show")

        dropDownButtons[i].className = dropdownButtonClasses.replace("icon-pointer_left_black", "icon-pointer_down_black")
    }
}

// Sets events for each dropdown box
for (let i = 0; i < dropDownBox.length; i++) {
    dropDownBox[i].onclick = e => changeDropdowns(i)
}
let dropDownBox = document.getElementsByClassName("nt-content__subject-boxes");
let dropdowns = document.getElementsByClassName("nt-subject__dropdown")
let dropDownButtons = document.getElementsByClassName("nt-subject__dropdown-button")

function expandDropdown(i) {
    let elementClasses = dropdowns[i].className
    let dropdownButtonClasses = dropDownButtons[i].className
    elementClasses = elementClasses.toString()


    // Checks whether it is hidden or not
    if (elementClasses.includes("show")) {
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("show", "hide")
        dropDownButtons[i].className = dropdownButtonClasses.replace("pointer_up_black", "pointer_down_black")
    } else {
        console.log("do")
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("hide", "show")

        dropDownButtons[i].className = dropdownButtonClasses.replace("pointer_down_black", "pointer_up_black")


    }
}

for (let i = 0; i < dropDownBox.length; i++) {
    dropDownBox[i].onclick = e => expandDropdown(i)

}
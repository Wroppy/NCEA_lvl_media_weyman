let dropDownButtons = document.getElementsByClassName("nt-subject__dropdown-button");
let dropdowns = document.getElementsByClassName("nt-subject__dropdown")

function onClick(i){
    let elementClasses = dropdowns[i].className
    elementClasses = elementClasses.toString()
    let dropdownButtonClasses = dropDownButtons[i].className

    // Checks whether it is hidden or not
    if (elementClasses.includes("show")){
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("show", "hide")
        dropDownButtons[i].className = dropdownButtonClasses.replace("pointer_up_black", "pointer_down_black")

    }else{
        // Changes the class name in order to hide the drop down and the icons
        dropdowns[i].className = elementClasses.replace("hide", "show")
        dropDownButtons[i].className = dropdownButtonClasses.replace("pointer_down_black", "pointer_up_black")

    }
}

for (let i=0; i<dropDownButtons.length; i++){
    dropDownButtons[i].onclick = e => onClick(i)

}
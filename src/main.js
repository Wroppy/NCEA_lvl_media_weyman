// This file generates the html pages. It simply replaces the {{title, content, and styles}} and writes it to the out
// folder

function getFileText(pageName) {
    return fs.readFileSync("../assets/" + pageName + ".html", {encoding: "utf-8", flag: "r"})
}

function getStyleSheet(pageName){
    return "<link rel=\"stylesheet\" href=\"css/" + pageName + ".css\">"
}

function writeFile(pageTxt, pageName){
    let path = "../out/" + pageName + ".html"

    fs.writeFileSync(path, pageTxt, {flag: "w"})
}


const pages = ["contact"]
const fs = require("fs");
const TEMPLATE = getFileText("template")

let pageTxt, newPage, styleSheetTag;


// Gets a list of all of the html files in the pages folder
for (let pageName of pages) {
    // Reads the file into a txt format.
    pageTxt = getFileText("pages/contact")

    // Sets the newPage variable to template and replaces the content, style and title values
    newPage = TEMPLATE;
    newPage = newPage.replace("{{content}}", pageTxt)

    styleSheetTag = getStyleSheet("contact")
    newPage = newPage.replace("<!--{{styles}}-->", styleSheetTag)

    // Writes the file to the /out/ folder
    writeFile(newPage, pageName)
}



// copy css files into out
// run html file


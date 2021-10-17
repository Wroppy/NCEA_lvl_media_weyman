data = [
    {tag: "math", attributes: "display=\"block\"", innerHtml: null, parent: null},
    {tag: "mrow", attributes: null, innerHtml: null, parent: 0},
    {tag: "mtext", attributes: null, innerHtml: "Find&#x00A0;the&#x00A0;values&#x00A0;of&#x00A0;m&#x00A0;when&#x00A0;", parent: 1},
    {tag: "msup", attributes: null, innerHtml: null, parent: 1},
    {tag: "mn", attributes: null, innerHtml: "4", parent: 3},
    {tag: "mrow", attributes: null, innerHtml: null, parent: 3},
    {tag: "mi", attributes: null, innerHtml: "m", parent: 5},
    {tag: "mi", attributes: null, innerHtml: "x", parent: 5},
    {tag: "mi", attributes: null, innerHtml: "&#x2212;", parent: 5},
    {tag: "mo", attributes: null, innerHtml: "=", parent: 1},
    {tag: "msup", attributes: null, innerHtml: null, parent: 1},
    {tag: "mn", attributes: null, innerHtml: "2", parent: 10},
    {tag: "mrow", attributes: null, innerHtml: null, parent: 10},
    {tag: "mn", attributes: null, innerHtml: "3", parent: 12},
    {tag: "msup", attributes: null, innerHtml: null, parent: 12},
    {tag: "mi", attributes: null, innerHtml: "x", parent: 14},
    {tag: "mn", attributes: null, innerHtml: "2", parent: 14},
]

let elements = [];
for (let i of data){
    let e = document.createElement(i.tag)

    e.attributes = i.attributes;
    e.innerHtml = i.innerHtml;

    if (i.parent === null){
        document.body.appendChild(e);
    }else{
        elements[i].appendChild(e);
    }

    elements.append(e);
}

console.log(text);
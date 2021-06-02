'use strict';
import * as $$ from  "./helpers.js";
import * as __d from "./dom.js";


/**
 * Create the Notion Object using function approach for easy assignment of Enumerable, Configurable, Writable properties
 * @param {String|Node} elem    the element to turn into a Notion component, our entry point to the HTML markup for both declarative and functional approaches
 * @param {Object} options   an Object containing all other necessary parameters.
*/

function Notion (elem, options) {
    // if no element is provided return. Make sure the element and options values are passed in
    if (!elem || (!elem && !options) || !options) return console.error($$.error("elem and options parameter need to be passed"));

    // make sure the input types are correct
    if (!(typeof elem === "string" || elem instanceof Node) || $$.strictTypeOf(options) !== "object") return console.error($$.error("elem parameter is neither string nor Node"));

    // make sure that we have a template passed in
    if (!options.template) return console.error($$.error("Template not provided"));

    // make sure methods are really "methods"
    if (!$$.isMethod(options.methods)) return console.error($$.error("one or more non-method properties found, please make sure"));

    // Next we want to grab our Component Properties
    let _this = this;
    



    // Next we want to set our Component properties
    Object.defineProperties(_this, {
        elem: { value: elem },
        template: { value: options.template },
        methods: { value: options.methods },
        linkTo: options.linkTo,


    })



    

};
    









console.log($$.pushNodeList($$.byId('inject-App').childNodes));
console.log($$.byId("inject-App").childNodes)
if ($$.byId('inject-App').children.length < 1) {
    console.log("maddddd")
}


console.log(__d.getDOMMap("inject-App"));
console.log($$.selector("#inject-App").childNodes)
console.log($$.selector("#inject-App").attributes)
let mona = $$.selector("#inject-App").attributes;
let sma = {}
for ( let mon of mona ) {
    sma[mon.name.toLowerCase()] = mon.value
    console.log(mon.nodeName)
}
console.log(sma)
console.log(mona["id"].name)

console.log(Array.prototype.map.call(mona, function (mon,index) {
    return mon.value;
})
)



$$.selector("#inject-App").classList.add("Yessssss")

function create () {
    return document.createElement("div")
}
console.log(create())
// function getNodeAttrs (node) {
//     let obj = {};
//     let nodeAttrs = node.attributes;
//     for ( let nodeAttr of nodeAttrs ) {
//         obj[nodeAttr.name.toLowerCase()] = nodeAttr.value
//     }
//     return obj;
// }

// console.log(getNodeAttrs($$.selector("#inject-App")));










let naruto = [
    {
        attrs: {
                class: ["Tall", "Dark", "And", "Caring"], style: "color: black;"
            },
        children: {
            attrs: {
                    class: ["Tall", "Dark", "And", "Caring"], style: "color: black;"
                },
            children: {
                    attrs: [],
                    children: [],
                    content: "I am a Span    ",
                    hasChildren: false,
                    isSVG: false,
                    node: "text",
                    nodetype: "comment"
                },
            content: "",
            hasChildren: true,
            isSVG: false,
            node: "span.Tall.Dark.And.Caring",
            nodetype: "div"},
        content: "",
        hasChildren: true,
        isSVG: false,
        node: "span.Tall.Dark.And.Caring",
        nodetype: "span"
    }
]

console.log(__d.buildElem(naruto[0]));
// passing the array and not the object!





console.log($$.selector("#inject-App"));



let thor = [1,2,3,4,5,6,77];
let loki = [1, 2, 3, 44,55,66,77]

thor.forEach(function (tho, index) {
    if (tho < 200) {
        console.log("first");
        return
    }

    if (tho < 100) {
        console.log("second");
    }
})




let tester = {
    greet: "hello",
    time: "evening",
    title: "mister"
}

for ( let prope in tester) {
    if (tester.hasOwnProperty(prope)) {
        if (prope) {
            console.log(prope);
        }
    }
}

console.log(tester.length)



$$.selector("#inject-App").removeAttribute("checked");
console.log($$.selector("#inject-App"));




console.log(__d.mapAttrs($$.selector("#inject-App")));









let curr = `<div class="Old DOM Class" unchecked>old guy</div>`
let neww = `
hey
<!--na wa for you oh -->
<span role="email" unchecked style="color: white;" class="Working You Stupid Bitch-ass">I am a Span <span class="inner-span">I am a span inside a span</span><div class="divider division">And I'm a div</div>    </span>`

let currrMap = __d.mapAttrs($$.selector("#inject-App"));
let newwMap =  __d.mapAttrs(__d.parseToHtml(neww));
console.log(newwMap)
console.log(newwMap[3].node.parentNode)



console.log(currrMap)
// __d.diffAttrs(newwMap, $$.selector("#inject-App"));
console.log($$.selector("#inject-App"));


let superr = [1,2,3,4,5,6]; 

superr.forEach(function (x, i) {
    if (x === 2) {
        superr.splice(i, 1);
    }
    console.log(superr[i]);
})
console.log(superr)





console.log();

console.log($$.selector("#inject-App"));












__d.DOMDiff($$.selector("#inject-App"), __d.getDOMMap($$.selector("#inject-App")), __d.getDOMMap(__d.parseToHtml(neww)));







console.log($$.strictTypeOf("inject-App"))
// Notion("hey", "hey")

// console.log($$.byId("inject-App"));
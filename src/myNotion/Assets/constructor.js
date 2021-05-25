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
        methods: { value: options.methods }


    })



    

};
    





// console.log($$.pushNodeList($$.byId('inject-App').childNodes));
// console.log($$.byId("inject-App").childNodes)
// if ($$.byId('inject-App').children.length < 1) {
//     console.log("maddddd")
// }


console.log(__d.getDOMMap("inject-App"));
console.log($$.selector("#inject-App").childNodes)
let mona = $$.selector("#inject-App").attributes;
let sma = {}
for ( let mon of mona ) {
    sma[mon.name.toLowerCase()] = mon.value
}
console.log(sma)

console.log(Array.prototype.map.call(mona, function (mon,index) {
    return mon.value;
})
)


function getNodeAttrs (node) {
    let obj = {};
    let nodeAttrs = node.attributes;
    for ( let nodeAttr of nodeAttrs ) {
        obj[nodeAttr.name.toLowerCase()] = nodeAttr.value
    }
    return obj;
}

console.log(getNodeAttrs($$.selector("#inject-App")));




// Notion("hey", "hey")

// console.log($$.byId("inject-App"));
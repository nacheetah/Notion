'use strict';
import * as $$ from "./helpers.js"


// This will house our dom functionalities responsible for rendering from template

/**
 * A helper function to parse Template strings to HTML Markup
 * @param {String} htmlstring   The HTML string to convert to Markup
 * @returns {Node}  The HTML Markup
*/
var parseToHtml = function (htmlstring) {
    // run an IIFE to that checks whether its supported or not
    var isDOMParserSupported = (function () {
        // if it doesn't exist on the window Object return false
        if (!window.DOMParser) return false;
        try {
            let domParser = new DOMParser();
            let str = "<div>hey</div>"
            domParser.parseFromString(str, "text/html");
        } catch(err) {
            return false
        }
        return true;
    })();

    // if it isn't supported, e.g in IE10, then use innerHTML
    if (!isDOMParserSupported) {
        const anchor = document.createElement("div");
        anchor.innerHTML = htmlstring;
        return anchor;
    } else {
        var domParser = new DOMParser;
        //return just the body since that's all we'll be needing for this project
        return domParser.parseFromString(htmlstring, "text/html").body;
    }
}

/**
 * @param {Node|String} elem    The id string value reference or the node to be traversed
 * @returns {Array}   Array of DOMMap objects with useful details for "selective rendering"
 */
var getDOMMap = function (elem, isSVG) {
    let element;

    // if elem is id reference then get it, if node continue
    if ($$.strictTypeOf(elem) === "string") {
        element = $$.byId(elem);
    };

    // helper function to retrieve attributes of node
    function getNodeAttrs (node) {
        let obj = {};
        let nodeAttrs = node.attributes;
        for ( let nodeAttr of nodeAttrs ) {
            if(nodeAttr.name.toLowerCase() === "class") {
                let splitArr = nodeAttr.value.split(" ");
                obj[nodeAttr.name.toLowerCase()] = splitArr;
            } else {
                obj[nodeAttr.name.toLowerCase()] = nodeAttr.value;
            }
        }
        return obj;
    }

    // helper functuion to get the text content of current node even when node has children elements
    // function getContentFrom (node) {
    //     return Array.prototype.map.call(node.childNodes, function (childNode) {
    //         // if (childNode.nodeType === 1) 
    //     })
    // } bj

    // traverse through the Node DOM Tree
    function DOMMapping (_element, svg) {

        //return an array of the traversed node objects by mapping through its childNodes recursively
        return  Array.prototype.map.call(_element.childNodes, function (node, index) {
            let details = {
                nodetype: node.nodeType === 3 ? "text" : (node.nodeType === 8 ? "comment" : node.tagName.toLowerCase()),
                attrs: node.nodeType === 1 ? getNodeAttrs(node) : [],
                hasChildren: node.nodeType === 1 && node.childNodes.length > 0 ? true : false,
                node: node
            }

            // we can't access details.nodetype from the inside hence,
            details.content = details.nodetype === "text" ? node.textContent : (details.nodetype === "comment" ? node.textContent : (node.childNodes.length > 0  ? "" : null));
            details.isSVG = svg || details.nodetype === "svg"

            // recursive function to run for every child node and their child node and so on....
            details.children = DOMMapping(details.node, svg);
            return details;
        })
    }
    return DOMMapping(element, isSVG);        
}










export { parseToHtml, getDOMMap,  }
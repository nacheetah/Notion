'use strict';
import * as $$ from "./helpers.js"


// This will house all DOM functionalities responsible for rendering from template

/**
 * A helper function to parse Template strings to HTML Markup
 * @param {String} htmlstring   The HTML string to convert to Markup
 * @returns {Node}  The HTML Markup
*/
var parseToHtml = function ( htmlstring ) {
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

        // return just the body since that's all we'll be needing for this project
        return domParser.parseFromString(htmlstring, "text/html").body;
    }
}

/**
 * @param {Node|ELement|String} elem    The id string value reference or the node to be traversed
 * @returns {Array}   Array of DOMMap objects with useful details for "selective Rendering"
 */
var getDOMMap = function ( elem, isSVG ) {
    let element;

    element = elem;

    // if elem is an id reference then get it, if node continue
    if ($$.strictTypeOf(elem) === "string") {
        element = $$.byId(elem);
    }

    /**
     * helper function to retrieve attributes of node
     * @param {Node|Element} node   the node whose attributes you want to retrieve
     * @returns {Object}   object containing key/value pairs of attribute 
     */ 
    var getNodeAttrs = function ( node ) {
        let obj = {};
        let nodeAttrs = node.attributes;
        for ( let nodeAttr of nodeAttrs ) {
            if(nodeAttr.nodeName.toLowerCase() === "class") {
                let splitArr = nodeAttr.nodeValue.toLowerCase().split(" ");
                obj[nodeAttr.nodeName.toLowerCase()] = splitArr;
            } else {
                obj[nodeAttr.nodeName.toLowerCase()] = nodeAttr.nodeValue.toLowerCase();
            }
        }

        return obj;
    }


    /**
     * traverse through the Node DOM Tree 
     * @param {Node|Element} _element   the enrty node to traverse through
     * @param {Boolean} svg     set this to true if _element is an svg, else set to false
     */
    var DOMMapping = function ( _element, svg ) {

        //return an array of the traversed node objects by mapping through its childNodes recursively
        return  Array.prototype.map.call(_element.childNodes, function (node, index) {
            let details = {
                nodetype: node.nodeType === 3 ? "text" : (node.nodeType === 8 ? "comment" : node.tagName.toLowerCase()),
                attrs: node.nodeType === 1 ? getNodeAttrs(node) : [],
                hasChildren: node.nodeType === 1 && node.childNodes.length > 0 ? true : false,
                node: node
            }

            // we can't access details.nodetype from the inside hence,
            details.content = details.nodetype === "text" ? node.nodeValue : (details.nodetype === "comment" ? node.data : (node.childNodes.length > 0  ? "" : null));
            details.isSVG = svg || details.nodetype === "svg"

            // recursive function to run for every child node and their child node and so on....
            details.children = DOMMapping(details.node, svg);
            return details;
        })
    }

    return DOMMapping(element, isSVG);        
}




/**
 * If an element doesn't exist we'll need Notion to biuld up a new one
 * @param {Array} arrValue    An  object of values representing a node in the Node tree of the currently displayed UI starting from the "Injection/Root element"
 * @returns {Node|Element}  A documentFragment to be attched to the actual dom to reduce reflows and computational cost
 */
var buildElem = function (arrValue) {

    // create a new element based on the nodetype porperty

    /**
     * if an element doesn't exist we'll need Notion to biuld up a new one
     * @param {Node|Element} val    The to which the attributes should be added
     * @returns {Node|Element}  The node with updated attributes
     */
    var createElem = function (val) {
        if (val.nodetype === "text") {
            return document.createTextNode(val.content);
        } else if (val.nodetype === "coment") {
            return document.createComment(val.content);
        } else if (val.isSVG) {
            document.createElementNS("http://www.w3.org/2000/svg", val.nodetype);
        } else {
            return document.createElement(val.nodetype);
        }
    }

    // Next, create a helper function to add attributes if there are any

    /**
     * @param {Node|Element} node    The to which the attributes should be added
     * @param {Node|Element} attrVal    Array of values to be added
     */
    var addAttr = function (node, attrVal) {
        // if node is not an Element, abandon
        if (node.nodeType !== 1) return node;

        // if it is an empty array then return ordinary node
        if (!attrVal.attrs) return node

        // get array of string key values
        let attrObjKeys = Object.keys(attrVal.attrs);

        // loop through and update attributes accordingly
        attrObjKeys.forEach(function (attrObjKey) {
            if (attrObjKey !== "class") {
                // any other attribute should be added using Node.setAttribute
                node.setAttribute(attrObjKey, attrVal.attrs[attrObjKey]);
            } else if (attrObjKey === "class") {
                // if it is a class attribute loop through its values and add them using Element.classList instead
                attrVal.attrs[attrObjKey].forEach(function (classVal) {
                    node.classList.add(classVal);
                });
            }
        });
        
        return node;
    }





    let node = addAttr(createElem(arrValue), arrValue);

    // recursively run it through all it's children
    if (arrValue.hasChildren) {
        node.appendChild(buildElem(arrValue.children))
    }
    return node;




    // return addAttr(createElem(arrValue), arrValue);
}




/**
 * Obtain Attributes Map
 * @param {Node|Element} node  The enrty node to traverse through
 * @returns Returns an Object with key-value pair for all attributes present in node
 */
var mapAttrs = function (node) {
    return Array.prototype.map.call(node.childNodes, function (node) {
        // If it isn't an Element node then return an empty object
        if (node.nodeType !== 1) return {};
        
        let attrs = node.attributes
        let details = {}
        for (let prop of attrs) {
            // If attribute is class then get an array of its "split()" string value, otherwise just get it's string value
            if (prop.nodeName.toLowerCase() === "class") {
                // console.log(classArr)
                let classArr = prop.nodeValue.split(" ");
                details[prop.nodeName.toLowerCase()] = classArr;
                // return
            } else {
                details[prop.nodeName.toLowerCase()] = prop.nodeValue.toLowerCase();
            }
        }
        details.node = node;
        return details;
    })
}




/**
 * Create a helper method to diff attributes
 * @param {Array} tempMap  The style map Object of the template DOMs UI
 * @param {String|Node|Element} DOMNode  The node with to traverse through and obtain it's styles
 */
var diffAttrs = function (tempAttrMap, DOMNode) {
    // Get the node reference
    let nodee;

    // else use as is
    nodee = DOMNode;

    // if DOMNode is a reference then get it
    if (typeof DOMNode === "string") {
        nodee = $$.byId(DOMNode);
    }

    let currAttrMap = mapAttrs(nodee)

    // Loop through the template style map and compare to current one and effect necessary changes
    tempAttrMap.forEach(function (attrObj, index) {
        let newAttrNames = Object.keys(attrObj);
        let currAttrNames = Object.keys(currAttrMap[index]);
        let currAttrMapObj = currAttrMap[index];
        let similarAttrs = [];

        currAttrNames.forEach(function (currAttrName, index) {
            for (let h = 0; h < newAttrNames.length; h++) {
                if (currAttrName === newAttrNames[h]) {
                    similarAttrs.push(currAttrName);
                    currAttrNames.splice(index, 1)
                }
            }
        })

        // Modify pre-existing attributes
        newAttrNames.forEach(function (newAttrName, index) {
            for (let j = 0; j < similarAttrs.length; j++) {
                if (newAttrName === similarAttrs[j]) {

                    // If it the node property then return
                    if (newAttrName === "node") return;
                    
                    // Remove similar attributes from the template value
                    newAttrNames.splice(index, 1);

                    // If the similar attribute is a class then only add new values, and remove values no longer in template class
                    if (newAttrName === "class") {
                        for (let i = 0; i < currAttrMapObj[newAttrName].length; i++) {
                            attrObj[newAttrName].forEach(function (classVal) {

                                // If class value is on current and template UI leave it alone, else it's new so add it
                                if (classVal === currAttrMapObj[newAttrName][i]) {
                                    return;
                                }
                                else if (classVal !== currAttrMapObj[newAttrName][i]) {
                                    currAttrMapObj.node.classList.add(classVal);
                                    currAttrMapObj.node.classList.remove(currAttrMapObj[newAttrName][i]);
                                    return;
                                }
                            })
                        }
                        return;
                    }

                    // if it isn't a class attribute then only update if the current and template values aren't the same
                    else {
                        if (currAttrMapObj[newAttrName] === attrObj[newAttrName]) return;
                        currAttrMapObj.node.setAttribute(newAttrName, attrObj[newAttrName]);
                    }
                }
            }
        })

        // Add brand new attributes
        newAttrNames.forEach(function (newAttrName) {

            // If it the node property then return
            if (newAttrName === "node") return;

            if (newAttrName === "class") {
                attrObj[newAttrName].forEach(function (classVal) {
                    currAttrMapObj.node.classList.add(classVal);
                    return;
                })
            }
            currAttrMapObj.node.setAttribute(newAttrName, attrObj[newAttrName]);
        })

        // Remove those not in template UI
        currAttrNames.forEach(function (currAttrName) {
            console.log(currAttrName);
            currAttrMapObj.node.removeAttribute(currAttrName);
        })
        
    })
}




/**
 * @param {String|Node} id   A reference to the currently displayed UI, from the "injection/Root element"
 * @param {String} templateStr    A string value/presentation of the desired UI. A Template string.
 * @returns {Node}  A documentFragment to be attched to the actual dom to reduce reflows and computational cost
 */
function DOMDiff ( id, templateStr) {
    let finalDoc;

    // get the reference node specified by id
    let currentUI = id;

    if ($$.strictTypeOf(id) === "string") {
        currentUI = $$.byId(id);
    }

    // next, get the current UI's DOMMap
    let currDOMMap = getDOMMap(id);

    // get the Template string DOMMap
    let templateDOMMap = getDOMMap(parseToHtml(templateStr));

    // Get the template DOM style map
    let newMap =  mapAttrs(parseToHtml(templateStr));

    // check if the the current UI has more nodes than the template UI, and if so remove them, else continue
    if (currDOMMap.length > templateDOMMap.length) {
        currDOMMap.splice(templateDOMMap.length, currDOMMap.length);
    }

    /**
     * if an element doesn't exist we'll let Notion biuld up a new one from ground up
     * @param {Array} curr    An Array object of values representing the Node tree of the currently displayed UI startunng from the "Injection/Root element"
     * @param {Array} template    An Array object of values representing the Node tree of the template to be displayed.
     * @returns {Node}  A documentFragment to be attched to the actual dom to reduce reflows and computational cost
     */
    var smartCompare = function (curr, template, root) {
        // we get our documentFragment ready
        let node = document.createDocumentFragment();

        // loop through each array item
        template.forEach(function (obj, index) {

            // if a particular element in the template's DOM doesn't exist in the current UI's DOM create a new one and append it to the original UI.
            // whether its a text node, div, span, svg, comment, to name a few. This means if the nodes in the current DOM's UI are more we remove the
            // excess and if they are less we create and add
            if (!curr[index]) {
                root.appendChild(buildElem(obj));
                return;
            } 

            // if the node branch exists but isn't the same node, replace it, update and attach back to its parent
            if (curr[index] && (obj.nodetype !== curr[index].nodetype)) {
                curr[index].node.parentNode.replaceChild(buildElem(obj), curr[index].node);
                return;
            }

            // If it gets here, then chances are that it does exist and has same nodeType or nodetype property, 
            // but different attributes. So we'll just diff the attributes regardless
            diffAttrs(newMap, id);
            


            // diff textContent too
            // code goes here...


            // if the current DOM node is empty while its Template equivalent isn't, update it
            // code goes here...


            // if Template Node is empty and its curent DOM equivalent isn't then strip it off
            // code goes here...

            
            // if node has children then diff them too
            if (obj.hasChildren) {
                smartCompare(curr[index].children, obj.children, curr[index].node);
            }
            
        })
    }
    console.log(currDOMMap);
    console.log(templateDOMMap);

    smartCompare(currDOMMap, templateDOMMap,  currentUI);
}




















export { parseToHtml, getDOMMap, buildElem, mapAttrs, diffAttrs, DOMDiff };
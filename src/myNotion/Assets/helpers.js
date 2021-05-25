"use strict";
// All helper functions in order tp keep code cleaner and more readable

/** all selector helpers 
 * @param {String} id   the string value of the elements id
 * @param {Object} context  the Object desired element belongs to
 * @returns {Object}    element on the dom tree with the id passed in the id param
*/
function byId (id, context) {
    return (context === (null || undefined) ? document : context).getElementById(id);
}

/**
 * @param {String} tag   the string value of the elements tagName
 * @param {Object} context  the Object desired element belongs to
 * @returns {Object}   array-like object of nodes on the dom tree with the tagName passed in the tag param
*/
function byTag (tag, context) {
    return (context === (null || undefined) ? document : context).getElementsByTagName(tag);
}

/**
 * @param {String} className   the string value of the elements className
 * @param {Object} context  the Object desired element belongs to
 * @returns {Object}    array-like object of nodes on the dom tree with the className passed in the className param
*/
function byClass (className, context) {
    return (context === (null || undefined) ? document : context).getElementsByClassName(className);
}

/**
 * @param {String} cssSelector   the string value of the element's css selector
 * @param {Object} context  the Object desired element belongs to
 * @returns {Object}    element on the dom tree with the css selector passed in the cssSelector param
*/
function selector (cssSelector, context) {
    return (context === (null || undefined) ? document : context).querySelector(cssSelector);
}


/**
 * @param {String} cssSelectors   the string value of the elements' css selector
 * @param {Object} context  the Object desired element belongs to
 * @returns {Object}    array-like object of nodes on the dom tree with the css selector passed in the cssSelector param
*/
function selectors (cssSelectors, context) {
    return (context === (null || undefined) ? document : context).querySelectorAll(cssSelectors);
}


/**
 * @param {String} message   the string value of the desired error message
 * @returns {Object}    Error Object containing details of Error thrown
*/
function error (message) {
    const error = new Error(message);
    error.name = " Notion Syntax Error "
    return error;
}


/**
 * @param {Object} obj   Object whose type needs checking
 * @returns {String}    String value of the obj.prototype
*/
var strictTypeOf = function (obj) {
    // Object.prototype.toString.call(new Array).split(/(\[|\]|\s)/)[4].toLowerCase();
    return Object.prototype.toString.call(obj).split(/\W/)[2].toLowerCase();
}

/**
 * @param {Object} obj   Object whose values need to be checked to ensure they're all methods
 * @returns {Boolean}    True if all values are methods, and false if there is one or more values that are otherwise
*/
var isMethod = function (obj) {
    if (Object.keys(obj).length < 1) return false;
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (strictTypeOf(obj[prop]) !== "function") return false
        }
    }
    return true;
};

/**
 * @param {NodeList} nodeList   NodeList of Values to be pushed
 * @returns {Array}    new Array of values from NodeList
*/
function pushNodeList (nodeList) {
    let obj = {};
    Array.prototype.forEach.call(nodeList, function (nodeListItem,index) {
        obj[nodeListItem.nodeName] = nodeListItem.textContent
    })
    return obj;
}


export { byId, byTag, byClass, selector, selectors, error, strictTypeOf, isMethod, pushNodeList };

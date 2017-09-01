/*
* jHash v1.0.0
* http://jhash.codeplex.com
* 
* Copyright (c) 2010 Chris Pietschmann
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of 
* this software and associated documentation files (the "Software"), to deal in the 
* Software without restriction, including without limitation the rights to use, copy, 
* modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so, subject to the 
* following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies 
* or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
* PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
* CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
* OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function (window) {
    var hashChangeSupported = ('onhashchange' in window);
    var jHash = window.jHash = {
        jhash: "1.0.0",
        change: function (handler) {
            if (hashChangeSupported) {
                attachEvent(window, "hashchange", handler);
            } else {
                eventHandlers.push(handler);
            }
        },
        unbind: function (handler) {
            var i = 0, len = 0;
            if (hashChangeSupported) {
                detachEvent(window, "hashchange", handler);
            } else {
                arrayRemove(eventHandlers, eventHandlers.indexOf(handler));
            }
            return this;
        },
        val: function (name, value) {
            var ho = hashToObject(window.location.hash);
            if (arguments.length === 2) {
                ho[name.toLowerCase()] = (value === null ? '' : value);
                return this.set(this.root(), ho);
            } else if (arguments.length === 1 && typeof (name) === 'string') {
                return ho[name.toLowerCase()];
            }
            return ho;
        },
        root: function (value) {
            if (value === undefined) {
                return parseHashRoot(window.location.hash);
            }
            return this.set(value, this.val());
        },
        set: function (root, query) {
            if (arguments.length === 2) {
                window.location.hash = root + '?' + (typeof (query) === "string" ? query : objectToHash(query));
            } else {
                window.location.hash = root;
            }
            return this;
        },
        remove: function (name) {
            var ho = hashToObject(window.location.hash);
            ho[name.toLowerCase()] = undefined;
            return this.set(this.root(), ho);
        }
    };

    if (!hashChangeSupported) {
        window.setInterval(function () {
            var currentHash = window.location.hash;
            if (previousHashValue !== currentHash) {
                for (var i in eventHandlers) {
                    eventHandlers[i].call(window);
                }
            }
            previousHashValue = currentHash;
        }, 200);
    }

    var eventHandlers = [],
        previousHashValue = window.location.hash,
        attachEvent = function (element, evtName, handler) {
            if (element.addEventListener) {
                element.addEventListener(evtName, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + evtName, handler);
            } else {
                element["on" + evtName] += handler;
            }
        },
        detachEvent = function (element, evtName, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(evtName, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + evtName, handler);
            } else {
                element["on" + evtName] -= handler;
            }
        },
        arrayRemove = function (array, from, to) {
            /* function source: http://ejohn.org/blog/javascript-array-remove/ */
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, rest);
        },
        hashToObject = function (hash) {
            /* create a "dictionary" object for the passed in hash value */
            var obj = {}, pair = null, strHash = hash.substring(0, hash.length);
            if (strHash.indexOf("#") === 0) {
                strHash = strHash.substring(1, strHash.length);
            }
            var queryIndex = strHash.indexOf("?");
            if (queryIndex > -1) {
                strHash = strHash.substring(queryIndex + 1, strHash.length);
            }
            var parts = strHash.split("&");
            for (var i in parts) {
                pair = parts[i].split("=");
                obj[pair[0].toString().toLowerCase()] = pair[1];
            }
            return obj;
        },
        objectToHash = function (object) {
            var s = "";
            for (var i in object) {
                if (object[i] !== undefined) {
                    if (s.length > 0) {
                        s += "&";
                    }
                    s += i.toString() + "=" + object[i].toString();
                }
            }
            return s;
        },
        parseHashRoot = function (hash) {
            var strHash = hash.substring(0, hash.length);
            if (strHash.indexOf("#") > -1) {
                strHash = strHash.substring(1, strHash.length);
            }
            if (strHash.indexOf("?") > -1) {
                strHash = strHash.substring(0, strHash.indexOf("?"));
            }
            return strHash;
        };
})(window);
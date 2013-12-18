/*! WolfieZero.com - v - 2013-12-18 *//* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */
!function(undefined) {
    String.prototype.trim === undefined && (// fix for iOS 3.2
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    }), // For iOS 3.x
    // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
    Array.prototype.reduce === undefined && (Array.prototype.reduce = function(fun) {
        if (void 0 === this || null === this) throw new TypeError();
        var accumulator, t = Object(this), len = t.length >>> 0, k = 0;
        if ("function" != typeof fun) throw new TypeError();
        if (0 == len && 1 == arguments.length) throw new TypeError();
        if (arguments.length >= 2) accumulator = arguments[1]; else for (;;) {
            if (k in t) {
                accumulator = t[k++];
                break;
            }
            if (++k >= len) throw new TypeError();
        }
        for (;len > k; ) k in t && (accumulator = fun.call(undefined, accumulator, t[k], k, t)), 
        k++;
        return accumulator;
    });
}();

var Zepto = function() {
    function type(obj) {
        return null == obj ? String(obj) : class2type[toString.call(obj)] || "object";
    }
    function isFunction(value) {
        return "function" == type(value);
    }
    function isWindow(obj) {
        return null != obj && obj == obj.window;
    }
    function isDocument(obj) {
        return null != obj && obj.nodeType == obj.DOCUMENT_NODE;
    }
    function isObject(obj) {
        return "object" == type(obj);
    }
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype;
    }
    function isArray(value) {
        return value instanceof Array;
    }
    function likeArray(obj) {
        return "number" == typeof obj.length;
    }
    function compact(array) {
        return filter.call(array, function(item) {
            return null != item;
        });
    }
    function flatten(array) {
        return array.length > 0 ? $.fn.concat.apply([], array) : array;
    }
    function dasherize(str) {
        return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }
    function classRE(name) {
        return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
    }
    function maybeAddPx(name, value) {
        return "number" != typeof value || cssNumber[dasherize(name)] ? value : value + "px";
    }
    function defaultDisplay(nodeName) {
        var element, display;
        return elementDisplay[nodeName] || (element = document.createElement(nodeName), 
        document.body.appendChild(element), display = getComputedStyle(element, "").getPropertyValue("display"), 
        element.parentNode.removeChild(element), "none" == display && (display = "block"), 
        elementDisplay[nodeName] = display), elementDisplay[nodeName];
    }
    function children(element) {
        return "children" in element ? slice.call(element.children) : $.map(element.childNodes, function(node) {
            return 1 == node.nodeType ? node : void 0;
        });
    }
    function extend(target, source, deep) {
        for (key in source) deep && (isPlainObject(source[key]) || isArray(source[key])) ? (isPlainObject(source[key]) && !isPlainObject(target[key]) && (target[key] = {}), 
        isArray(source[key]) && !isArray(target[key]) && (target[key] = []), extend(target[key], source[key], deep)) : source[key] !== undefined && (target[key] = source[key]);
    }
    function filtered(nodes, selector) {
        return selector === undefined ? $(nodes) : $(nodes).filter(selector);
    }
    function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }
    function setAttribute(node, name, value) {
        null == value ? node.removeAttribute(name) : node.setAttribute(name, value);
    }
    // access className property while respecting SVGAnimatedString
    function className(node, value) {
        var klass = node.className, svg = klass && klass.baseVal !== undefined;
        return value === undefined ? svg ? klass.baseVal : klass : (svg ? klass.baseVal = value : node.className = value, 
        void 0);
    }
    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // JSON    => parse if valid
    // String  => self
    function deserializeValue(value) {
        var num;
        try {
            return value ? "true" == value || ("false" == value ? !1 : "null" == value ? null : isNaN(num = Number(value)) ? /^[\[\{]/.test(value) ? $.parseJSON(value) : value : num) : value;
        } catch (e) {
            return value;
        }
    }
    function traverseNode(node, fun) {
        fun(node);
        for (var key in node.childNodes) traverseNode(node.childNodes[key], fun);
    }
    var undefined, key, $, classList, camelize, uniq, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter, document = window.document, elementDisplay = {}, classCache = {}, getComputedStyle = document.defaultView.getComputedStyle, cssNumber = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, fragmentRE = /^\s*<(\w+|!)[^>]*>/, tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rootNodeRE = /^(?:body|html)$/i, // special attributes that should be get/set via method calls
    methodAttributes = [ "val", "css", "html", "text", "data", "width", "height", "offset" ], adjacencyOperators = [ "after", "prepend", "before", "append" ], table = document.createElement("table"), tableRow = document.createElement("tr"), containers = {
        tr: document.createElement("tbody"),
        tbody: table,
        thead: table,
        tfoot: table,
        td: tableRow,
        th: tableRow,
        "*": document.createElement("div")
    }, readyRE = /complete|loaded|interactive/, classSelectorRE = /^\.([\w-]+)$/, idSelectorRE = /^#([\w-]*)$/, tagSelectorRE = /^[\w-]+$/, class2type = {}, toString = class2type.toString, zepto = {}, tempParent = document.createElement("div");
    return zepto.matches = function(element, selector) {
        if (!element || 1 !== element.nodeType) return !1;
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
        if (matchesSelector) return matchesSelector.call(element, selector);
        // fall back to performing a selector:
        var match, parent = element.parentNode, temp = !parent;
        return temp && (parent = tempParent).appendChild(element), match = ~zepto.qsa(parent, selector).indexOf(element), 
        temp && tempParent.removeChild(element), match;
    }, camelize = function(str) {
        return str.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : "";
        });
    }, uniq = function(array) {
        return filter.call(array, function(item, idx) {
            return array.indexOf(item) == idx;
        });
    }, // `$.zepto.fragment` takes a html string and an optional tag name
    // to generate DOM nodes nodes from the given html string.
    // The generated DOM nodes are returned as an array.
    // This function can be overriden in plugins for example to make
    // it compatible with browsers that don't support the DOM fully.
    zepto.fragment = function(html, name, properties) {
        html.replace && (html = html.replace(tagExpanderRE, "<$1></$2>")), name === undefined && (name = fragmentRE.test(html) && RegExp.$1), 
        name in containers || (name = "*");
        var nodes, dom, container = containers[name];
        return container.innerHTML = "" + html, dom = $.each(slice.call(container.childNodes), function() {
            container.removeChild(this);
        }), isPlainObject(properties) && (nodes = $(dom), $.each(properties, function(key, value) {
            methodAttributes.indexOf(key) > -1 ? nodes[key](value) : nodes.attr(key, value);
        })), dom;
    }, // `$.zepto.Z` swaps out the prototype of the given `dom` array
    // of nodes with `$.fn` and thus supplying all the Zepto functions
    // to the array. Note that `__proto__` is not supported on Internet
    // Explorer. This method can be overriden in plugins.
    zepto.Z = function(dom, selector) {
        return dom = dom || [], dom.__proto__ = $.fn, dom.selector = selector || "", dom;
    }, // `$.zepto.isZ` should return `true` if the given object is a Zepto
    // collection. This method can be overriden in plugins.
    zepto.isZ = function(object) {
        return object instanceof zepto.Z;
    }, // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
    // takes a CSS selector and an optional context (and handles various
    // special cases).
    // This method can be overriden in plugins.
    zepto.init = function(selector, context) {
        // If nothing given, return an empty Zepto collection
        if (selector) {
            if (isFunction(selector)) return $(document).ready(selector);
            if (zepto.isZ(selector)) return selector;
            var dom;
            // normalize array if an array of nodes is given
            if (isArray(selector)) dom = compact(selector); else if (isObject(selector)) dom = [ isPlainObject(selector) ? $.extend({}, selector) : selector ], 
            selector = null; else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), 
            selector = null; else {
                if (context !== undefined) return $(context).find(selector);
                dom = zepto.qsa(document, selector);
            }
            // create a new Zepto collection from the nodes found
            return zepto.Z(dom, selector);
        }
        return zepto.Z();
    }, // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
    $ = function(selector, context) {
        return zepto.init(selector, context);
    }, // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function(target) {
        var deep, args = slice.call(arguments, 1);
        return "boolean" == typeof target && (deep = target, target = args.shift()), args.forEach(function(arg) {
            extend(target, arg, deep);
        }), target;
    }, // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overriden in plugins.
    zepto.qsa = function(element, selector) {
        var found;
        return isDocument(element) && idSelectorRE.test(selector) ? (found = element.getElementById(RegExp.$1)) ? [ found ] : [] : 1 !== element.nodeType && 9 !== element.nodeType ? [] : slice.call(classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) : element.querySelectorAll(selector));
    }, $.contains = function(parent, node) {
        return parent !== node && parent.contains(node);
    }, $.type = type, $.isFunction = isFunction, $.isWindow = isWindow, $.isArray = isArray, 
    $.isPlainObject = isPlainObject, $.isEmptyObject = function(obj) {
        var name;
        for (name in obj) return !1;
        return !0;
    }, $.inArray = function(elem, array, i) {
        return emptyArray.indexOf.call(array, elem, i);
    }, $.camelCase = camelize, $.trim = function(str) {
        return str.trim();
    }, // plugin compatibility
    $.uuid = 0, $.support = {}, $.expr = {}, $.map = function(elements, callback) {
        var value, i, key, values = [];
        if (likeArray(elements)) for (i = 0; i < elements.length; i++) value = callback(elements[i], i), 
        null != value && values.push(value); else for (key in elements) value = callback(elements[key], key), 
        null != value && values.push(value);
        return flatten(values);
    }, $.each = function(elements, callback) {
        var i, key;
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === !1) return elements;
        } else for (key in elements) if (callback.call(elements[key], key, elements[key]) === !1) return elements;
        return elements;
    }, $.grep = function(elements, callback) {
        return filter.call(elements, callback);
    }, window.JSON && ($.parseJSON = JSON.parse), // Populate the class2type map
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }), // Define methods that will be available on all
    // Zepto collections
    $.fn = {
        // Because a collection acts like an array
        // copy over these useful array functions.
        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        sort: emptyArray.sort,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,
        // `map` and `slice` in the jQuery API work differently
        // from their array counterparts
        map: function(fn) {
            return $($.map(this, function(el, i) {
                return fn.call(el, i, el);
            }));
        },
        slice: function() {
            return $(slice.apply(this, arguments));
        },
        ready: function(callback) {
            return readyRE.test(document.readyState) ? callback($) : document.addEventListener("DOMContentLoaded", function() {
                callback($);
            }, !1), this;
        },
        get: function(idx) {
            return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
        },
        toArray: function() {
            return this.get();
        },
        size: function() {
            return this.length;
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this);
            });
        },
        each: function(callback) {
            return emptyArray.every.call(this, function(el, idx) {
                return callback.call(el, idx, el) !== !1;
            }), this;
        },
        filter: function(selector) {
            return isFunction(selector) ? this.not(this.not(selector)) : $(filter.call(this, function(element) {
                return zepto.matches(element, selector);
            }));
        },
        add: function(selector, context) {
            return $(uniq(this.concat($(selector, context))));
        },
        is: function(selector) {
            return this.length > 0 && zepto.matches(this[0], selector);
        },
        not: function(selector) {
            var nodes = [];
            if (isFunction(selector) && selector.call !== undefined) this.each(function(idx) {
                selector.call(this, idx) || nodes.push(this);
            }); else {
                var excludes = "string" == typeof selector ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : $(selector);
                this.forEach(function(el) {
                    excludes.indexOf(el) < 0 && nodes.push(el);
                });
            }
            return $(nodes);
        },
        has: function(selector) {
            return this.filter(function() {
                return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
            });
        },
        eq: function(idx) {
            return -1 === idx ? this.slice(idx) : this.slice(idx, +idx + 1);
        },
        first: function() {
            var el = this[0];
            return el && !isObject(el) ? el : $(el);
        },
        last: function() {
            var el = this[this.length - 1];
            return el && !isObject(el) ? el : $(el);
        },
        find: function(selector) {
            var result, $this = this;
            return result = "object" == typeof selector ? $(selector).filter(function() {
                var node = this;
                return emptyArray.some.call($this, function(parent) {
                    return $.contains(parent, node);
                });
            }) : 1 == this.length ? $(zepto.qsa(this[0], selector)) : this.map(function() {
                return zepto.qsa(this, selector);
            });
        },
        closest: function(selector, context) {
            var node = this[0], collection = !1;
            for ("object" == typeof selector && (collection = $(selector)); node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)); ) node = node !== context && !isDocument(node) && node.parentNode;
            return $(node);
        },
        parents: function(selector) {
            for (var ancestors = [], nodes = this; nodes.length > 0; ) nodes = $.map(nodes, function(node) {
                return (node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0 ? (ancestors.push(node), 
                node) : void 0;
            });
            return filtered(ancestors, selector);
        },
        parent: function(selector) {
            return filtered(uniq(this.pluck("parentNode")), selector);
        },
        children: function(selector) {
            return filtered(this.map(function() {
                return children(this);
            }), selector);
        },
        contents: function() {
            return this.map(function() {
                return slice.call(this.childNodes);
            });
        },
        siblings: function(selector) {
            return filtered(this.map(function(i, el) {
                return filter.call(children(el.parentNode), function(child) {
                    return child !== el;
                });
            }), selector);
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = "";
            });
        },
        // `pluck` is borrowed from Prototype.js
        pluck: function(property) {
            return $.map(this, function(el) {
                return el[property];
            });
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = null), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = defaultDisplay(this.nodeName));
            });
        },
        replaceWith: function(newContent) {
            return this.before(newContent).remove();
        },
        wrap: function(structure) {
            var func = isFunction(structure);
            if (this[0] && !func) var dom = $(structure).get(0), clone = dom.parentNode || this.length > 1;
            return this.each(function(index) {
                $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(!0) : dom);
            });
        },
        wrapAll: function(structure) {
            if (this[0]) {
                $(this[0]).before(structure = $(structure));
                // drill down to the inmost element
                for (var children; (children = structure.children()).length; ) structure = children.first();
                $(structure).append(this);
            }
            return this;
        },
        wrapInner: function(structure) {
            var func = isFunction(structure);
            return this.each(function(index) {
                var self = $(this), contents = self.contents(), dom = func ? structure.call(this, index) : structure;
                contents.length ? contents.wrapAll(dom) : self.append(dom);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                $(this).replaceWith($(this).children());
            }), this;
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0);
            });
        },
        hide: function() {
            return this.css("display", "none");
        },
        toggle: function(setting) {
            return this.each(function() {
                var el = $(this);
                (setting === undefined ? "none" == el.css("display") : setting) ? el.show() : el.hide();
            });
        },
        prev: function(selector) {
            return $(this.pluck("previousElementSibling")).filter(selector || "*");
        },
        next: function(selector) {
            return $(this.pluck("nextElementSibling")).filter(selector || "*");
        },
        html: function(html) {
            return html === undefined ? this.length > 0 ? this[0].innerHTML : null : this.each(function(idx) {
                var originHtml = this.innerHTML;
                $(this).empty().append(funcArg(this, html, idx, originHtml));
            });
        },
        text: function(text) {
            return text === undefined ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                this.textContent = text;
            });
        },
        attr: function(name, value) {
            var result;
            return "string" == typeof name && value === undefined ? 0 == this.length || 1 !== this[0].nodeType ? undefined : "value" == name && "INPUT" == this[0].nodeName ? this.val() : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function(idx) {
                if (1 === this.nodeType) if (isObject(name)) for (key in name) setAttribute(this, key, name[key]); else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
            });
        },
        removeAttr: function(name) {
            return this.each(function() {
                1 === this.nodeType && setAttribute(this, name);
            });
        },
        prop: function(name, value) {
            return value === undefined ? this[0] && this[0][name] : this.each(function(idx) {
                this[name] = funcArg(this, value, idx, this[name]);
            });
        },
        data: function(name, value) {
            var data = this.attr("data-" + dasherize(name), value);
            return null !== data ? deserializeValue(data) : undefined;
        },
        val: function(value) {
            return value === undefined ? this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
                return this.selected;
            }).pluck("value") : this[0].value) : this.each(function(idx) {
                this.value = funcArg(this, value, idx, this.value);
            });
        },
        offset: function(coordinates) {
            if (coordinates) return this.each(function(index) {
                var $this = $(this), coords = funcArg(this, coordinates, index, $this.offset()), parentOffset = $this.offsetParent().offset(), props = {
                    top: coords.top - parentOffset.top,
                    left: coords.left - parentOffset.left
                };
                "static" == $this.css("position") && (props.position = "relative"), $this.css(props);
            });
            if (0 == this.length) return null;
            var obj = this[0].getBoundingClientRect();
            return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: Math.round(obj.width),
                height: Math.round(obj.height)
            };
        },
        css: function(property, value) {
            if (arguments.length < 2 && "string" == typeof property) return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], "").getPropertyValue(property));
            var css = "";
            if ("string" == type(property)) value || 0 === value ? css = dasherize(property) + ":" + maybeAddPx(property, value) : this.each(function() {
                this.style.removeProperty(dasherize(property));
            }); else for (key in property) property[key] || 0 === property[key] ? css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";" : this.each(function() {
                this.style.removeProperty(dasherize(key));
            });
            return this.each(function() {
                this.style.cssText += ";" + css;
            });
        },
        index: function(element) {
            return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
        },
        hasClass: function(name) {
            return emptyArray.some.call(this, function(el) {
                return this.test(className(el));
            }, classRE(name));
        },
        addClass: function(name) {
            return this.each(function(idx) {
                classList = [];
                var cls = className(this), newName = funcArg(this, name, idx, cls);
                newName.split(/\s+/g).forEach(function(klass) {
                    $(this).hasClass(klass) || classList.push(klass);
                }, this), classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
            });
        },
        removeClass: function(name) {
            return this.each(function(idx) {
                return name === undefined ? className(this, "") : (classList = className(this), 
                funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
                    classList = classList.replace(classRE(klass), " ");
                }), className(this, classList.trim()), void 0);
            });
        },
        toggleClass: function(name, when) {
            return this.each(function(idx) {
                var $this = $(this), names = funcArg(this, name, idx, className(this));
                names.split(/\s+/g).forEach(function(klass) {
                    (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
                });
            });
        },
        scrollTop: function() {
            return this.length ? "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY : void 0;
        },
        position: function() {
            if (this.length) {
                var elem = this[0], // Get *real* offsetParent
                offsetParent = this.offsetParent(), // Get correct offsets
                offset = this.offset(), parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
                // Subtract the two offsets
                // Subtract element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                return offset.top -= parseFloat($(elem).css("margin-top")) || 0, offset.left -= parseFloat($(elem).css("margin-left")) || 0, 
                // Add offsetParent borders
                parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0, 
                parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0, 
                {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var parent = this.offsetParent || document.body; parent && !rootNodeRE.test(parent.nodeName) && "static" == $(parent).css("position"); ) parent = parent.offsetParent;
                return parent;
            });
        }
    }, // for now
    $.fn.detach = $.fn.remove, [ "width", "height" ].forEach(function(dimension) {
        $.fn[dimension] = function(value) {
            var offset, el = this[0], Dimension = dimension.replace(/./, function(m) {
                return m[0].toUpperCase();
            });
            return value === undefined ? isWindow(el) ? el["inner" + Dimension] : isDocument(el) ? el.documentElement["offset" + Dimension] : (offset = this.offset()) && offset[dimension] : this.each(function(idx) {
                el = $(this), el.css(dimension, funcArg(this, value, idx, el[dimension]()));
            });
        };
    }), // Generate the `after`, `prepend`, `before`, `append`,
    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
    adjacencyOperators.forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2;
        //=> prepend, append
        $.fn[operator] = function() {
            // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
            var argType, parent, nodes = $.map(arguments, function(arg) {
                return argType = type(arg), "object" == argType || "array" == argType || null == arg ? arg : zepto.fragment(arg);
            }), copyByClone = this.length > 1;
            return nodes.length < 1 ? this : this.each(function(_, target) {
                parent = inside ? target : target.parentNode, // convert all methods to a "before" operation
                target = 0 == operatorIndex ? target.nextSibling : 1 == operatorIndex ? target.firstChild : 2 == operatorIndex ? target : null, 
                nodes.forEach(function(node) {
                    if (copyByClone) node = node.cloneNode(!0); else if (!parent) return $(node).remove();
                    traverseNode(parent.insertBefore(node, target), function(el) {
                        null == el.nodeName || "SCRIPT" !== el.nodeName.toUpperCase() || el.type && "text/javascript" !== el.type || el.src || window.eval.call(window, el.innerHTML);
                    });
                });
            });
        }, // after    => insertAfter
        // prepend  => prependTo
        // before   => insertBefore
        // append   => appendTo
        $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function(html) {
            return $(html)[operator](this), this;
        };
    }), zepto.Z.prototype = $.fn, // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq, zepto.deserializeValue = deserializeValue, $.zepto = zepto, $;
}();

window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function($) {
    function detect(ua) {
        var os = this.os = {}, browser = this.browser = {}, webkit = ua.match(/WebKit\/([\d.]+)/), android = ua.match(/(Android)\s+([\d.]+)/), ipad = ua.match(/(iPad).*OS\s([\d_]+)/), iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/), webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), touchpad = webos && ua.match(/TouchPad/), kindle = ua.match(/Kindle\/([\d.]+)/), silk = ua.match(/Silk\/([\d._]+)/), blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/), bb10 = ua.match(/(BB10).*Version\/([\d.]+)/), rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/), playbook = ua.match(/PlayBook/), chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/), firefox = ua.match(/Firefox\/([\d.]+)/);
        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes
        (browser.webkit = !!webkit) && (browser.version = webkit[1]), android && (os.android = !0, 
        os.version = android[2]), iphone && (os.ios = os.iphone = !0, os.version = iphone[2].replace(/_/g, ".")), 
        ipad && (os.ios = os.ipad = !0, os.version = ipad[2].replace(/_/g, ".")), webos && (os.webos = !0, 
        os.version = webos[2]), touchpad && (os.touchpad = !0), blackberry && (os.blackberry = !0, 
        os.version = blackberry[2]), bb10 && (os.bb10 = !0, os.version = bb10[2]), rimtabletos && (os.rimtabletos = !0, 
        os.version = rimtabletos[2]), playbook && (browser.playbook = !0), kindle && (os.kindle = !0, 
        os.version = kindle[1]), silk && (browser.silk = !0, browser.version = silk[1]), 
        !silk && os.android && ua.match(/Kindle Fire/) && (browser.silk = !0), chrome && (browser.chrome = !0, 
        browser.version = chrome[1]), firefox && (browser.firefox = !0, browser.version = firefox[1]), 
        os.tablet = !!(ipad || playbook || android && !ua.match(/Mobile/) || firefox && ua.match(/Tablet/)), 
        os.phone = !(os.tablet || !(android || iphone || webos || blackberry || bb10 || chrome && ua.match(/Android/) || chrome && ua.match(/CriOS\/([\d.]+)/) || firefox && ua.match(/Mobile/)));
    }
    detect.call($, navigator.userAgent), // make available to unit tests
    $.__detect = detect;
}(Zepto), function($) {
    function zid(element) {
        return element._zid || (element._zid = _zid++);
    }
    function findHandlers(element, event, fn, selector) {
        if (event = parse(event), event.ns) var matcher = matcherFor(event.ns);
        return (handlers[zid(element)] || []).filter(function(handler) {
            return !(!handler || event.e && handler.e != event.e || event.ns && !matcher.test(handler.ns) || fn && zid(handler.fn) !== zid(fn) || selector && handler.sel != selector);
        });
    }
    function parse(event) {
        var parts = ("" + event).split(".");
        return {
            e: parts[0],
            ns: parts.slice(1).sort().join(" ")
        };
    }
    function matcherFor(ns) {
        return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
    }
    function eachEvent(events, fn, iterator) {
        "string" != $.type(events) ? $.each(events, iterator) : events.split(/\s/).forEach(function(type) {
            iterator(type, fn);
        });
    }
    function eventCapture(handler, captureSetting) {
        return handler.del && ("focus" == handler.e || "blur" == handler.e) || !!captureSetting;
    }
    function realEvent(type) {
        return hover[type] || type;
    }
    function add(element, events, fn, selector, getDelegate, capture) {
        var id = zid(element), set = handlers[id] || (handlers[id] = []);
        eachEvent(events, fn, function(event, fn) {
            var handler = parse(event);
            handler.fn = fn, handler.sel = selector, // emulate mouseenter, mouseleave
            handler.e in hover && (fn = function(e) {
                var related = e.relatedTarget;
                return !related || related !== this && !$.contains(this, related) ? handler.fn.apply(this, arguments) : void 0;
            }), handler.del = getDelegate && getDelegate(fn, event);
            var callback = handler.del || fn;
            handler.proxy = function(e) {
                var result = callback.apply(element, [ e ].concat(e.data));
                return result === !1 && (e.preventDefault(), e.stopPropagation()), result;
            }, handler.i = set.length, set.push(handler), element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
        });
    }
    function remove(element, events, fn, selector, capture) {
        var id = zid(element);
        eachEvent(events || "", fn, function(event, fn) {
            findHandlers(element, event, fn, selector).forEach(function(handler) {
                delete handlers[id][handler.i], element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
            });
        });
    }
    function createProxy(event) {
        var key, proxy = {
            originalEvent: event
        };
        for (key in event) ignoreProperties.test(key) || void 0 === event[key] || (proxy[key] = event[key]);
        return $.each(eventMethods, function(name, predicate) {
            proxy[name] = function() {
                return this[predicate] = returnTrue, event[name].apply(event, arguments);
            }, proxy[predicate] = returnFalse;
        }), proxy;
    }
    // emulates the 'defaultPrevented' property for browsers that have none
    function fix(event) {
        if (!("defaultPrevented" in event)) {
            event.defaultPrevented = !1;
            var prevent = event.preventDefault;
            event.preventDefault = function() {
                this.defaultPrevented = !0, prevent.call(this);
            };
        }
    }
    var handlers = ($.zepto.qsa, {}), _zid = 1, specialEvents = {}, hover = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents", 
    $.event = {
        add: add,
        remove: remove
    }, $.proxy = function(fn, context) {
        if ($.isFunction(fn)) {
            var proxyFn = function() {
                return fn.apply(context, arguments);
            };
            return proxyFn._zid = zid(fn), proxyFn;
        }
        if ("string" == typeof context) return $.proxy(fn[context], fn);
        throw new TypeError("expected function");
    }, $.fn.bind = function(event, callback) {
        return this.each(function() {
            add(this, event, callback);
        });
    }, $.fn.unbind = function(event, callback) {
        return this.each(function() {
            remove(this, event, callback);
        });
    }, $.fn.one = function(event, callback) {
        return this.each(function(i, element) {
            add(this, event, callback, null, function(fn, type) {
                return function() {
                    var result = fn.apply(element, arguments);
                    return remove(element, type, fn), result;
                };
            });
        });
    };
    var returnTrue = function() {
        return !0;
    }, returnFalse = function() {
        return !1;
    }, ignoreProperties = /^([A-Z]|layer[XY]$)/, eventMethods = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    $.fn.delegate = function(selector, event, callback) {
        return this.each(function(i, element) {
            add(element, event, callback, selector, function(fn) {
                return function(e) {
                    var evt, match = $(e.target).closest(selector, element).get(0);
                    return match ? (evt = $.extend(createProxy(e), {
                        currentTarget: match,
                        liveFired: element
                    }), fn.apply(match, [ evt ].concat([].slice.call(arguments, 1)))) : void 0;
                };
            });
        });
    }, $.fn.undelegate = function(selector, event, callback) {
        return this.each(function() {
            remove(this, event, callback, selector);
        });
    }, $.fn.live = function(event, callback) {
        return $(document.body).delegate(this.selector, event, callback), this;
    }, $.fn.die = function(event, callback) {
        return $(document.body).undelegate(this.selector, event, callback), this;
    }, $.fn.on = function(event, selector, callback) {
        return !selector || $.isFunction(selector) ? this.bind(event, selector || callback) : this.delegate(selector, event, callback);
    }, $.fn.off = function(event, selector, callback) {
        return !selector || $.isFunction(selector) ? this.unbind(event, selector || callback) : this.undelegate(selector, event, callback);
    }, $.fn.trigger = function(event, data) {
        return ("string" == typeof event || $.isPlainObject(event)) && (event = $.Event(event)), 
        fix(event), event.data = data, this.each(function() {
            // items in the collection might not be DOM elements
            // (todo: possibly support events on plain old objects)
            "dispatchEvent" in this && this.dispatchEvent(event);
        });
    }, // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function(event, data) {
        var e, result;
        return this.each(function(i, element) {
            e = createProxy("string" == typeof event ? $.Event(event) : event), e.data = data, 
            e.target = element, $.each(findHandlers(element, event.type || event), function(i, handler) {
                return result = handler.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0;
            });
        }), result;
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(event) {
        $.fn[event] = function(callback) {
            return callback ? this.bind(event, callback) : this.trigger(event);
        };
    }), [ "focus", "blur" ].forEach(function(name) {
        $.fn[name] = function(callback) {
            return callback ? this.bind(name, callback) : this.each(function() {
                try {
                    this[name]();
                } catch (e) {}
            }), this;
        };
    }), $.Event = function(type, props) {
        "string" != typeof type && (props = type, type = props.type);
        var event = document.createEvent(specialEvents[type] || "Events"), bubbles = !0;
        if (props) for (var name in props) "bubbles" == name ? bubbles = !!props[name] : event[name] = props[name];
        return event.initEvent(type, bubbles, !0, null, null, null, null, null, null, null, null, null, null, null, null), 
        event.isDefaultPrevented = function() {
            return this.defaultPrevented;
        }, event;
    };
}(Zepto), function($) {
    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName);
        return $(context).trigger(event, data), !event.defaultPrevented;
    }
    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
        return settings.global ? triggerAndReturn(context || document, eventName, data) : void 0;
    }
    function ajaxStart(settings) {
        settings.global && 0 === $.active++ && triggerGlobal(settings, null, "ajaxStart");
    }
    function ajaxStop(settings) {
        settings.global && !--$.active && triggerGlobal(settings, null, "ajaxStop");
    }
    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        return settings.beforeSend.call(context, xhr, settings) === !1 || triggerGlobal(settings, context, "ajaxBeforeSend", [ xhr, settings ]) === !1 ? !1 : (triggerGlobal(settings, context, "ajaxSend", [ xhr, settings ]), 
        void 0);
    }
    function ajaxSuccess(data, xhr, settings) {
        var context = settings.context, status = "success";
        settings.success.call(context, data, status, xhr), triggerGlobal(settings, context, "ajaxSuccess", [ xhr, settings, data ]), 
        ajaxComplete(status, xhr, settings);
    }
    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error), triggerGlobal(settings, context, "ajaxError", [ xhr, settings, error ]), 
        ajaxComplete(type, xhr, settings);
    }
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status), triggerGlobal(settings, context, "ajaxComplete", [ xhr, settings ]), 
        ajaxStop(settings);
    }
    // Empty function, used as default callback
    function empty() {}
    function mimeToDataType(mime) {
        return mime && (mime = mime.split(";", 2)[0]), mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text";
    }
    function appendQuery(url, query) {
        return (url + "&" + query).replace(/[&?]{1,2}/, "?");
    }
    // serialize payload and append it to the URL for GET requests
    function serializeData(options) {
        options.processData && options.data && "string" != $.type(options.data) && (options.data = $.param(options.data, options.traditional)), 
        !options.data || options.type && "GET" != options.type.toUpperCase() || (options.url = appendQuery(options.url, options.data));
    }
    // handle optional data/success arguments
    function parseArguments(url, data, success, dataType) {
        var hasData = !$.isFunction(data);
        return {
            url: url,
            data: hasData ? data : void 0,
            success: hasData ? $.isFunction(success) ? success : void 0 : data,
            dataType: hasData ? dataType || success : success
        };
    }
    function serialize(params, obj, traditional, scope) {
        var type, array = $.isArray(obj);
        $.each(obj, function(key, value) {
            type = $.type(value), scope && (key = traditional ? scope : scope + "[" + (array ? "" : key) + "]"), 
            // handle data in serializeArray() format
            !scope && array ? params.add(value.name, value.value) : "array" == type || !traditional && "object" == type ? serialize(params, value, traditional, key) : params.add(key, value);
        });
    }
    var key, name, jsonpID = 0, document = window.document, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
    // Number of active Ajax requests
    $.active = 0, $.ajaxJSONP = function(options) {
        if (!("type" in options)) return $.ajax(options);
        var abortTimeout, callbackName = "jsonp" + ++jsonpID, script = document.createElement("script"), cleanup = function() {
            clearTimeout(abortTimeout), $(script).remove(), delete window[callbackName];
        }, abort = function(type) {
            cleanup(), // In case of manual abort or timeout, keep an empty function as callback
            // so that the SCRIPT tag that eventually loads won't result in an error.
            type && "timeout" != type || (window[callbackName] = empty), ajaxError(null, type || "abort", xhr, options);
        }, xhr = {
            abort: abort
        };
        return ajaxBeforeSend(xhr, options) === !1 ? (abort("abort"), !1) : (window[callbackName] = function(data) {
            cleanup(), ajaxSuccess(data, xhr, options);
        }, script.onerror = function() {
            abort("error");
        }, script.src = options.url.replace(/=\?/, "=" + callbackName), $("head").append(script), 
        options.timeout > 0 && (abortTimeout = setTimeout(function() {
            abort("timeout");
        }, options.timeout)), xhr);
    }, $.ajaxSettings = {
        // Default type of request
        type: "GET",
        // Callback that is executed before request
        beforeSend: empty,
        // Callback that is executed if the request succeeds
        success: empty,
        // Callback that is executed the the server drops error
        error: empty,
        // Callback that is executed on request complete (both: error and success)
        complete: empty,
        // The context for the callbacks
        context: null,
        // Whether to trigger "global" Ajax events
        global: !0,
        // Transport
        xhr: function() {
            return new window.XMLHttpRequest();
        },
        // MIME types mapping
        accepts: {
            script: "text/javascript, application/javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        // Whether the request is to another domain
        crossDomain: !1,
        // Default timeout
        timeout: 0,
        // Whether data should be serialized to string
        processData: !0,
        // Whether the browser should be allowed to cache GET responses
        cache: !0
    }, $.ajax = function(options) {
        var settings = $.extend({}, options || {});
        for (key in $.ajaxSettings) void 0 === settings[key] && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), 
        settings.url || (settings.url = window.location.toString()), serializeData(settings), 
        settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
        var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url);
        if ("jsonp" == dataType || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")), 
        $.ajaxJSONP(settings);
        var abortTimeout, mime = settings.accepts[dataType], baseHeaders = {}, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr();
        settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, 
        mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime)), 
        (settings.contentType || settings.contentType !== !1 && settings.data && "GET" != settings.type.toUpperCase()) && (baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded"), 
        settings.headers = $.extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function() {
            if (4 == xhr.readyState) {
                xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || 304 == xhr.status || 0 == xhr.status && "file:" == protocol) {
                    dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText;
                    try {
                        // http://perfectionkills.com/global-eval-what-are-the-options/
                        "script" == dataType ? (1, eval)(result) : "xml" == dataType ? result = xhr.responseXML : "json" == dataType && (result = blankRE.test(result) ? null : $.parseJSON(result));
                    } catch (e) {
                        error = e;
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings);
                } else ajaxError(null, xhr.status ? "error" : "abort", xhr, settings);
            }
        };
        var async = "async" in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async);
        for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
        return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function() {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings);
        }, settings.timeout)), // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null), xhr);
    }, $.get = function() {
        return $.ajax(parseArguments.apply(null, arguments));
    }, $.post = function() {
        var options = parseArguments.apply(null, arguments);
        return options.type = "POST", $.ajax(options);
    }, $.getJSON = function() {
        var options = parseArguments.apply(null, arguments);
        return options.dataType = "json", $.ajax(options);
    }, $.fn.load = function(url, data, success) {
        if (!this.length) return this;
        var selector, self = this, parts = url.split(/\s/), options = parseArguments(url, data, success), callback = options.success;
        return parts.length > 1 && (options.url = parts[0], selector = parts[1]), options.success = function(response) {
            self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response), 
            callback && callback.apply(self, arguments);
        }, $.ajax(options), this;
    };
    var escape = encodeURIComponent;
    $.param = function(obj, traditional) {
        var params = [];
        return params.add = function(k, v) {
            this.push(escape(k) + "=" + escape(v));
        }, serialize(params, obj, traditional), params.join("&").replace(/%20/g, "+");
    };
}(Zepto), function($) {
    $.fn.serializeArray = function() {
        var el, result = [];
        return $(Array.prototype.slice.call(this.get(0).elements)).each(function() {
            el = $(this);
            var type = el.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != type && "reset" != type && "button" != type && ("radio" != type && "checkbox" != type || this.checked) && result.push({
                name: el.attr("name"),
                value: el.val()
            });
        }), result;
    }, $.fn.serialize = function() {
        var result = [];
        return this.serializeArray().forEach(function(elm) {
            result.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value));
        }), result.join("&");
    }, $.fn.submit = function(callback) {
        if (callback) this.bind("submit", callback); else if (this.length) {
            var event = $.Event("submit");
            this.eq(0).trigger(event), event.defaultPrevented || this.get(0).submit();
        }
        return this;
    };
}(Zepto), function($, undefined) {
    function dasherize(str) {
        return downcase(str.replace(/([a-z])([A-Z])/, "$1-$2"));
    }
    function downcase(str) {
        return str.toLowerCase();
    }
    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : downcase(name);
    }
    var eventPrefix, transform, transitionProperty, transitionDuration, transitionTiming, animationName, animationDuration, animationTiming, prefix = "", vendors = {
        Webkit: "webkit",
        Moz: "",
        O: "o",
        ms: "MS"
    }, document = window.document, testEl = document.createElement("div"), supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, cssReset = {};
    $.each(vendors, function(vendor, event) {
        return testEl.style[vendor + "TransitionProperty"] !== undefined ? (prefix = "-" + downcase(vendor) + "-", 
        eventPrefix = event, !1) : void 0;
    }), transform = prefix + "transform", cssReset[transitionProperty = prefix + "transition-property"] = cssReset[transitionDuration = prefix + "transition-duration"] = cssReset[transitionTiming = prefix + "transition-timing-function"] = cssReset[animationName = prefix + "animation-name"] = cssReset[animationDuration = prefix + "animation-duration"] = cssReset[animationTiming = prefix + "animation-timing-function"] = "", 
    $.fx = {
        off: eventPrefix === undefined && testEl.style.transitionProperty === undefined,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: prefix,
        transitionEnd: normalizeEvent("TransitionEnd"),
        animationEnd: normalizeEvent("AnimationEnd")
    }, $.fn.animate = function(properties, duration, ease, callback) {
        return $.isPlainObject(duration) && (ease = duration.easing, callback = duration.complete, 
        duration = duration.duration), duration && (duration = ("number" == typeof duration ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1e3), 
        this.anim(properties, duration, ease, callback);
    }, $.fn.anim = function(properties, duration, ease, callback) {
        var key, cssProperties, wrappedCallback, cssValues = {}, transforms = "", that = this, endEvent = $.fx.transitionEnd;
        if (duration === undefined && (duration = .4), $.fx.off && (duration = 0), "string" == typeof properties) // keyframe animation
        cssValues[animationName] = properties, cssValues[animationDuration] = duration + "s", 
        cssValues[animationTiming] = ease || "linear", endEvent = $.fx.animationEnd; else {
            cssProperties = [];
            // CSS transitions
            for (key in properties) supportedTransforms.test(key) ? transforms += key + "(" + properties[key] + ") " : (cssValues[key] = properties[key], 
            cssProperties.push(dasherize(key)));
            transforms && (cssValues[transform] = transforms, cssProperties.push(transform)), 
            duration > 0 && "object" == typeof properties && (cssValues[transitionProperty] = cssProperties.join(", "), 
            cssValues[transitionDuration] = duration + "s", cssValues[transitionTiming] = ease || "linear");
        }
        return wrappedCallback = function(event) {
            if ("undefined" != typeof event) {
                if (event.target !== event.currentTarget) return;
                // makes sure the event didn't bubble from "below"
                $(event.target).unbind(endEvent, wrappedCallback);
            }
            $(this).css(cssReset), callback && callback.call(this);
        }, duration > 0 && this.bind(endEvent, wrappedCallback), // trigger page reflow so new elements can animate
        this.size() && this.get(0).clientLeft, this.css(cssValues), 0 >= duration && setTimeout(function() {
            that.each(function() {
                wrappedCallback.call(this);
            });
        }, 0), this;
    }, testEl = null;
}(Zepto);
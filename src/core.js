(function (global) {
    'use strict';
    var debug = true;

    var utils = global.utils = {
        isFunction: function(fn) {
            return (!!fn && typeof fn === 'function');
        },
        lastArgumentCallback: function (args, invoke) {
            var lastArgument = args[args.length - 1];

            if (utils.isFunction(lastArgument)){
                if (invoke) {
                    lastArgument();
                }
                return lastArgument;
            } else {
                return undefined;
            }
        }
    };

    var featureDetect = function () {
        var requiredFeatures = [
            JSON,
            document.querySelectorAll
        ];

        for (var i = 0; i < requiredFeatures.length; i++) {
            if (!requiredFeatures[i]) {
                return false;
            }
        }

        return true;
    };

    var psQuery = function (selector) {
        return new psQuery.fn.init(selector);
    };

    psQuery.fn = psQuery.prototype = {
        constructor: psQuery,
        init: function (selector) {
            if (!featureDetect()) {
                throw 'Error: Cannot load psQuery. Required browser features are not available.';
            }

            try {
                if (!selector) {
                    throw 'Error: Invalid selector';
                } else if (!!selector.nodeType && (selector.nodeType === 1 || selector.nodeType === 9)) {
                    this.els = [selector];
                } else if (typeof selector === 'string') {
                    this.els = document.querySelectorAll(selector);
                }

                if (this.els.length === 0) {
                    throw 'Error: No elements found with that selector.';
                }

                return this;
            } catch (e) {
                if (!debug) {
                    return undefined;
                } else {
                    throw e;
                }
            }
        },
        each: function (fn) {
            var els = this.els;

            if (!utils.isFunction(fn)) {
                throw 'Error: no function supplied to loop.';
            }

            for (var i = 0, l = els.length; i < l; i++) {
                if (fn.call(els[i], i) === false) {
                    break;
                }
            }
        },
        nth: function(n) {
            var pos = (n < 0 ? this.els.length + n : n);
            return psQuery.fn.init(this.els[pos]);
        },
        get: function(n) {
            return this.nth(n);
        },
        first: function () {
            return this.nth(0);
        },
        last: function () {
            return this.nth(-1);
        },
        val: function(val) {
            if (val) {
                this.each(function () {
                    this.value = val;
                });
            } else {
                return this.els[0].value;
            }
        },
        html: function (html) {
            if (typeof html === 'string') {
                this.each(function () {
                    this.innerHTML = html;
                });

                return this;
            } else {
                return this.els[0].innerHTML;
            }
        },
        text: function(text) {
            if (typeof text === 'string') {
                this.each(function () {
                    this.innerText = text;
                });

                return this;
            } else {
                return this.els[0].innerText;
            }
        },
        hide: function() {
            var set = function () {
                this.style.display = 'none';
            };

            this.each(set);
        },
        show: function() {
            var set = function () {
                this.style.display = '';
            };

            this.each(set);
        },
        addClass: function (classes) {
            var add = function () {
                var merged = (this.className + ' ' + classes.trim()).split(' '),
                    uniques = {},
                    union = [];
                
                for (var i = 0, l = merged.length; i < l; i++) {
                    uniques[merged[i]] = true;
                }

                for (var j in uniques) {
                    if (typeof j === 'string') {
                        union.push(j);
                    }
                }

                this.className = union.join(' ').trim();
            };

            this.each(add);
            return this;
        },
        removeClass: function(classes){
            var remove = function () {
                var existing = this.className + '';
                var removing = classes.trim().split(' ');

                for (var i = 0; i < removing.length; i++) {
                    existing = existing.replace(removing[i], '');
                }

                this.className = existing;
            };

            this.each(remove);
            return this;
        },
        css: function (css) {
            var set = function () {
                return undefined;
            };

            if (css) { // Set
                this.each(set);
            } else { // Get css for first element
                return '';
            }
            return this;
        },
        click: function(callback) {
            this.on('click', callback);
        },
        on: function (events) {
            var callback = utils.lastArgumentCallback(arguments),
                ev = events.split(' ');

            this.each(function () {
                for (var i = 0; i < ev.length; i++) {
                    this.addEventListener(ev[i], callback, false);
                }
            });

            return this;
        },
        off: function (events) {
            var callback = utils.lastArgumentCallback(arguments),
                ev = events.split(' ');

            this.each(function () {
                for (var i = 0; i < ev.length; i++) {
                    this.removeEventListener(ev[i], callback, false);
                }
            });

            return this;
        },
        ajax: function (opts) {
            opts = null;
            return this;
        },
        data: function () {

        },
        attr: function () {

        }
    };

    psQuery.fn.init.prototype = psQuery.fn;

    global.psQuery = psQuery;
    if (!global.$) {
        global.$ = psQuery;
    }

})(this);

(function (global) {
    'use strict';
    var utils = {
        loop: function (opts) {
            var fn = opts.fn;
            var els = opts.els;

            for (var i = 0, l = els.length; i < l; i++) {
                fn(els[i], opts);
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
        return psQuery.fn.init(selector);
    };

    psQuery.fn = psQuery.prototype = {
        constructor: psQuery,
        init: function (selector) {
            if (!featureDetect()) {
                return 'Cannot load. Required features not available';
            }
            this.els = document.querySelectorAll(selector);
            this.el = this.els[0];

            return this;
        },
        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return (j >= 0 && j < len ? [this[j]] : []);
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        html: function (html) {
            if (typeof html === 'string') {
                var set = function(el, opts) {
                    el.innerHTML = opts.html;
                };

                var opts = {
                    els: this.els,
                    fn: set,
                    html: html
                };

                utils.loop(opts);

                return this;
            } else {
                return this.el.innerHTML;
            }
        },
        hide: function() {
            var set = function (el) {
                el.style.display = 'none';
            };

            var opts = {
                els: this.els,
                fn: set
            };

            utils.loop(opts);
        },
        show: function() {
            var set = function (el) {
                el.style.display = '';
            };

            var opts = {
                els: this.els,
                fn: set
            };

            utils.loop(opts);
        },
        addClass: function (classes) {
            var add = function (el, opts) {
                var c = opts.c;
                
                var merged = (el.className + ' ' + c.trim()).split(' ');
                var uniques = {};
                var union = [];
                
                for (var i = 0, l = merged.length; i < l; i++) {
                    uniques[merged[i]] = true;
                }

                for (var j in uniques) {
                    if (typeof j === 'string') {
                        union.push(j);
                    }
                }

                el.className = union.join(' ').trim();
            };

            var opts = {
                els: this.els,
                fn: add,
                c: classes
            };

            utils.loop(opts);
            return this;
        },
        removeClass: function(classes){
            var remove = function (el, opts) {
                var c = opts.c;
                var existing = el.className + '';
                var removing = c.trim().split(' ');

                for (var i = 0; i < removing.length; i++) {
                    existing = existing.replace(removing[i], '');
                }

                el.className = existing;
            };

            var opts = {
                els: this.els,
                fn: remove,
                c: classes
            };

            utils.loop(opts);
            return this;
        },
        css: function (css) {
            var set = function (el, opts) {
                return opts + el;
            };

            if (css) { // Set
                var opts = {
                    els: this.els,
                    fn: set,
                    css: css
                };
                utils.loop(opts);
            } else { // Get css for first element
                return '';
            }
            return this;
        },
        click: function(callback) {
            this.on('click', callback);
        },
        on: function (event, callback) {
            var add = function (el, opts) {
                var callback = opts.callback;
                var event = opts.event;
                el.addEventListener(event, callback, false);
            };

            var opts = {
                els: this.els,
                fn: add,
                event: event,
                callback: callback
            };

            utils.loop(opts);
            return this;
        },
        off: function(event, callback) {
            var remove = function (el, opts) {
                var callback = opts.callback;
                var event = opts.event;
                el.removeEventListener(event, callback, false);
            };

            var opts = {
                els: this.els,
                fn: remove,
                event: event,
                callback: callback
            };

            utils.loop(opts);
            return this;
        },
        ajax: function (opts) {
            opts = null;
            return this;
        }
    };

    global.psQuery = psQuery;
    if (!global.$) {
        global.$ = psQuery;
    }

})(this);

(function (global) {

    var chain = function (selector, context) {
        return chain.fn.init(selector, context);
    };

    chain.fn = chain.prototype = {
        init: function (selector, context) {
            this.context = context = context || document;
            this.selector = selector;
            this.els = document.querySelectorAll(selector);
            this.el = this.els[0];

            return this;
        },
        html: function (html) {
            if (!html) {
                return this.el.innerHTML;
            } else if (typeof html === 'string') {
                this.el.innerHTML = html;
            }

            return this;
        },
        utils: {
            toArray: function () {
                // Nodelist to array
            }
        }
    };

    global.chain = chain;

})(this);

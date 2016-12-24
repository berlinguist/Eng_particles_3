/* This software is licensed under a BSD license; see the LICENSE file for details. */

$.widget("ui.Caption", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;
        this.caption = this.options.message;
        
        var p = $(document.createElement("p"));
        this.element.append(p);
        p.text(this.caption).addClass(this.cssPrefix + "caption")
        }

    }
);

ibex_controller_set_properties("Caption", {
    countsForProgressBar: false,
    htmlDescription: function (opts) {
        return $(document.createElement("div")).text(opts.normalMessage)[0];
    }
});
/* This software is licensed under a BSD license; see the LICENSE file for details. */

$.widget("ui.PictureDisplay", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

		this.file = this.options.f;
		var mainDiv = $(document.createElement("div"))
			.addClass(this.cssPrefix + "div")
			.appendTo(this.element);
			
		var pic = $(document.createElement("img"))
			.attr({ src: this.file })
	    	.addClass(this.cssPrefix + "picture")
	    	.appendTo(mainDiv)

	    var test = "test";
    }
});

 ibex_controller_set_properties("PictureDisplay", { obligatory: ["f"],
       htmlDescription:
           function (opts) {
              return $(document.createElement("div")).text(opts.f)[0];
          }
});

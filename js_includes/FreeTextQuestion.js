/* This software is licensed under a BSD license; see the LICENSE file for details. */

(function () {

var __FreeTextQuestion_callback__ = null;
var __FreeTextQuestions_answers__ = null;

$.widget("ui.FreeTextQuestion", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

        var questionField = "Question (NULL if none).";
        var answerField = "Answer";
        var correctField = "Whether or not answer was correct (NULL if N/A)";
        var timeField = "Time taken to answer.";

        this.element.addClass(this.cssPrefix + "question");
        this.element.addClass("hidden");

        this.question = dget(this.options, "q");
        this.answers = this.options.as;


        if (this.question) {
            this.qp = $(document.createElement("p"))
            .addClass(this.cssPrefix + "question-text")
            .css('text-align', conf_centerItems ? 'center' : 'left')
            .append(this.question);
        }

        if (! (this.qp === undefined))
            this.element.append(this.qp);

		this.answerbox = $(document.createElement("textarea"))
			.addClass(this.cssPrefix + "question-box");
		
		this.done = $(document.createElement("p"))
			.addClass(this.cssPrefix + "nextbutton")
			.append("Done!")
		
		var t = this;
		this.done.click(function() {
			var text = t.answerbox.attr("value");
			if (text != "") {
                var answerTime = new Date().getTime();
				t.finishedCallback([[["scenario", csv_url_encode(text)], 
									 ["response time", answerTime-t.creationTime]
									]]);
				t.done.addClass("hidden");
			}
				
			}
		);
		this.element.append(this.answerbox);
		this.element.append(this.done);


        // Again, using tables to center because IE sucks.
        var table = $("<table" + (conf_centerItems ? " align='center'" : "") + ">");
        var tr = $(document.createElement("tr"));
        var td = $("<td" + (conf_centerItems ? " align='center'" : "") + ">")
        if (conf_centerItems)
            td.attr('align', 'center');
        this.element.append(table.append(tr.append(td.append(this.xl))));

        if (this.instructions) {
            this.element.append($(document.createElement("p"))
                                .addClass(this.cssPrefix + "instructions-text")
                                .css('text-align', conf_centerItems ? 'center' : 'left')
                                .text(this.instructions));
        }

        if (this.timeout) {
            var t = this;
            this.utils.setTimeout(function () {
                var answerTime = new Date().getTime();
                t.setFlag(false);
                t.finishedCallback([[[questionField, t.question ? csv_url_encode(t.question) : "NULL"],
                                     [answerField, "NULL"], [correctField, "NULL"],
                                     [timeField, answerTime - t.creationTime]]]);
            }, this.timeout);
        }

        // Store the time when this was first displayed.
        this.creationTime = new Date().getTime();
    }
});

})();

ibex_controller_set_properties("FreeTextQuestion", {
    obligatory: ["as"],
    htmlDescription: function(opts) {
        return $(document.createElement("div")).text(opts.q || "");
    }
});
